const LoginForm = ({ credentials, setCredentials }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.idInstance && credentials.apiTokenInstance) {
      setCredentials((prev) => ({ ...prev, isAuthenticated: true }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          GREEN-API Chat
        </h2>
        <input
          type="text"
          placeholder="idInstance"
          className="w-full mb-4 p-2 border rounded"
          value={credentials.idInstance}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, idInstance: e.target.value }))
          }
          required
        />
        <input
          type="password"
          placeholder="apiTokenInstance"
          className="w-full mb-4 p-2 border rounded"
          value={credentials.apiTokenInstance}
          onChange={(e) =>
            setCredentials((prev) => ({
              ...prev,
              apiTokenInstance: e.target.value,
            }))
          }
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-gray-100 cursor-pointer p-2 rounded hover:bg-green-800"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
