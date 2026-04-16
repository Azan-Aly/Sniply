import React, { useState } from 'react'
import axios from 'axios'
import ShortenedOutput from './ShortenedOutput'
import ShowOutput from './ShowOutput'

const Hero = () => {
  const [response, setResponse] = useState()

  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  const submitHandler = async (e) => {
  e.preventDefault();
  const formData = {
    originalUrl: longUrl,
    customAlias: customAlias,
    expiryDate: expiryDate
  };
  try {
    const response = await axios.post( "http://localhost:3000/url/shorten", formData);

    setResponse(response.data);
    console.log("Success:", response.data);

    setLongUrl('');
    setCustomAlias('');
    setExpiryDate('');

  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className='min-h-screen bg-linear-to-b from-white to-[#cffff0]'>
      {/* main Section */}
      <div className='flex items-center flex-col py-16 sm:py-22 sm:p-12'>
        <p className='rounded-full bg-[#cffff0] text-[#12a073] py-2 px-4 sm:py-1 sm:px-3 font-light text-md sm:text-sm'>snip.ly</p>
        <h1 className='text-3xl sm:text-4xl font-bold my-4 font-sans text-gray-900'>Shorten. Share. Track.</h1>
        <p className='text-gray-600 font-sans font-medium text-lg mx-4 text-center'>Turn long URLs into clean, shareable links in seconds</p>
      </div>

      {/* Hero Input Section */}
      <form onSubmit={submitHandler} className='flex justify-center px-3 sm:px-4 w-full '>
        <div className='w-full sm:w-11/12 md:w-4/5 lg:w-3/4 rounded-lg border border-gray-200 bg-white shadow-lg p-4 sm:p-6'>
          {/* URL Input */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6'>
            <input
              className='flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
              type="text"
              placeholder='Enter Long URL here...'
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <input type="submit" value="Shorten"
              className='bg-[#1D9E75] text-white cursor-pointer py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg font-bold hover:bg-[#15774d] transition sm:w-auto w-full'
            />
          </div>

          {/* Custom Alias */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <div className='w-full'>
              <label htmlFor="customAlias" className='cursor-pointer block text-xs sm:text-sm font-medium text-gray-700 mb-2'>
                Custom Alias (optional)
              </label>
              <input
                className='w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
                type="text"
                id='customAlias'
                placeholder='Type your custom url name here'
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>

            {/* Expiration Date */}
            <div className='w-full'>
              <label htmlFor="expires" className='block text-xs sm:text-sm font-medium cursor-pointer text-gray-700 mb-2'>
                Set expiration date (optional)
              </label>
              <input
                type="datetime-local"
                name="expires"
                id="expires"
                className='w-full py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>

      <ShortenedOutput response={response} />
      {/* <ShowOutput /> */}
      
    </div>
  )
}


export default Hero