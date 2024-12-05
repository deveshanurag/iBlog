import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const Login = () => {
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setMsg("Unable to Login");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/login", formData);
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/post");
    } catch (error) {
      setMsg("Unable to Login");
    }
    // Handle login logic
    // console.log(formData);
  };

  return (
    <>
      <Navbar showLoginButton={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Log In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email address"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your password"
                required
              />
            </div>
            {msg && (
              <div
                style={{
                  color: "red",
                  margin: "10px 0",
                }}
              >
                {msg}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
