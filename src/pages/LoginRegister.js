import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const walmartBlue = "#0071ce";
const walmartYellow = "#ffc220";

export default function LoginRegister({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const { data } = await API.post(url, payload);
      localStorage.setItem("token", data.token);
      setSuccess(
        isLogin
          ? "Login successful! Redirecting..."
          : "Registration successful! Redirecting to FakeStore..."
      );
      setTimeout(() => {
        if (onAuth) onAuth();
        navigate("/fakestore");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo-2012.png"
            alt="Walmart Logo"
            className="h-12"
          />
        </div>
        <h2
          className="text-2xl font-bold text-center mb-4"
          style={{ color: walmartBlue }}
        >
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {success && (
            <div className="text-green-600 text-sm mb-2">{success}</div>
          )}
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md font-semibold text-white"
            style={{ backgroundColor: walmartBlue }}
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-sm font-medium"
            style={{ color: walmartYellow }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New to Walmart? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
