import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', form)
      console.log(response.data)
    } catch (error) {
      console.error('Error logging in:', error)
    }
    console.log(form)
  }

  return (
    <div className="min-h-180 flex items-center justify-center bg-linear-to-br from-green-100 to-emerald-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
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
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md"
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
