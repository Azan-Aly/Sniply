import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ShowOutput from './components/ShowOutput';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/profile';
import Analytics from './components/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <ShowOutput />
              </ProtectedRoute>
            }
          />
          <Route
            path="analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;