const StartChatForm = ({ chatState, setChatState }) => {
  const startChat = (e) => {
    e.preventDefault();
    if (chatState.recipientPhone) {
      setChatState((prev) => ({ ...prev, chatStarted: true }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <form
        onSubmit={startChat}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Начать Новый Чат
        </h2>
        <input
          type="tel"
          placeholder="Номер телефона получателя (79001234567)"
          className="w-full mb-4 p-2 border rounded placeholder:text-sm"
          value={chatState.recipientPhone}
          onChange={(e) =>
            setChatState((prev) => ({
              ...prev,
              recipientPhone: e.target.value,
            }))
          }
          pattern="[0-9]{10,15}"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-2 rounded cursor-pointer hover:bg-green-800"
        >
          Начать чат
        </button>
      </form>
    </div>
  );
};

export default StartChatForm;
