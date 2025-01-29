import { useState } from "react";
import LoginForm from "./components/LoginForm";
import StartChatForm from "./components/StartChatForm";
import ChatInterface from "./components/ChatInterface";

const App = () => {
  const [credentials, setCredentials] = useState({
    idInstance: "",
    apiTokenInstance: "",
    isAuthenticated: false,
  });

  const [chatState, setChatState] = useState({
    recipientPhone: "",
    chatStarted: false,
  });

  if (!credentials.isAuthenticated) {
    return (
      <LoginForm credentials={credentials} setCredentials={setCredentials} />
    );
  }

  if (!chatState.chatStarted) {
    return <StartChatForm chatState={chatState} setChatState={setChatState} />;
  }

  return (
    <ChatInterface
      credentials={credentials}
      recipientPhone={chatState.recipientPhone}
    />
  );
};

export default App;
