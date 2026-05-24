import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from "react-router-dom";
import Hero from './components/Hero';
import ShowOutput from './components/ShowOutput';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/profile';
import Analytics from './components/Analytics';
import { Toaster } from "react-hot-toast";
import axios from 'axios';

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="dashboard" element={<ShowOutput />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App