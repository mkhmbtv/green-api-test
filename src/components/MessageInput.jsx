import { Send } from "lucide-react";

const MessageInput = ({ message, setMessage, onSend }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(e);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Сообщение"
          className="flex-1 p-2 rounded-lg bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className=" text-gray-900 cursor-pointer p-2 rounded-lg"
        >
          <Send size={24} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
