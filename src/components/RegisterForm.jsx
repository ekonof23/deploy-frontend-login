import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

export default function RegisterForm({ darkMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Validasi sederhana
    if (!email || !password) {
      setMsg("Semua field wajib diisi");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setMsg("Format email tidak valid");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/register", { email, password });
      alert(res.data.message || "Register berhasil!");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Register gagal, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-900`}>
      <form className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-gray-200">Register</h2>

        <input
          type="text"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded focus:ring focus:ring-blue-300 outline-none dark:bg-gray-700 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="border w-full p-2 rounded focus:ring focus:ring-blue-300 outline-none dark:bg-gray-700 dark:text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-500 dark:text-gray-200"
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold p-2 rounded mt-2 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        {msg && <p className="text-center text-red-500 mt-3 text-sm font-medium">{msg}</p>}

        {/* Link ke login */}
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
