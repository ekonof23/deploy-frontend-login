import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      {/* Toggle Switch */}
      <div
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 flex items-center cursor-pointer select-none z-50"
      >
        <div className={`w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 duration-300`}>
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${darkMode ? "translate-x-6" : ""}`}
          ></div>
        </div>
        <span className="ml-2 text-gray-700 dark:text-gray-200 text-sm">{darkMode ? "Dark" : "Light"}</span>
      </div>

      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm darkMode={darkMode} />} />
          <Route path="/register" element={<RegisterForm darkMode={darkMode} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
