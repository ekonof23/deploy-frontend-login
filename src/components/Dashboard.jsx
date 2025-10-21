import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ darkMode }) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setMsg("Selamat datang di Dashboard!");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center`}>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">{msg}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
