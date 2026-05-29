// src/pages/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  // ✅ State to hold input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // send user data
      });

     if (response.ok) {
        const data = await response.json();
        setSuccess("Login successful! 🎉");
        console.log("Login response:", data);

        // 👉 Save token in localStorage
        localStorage.setItem("token", data.access_token);

        // 👉 Redirect to profile page (optional)
        window.location.href = "/profile";
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Log in to access your Prism State account.
          </p>
        </div>

        {/* ✅ Added handleSubmit */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email} // bind to state
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password} // bind to state
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          <div className="flex items-center justify-end text-sm">
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
            >
              Log In
            </button>
          </div>
        </form>

        {/* ✅ Error / Success messages */}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
        {success && <p className="mt-4 text-green-400 text-center">{success}</p>}

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
