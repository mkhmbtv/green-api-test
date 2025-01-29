const ChatMessage = ({ message }) => {
  return (
    <div
      className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs md:max-w-md px-3 py-2 rounded-lg ${
          message.type === "sent" ? "bg-green-100" : "bg-white"
        }`}
      >
        <p className="text-gray-800">{message.content}</p>
        <p className="text-xs text-right text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
