import React, { useState } from 'react'
import axios from 'axios'
import Score from './Score'
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
      <div className='flex items-center flex-col py-12'>
        <p className='rounded-full bg-[#cffff0] text-[#12a073] py-1 px-3 font-light text-sm'>snip.ly</p>
        <h1 className='text-4xl font-bold my-4 font-sans text-gray-900'>Shorten. Share. Track.</h1>
        <p className='text-gray-600 font-sans font-medium text-lg'>Turn long URLs into clean, shareable links in seconds</p>
      </div>

      {/* Hero Input Section */}
      <form onSubmit={submitHandler} className='flex justify-center px-4 w-full '>
        <div className='w-4/5 min-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg p-8'>
          {/* URL Input */}
          <div className='flex gap-2 mb-6'>
            <input
              className='flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
              type="text"
              placeholder='Enter Long URL here...'
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <input type="submit" value="Shorten"
              className='bg-[#1D9E75] text-white cursor-pointer py-3 px-6 rounded-lg font-bold hover:bg-[#15774d] transition'
            />
          </div>

          {/* Custom Alias */}
          <div className='flex justify-between items-center gap-4 lg:flex-row'>
            <div className='w-full'>
              <label htmlFor="customAlias" className='cursor-pointer block text-sm font-medium text-gray-700 mb-2'>
                Custom Alias (optional)
              </label>
              <input
                className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
                type="text"
                id='customAlias'
                placeholder='Type your custom url name here'
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>

            {/* Expiration Date */}
            <div className='w-full'>
              <label htmlFor="expires" className='block text-sm font-medium cursor-pointer text-gray-700 mb-2'>
                Set expiration date (optional)
              </label>
              <input
                type="datetime-local"
                name="expires"
                id="expires"
                className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>

      <Score response={response} />
      {/* <ShowOutput /> */}
      
    </div>
  )
}


export default Hero