import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";

const API_URL = import.meta.env.VITE_API_URL;

const ChatInterface = ({ credentials, recipientPhone }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const chatId = `${recipientPhone}@c.us`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            message: message,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: data.idMessage,
            type: "sent",
            content: message,
            timestamp: new Date().toISOString(),
          },
        ]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    async function receiveMessage() {
      try {
        const response = await fetch(
          `${API_URL}/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}`,
        );

        if (!response.ok) return;

        const data = await response.json();
        if (!data) {
          return;
        }

        if (data.body?.typeWebhook === "incomingMessageReceived") {
          const messageData = data.body.messageData;
          if (
            messageData.typeMessage === "textMessage" &&
            data.body.senderData.chatId === chatId
          ) {
            setMessages((prev) => [
              ...prev,
              {
                id: data.body.idMessage,
                type: "received",
                content: messageData.textMessageData.textMessage,
                timestamp: new Date().toISOString(),
              },
            ]);
          }
        }

        await fetch(
          `${API_URL}/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${data.receiptId}`,
          {
            method: "DELETE",
          },
        );
      } catch (error) {
        console.error("Error receiving message:", error);
      }
    }

    const pollInterval = setInterval(receiveMessage, 5000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [chatId, credentials.idInstance, credentials.apiTokenInstance]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center gap-x-3 p-4 text-gray-900">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h1 className="text-lg">+{recipientPhone}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-orange-50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        message={message}
        setMessage={setMessage}
        onSend={sendMessage}
      />
    </div>
  );
};

export default ChatInterface;
