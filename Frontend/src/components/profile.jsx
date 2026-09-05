import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../services/api'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import {
  Mail,
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  ImageUp
} from 'lucide-react'

const Profile = () => {
  const navigate = useNavigate()
  const { user, setUser, setLoggedIn, loading } = useAuth()

  const [uploading, setUploading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await userApi.logout()

      setUser(null)
      setLoggedIn(false)

      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Unable to logout')
    } finally {
      setLoggingOut(false)
    }
  }

  const uploadAvatar = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setUploading(true)
      const response = await userApi.updateAvatar(formData)

      if (response?.data?.data) {
        setUser(response.data.data)
      }

      toast.success('Avatar uploaded successfully')
    } catch (error) {
      console.error(error)
      toast.error('Unable to upload the profile picture')
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    await uploadAvatar(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <p className="text-lg text-slate-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <User className="text-emerald-600" size={40} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-800">
            No Profile Found
          </h2>

          <p className="mt-3 text-slate-500">
            Please login to continue and access your profile.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="mt-8 w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-emerald-600"
          >
            Go To Login
          </button>
        </div>
      </div>
    )
  }

  const initials = user.fullName
    ? user.fullName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : user.username?.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-emerald-50 sm:px-4 sm:py-10">
      <div className="mx-auto max-w-7xl overflow-hidden sm:rounded-[18px] bg-white shadow-[0_10px_60px_rgba(0,0,0,0.08)]">

        {/* Top Banner */}
        <div className="relative overflow-hidden bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-12">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-md">
                <Sparkles size={16} />
                Personal Dashboard
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Heyy {user.username}
              </h1>

              <p className="mt-3 max-w-2xl text-white/90">
                Manage your profile information, review account details,
                and keep your account secure.
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-800 shadow-lg transition-all duration-300 hover:text-red-500 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOut ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-slate-800 border-t-transparent animate-spin"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 sm:p-8 lg:grid-cols-[340px_1fr]">

          {/* Left Side */}
          <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">

              {user.avatar ? (
                <>
                  <div className='relative'>
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="h-64 w-64 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                    <label htmlFor="avatar" className='absolute bottom-0 right-0 m-3 rounded-full bg-white p-2 text-slate-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer disabled:opacity-50'>
                      {uploading ? (
                        <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-transparent animate-spin"></div>
                      ) : (
                        <ImageUp />
                      )}
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      disabled={uploading}
                      className="hidden"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='relative'>
                    <div className="flex  h-64 w-64 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-5xl font-bold text-white shadow-xl">
                      {initials}
                    </div>
                    <p className='absolute -bottom-2 right-14 h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center'>
                      <label htmlFor="avatar" className="cursor-pointer p-2 text-slate-700 hover:text-emerald-600">
                        {uploading ? (
                          <div className="h-6 w-6 rounded-full border-2 border-slate-700 border-t-transparent animate-spin"></div>
                        ) : (
                          <ImageUp />
                        )}
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={uploading}
                        className="hidden"
                      />
                    </p>
                  </div>
                </>
              )}

              <h2 className="mt-6 text-3xl font-bold text-slate-800">
                {user.fullName}
              </h2>

              <p className="mt-2 text-slate-500">
                @{user.username}
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-700">
                <ShieldCheck size={16} />
                Verified Account
              </div>
            </div>

            {/* Stats */}
            {/* <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800">12</h3>
                <p className="text-sm text-slate-500">Posts</p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800">4.8</h3>
                <p className="text-sm text-slate-500">Rating</p>
              </div>
            </div> */}
          </div>

          {/* Right Side */}
          <div className="space-y-8">

            {/* Account Info */}
            <div className="rounded-2xl border border-slate-200 bg-white py-8 sm:p-8 shadow-lg">
              <h2 className="mb-8 text-2xl font-bold text-slate-800 p-4">
                Account Information
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-5 rounded-3xl bg-slate-50 p-5 transition-all duration-300 hover:shadow-md">
                  <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                    <User size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Full Name
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-800">
                      {user.fullName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-3xl bg-slate-50 p-5 transition-all duration-300 hover:shadow-md">
                  <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
                    <ShieldCheck size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Username
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-800">
                      @{user.username}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-3xl bg-slate-50 p-5 transition-all duration-300 hover:shadow-md">
                  <div className="rounded-2xl bg-pink-100 p-4 text-pink-600">
                    <Mail size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Email Address
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-800">
                      {user.email}
                    </h3>
                  </div>
                </div>

              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800">
                Profile Summary
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Welcome back,
                <span className="font-semibold text-emerald-600">
                  {' '} {user.fullName}
                </span>.
                Your profile dashboard gives you quick access to your account
                details, profile information, and security settings in one
                clean and modern interface.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile