import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from "react-router-dom";
import Hero from './components/Hero';
import ShowOutput from './components/ShowOutput';




const App = () => {
  return (
    <div className='min-h-screen w-full'>
      {/* <Layout /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="dashboard" element={<ShowOutput />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App