import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', form)
      console.log(response.data)

    } catch (error) {
      console.error('Error registering user:', error)
    }

    console.log(form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-100 to-green-200 px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-emerald-500 hover:bg-emerald-700 cursor-pointer text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md"
          >
            Register
          </button>

          {/* Footer Links */}
          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register
