import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { loggedIn, setLoggedIn, checkAuth } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', form)
      console.log(response.data)

      setLoggedIn(true)
      await checkAuth();
      toast.success("Logged in successfully!")
      navigate("/");

    } catch (error) {
      console.error('Error logging in:', error)
      toast.error("Failed to log in.")
    }

    console.log(form)
  }

  return (
    <div className="min-h-140 flex items-center justify-center bg-slate-200 px-4 relative overflow-hidden">
      {/* Decorative Background Glows — same as homepage */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            Login
          </button>

          {/* Extra Links */}
          <div className="flex justify-between text-sm mt-2">
            <Link to="/" className="text-emerald-600 hover:underline">Forgot password?</Link>
            <Link to="/register" className="text-emerald-600 hover:underline">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

