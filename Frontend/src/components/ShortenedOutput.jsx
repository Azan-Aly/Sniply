import React, { useState, useRef } from 'react'

const ShortenedOutput = ({ response }) => {
  // const [shortUrl, setShortUrl] = useState('')
  // setShortUrl(response?.data?.shortUrl)
  
  const [copied, setCopied] = useState(false)
    const resp = response?.data?.shortUrl
    const inputRef = useRef(null)

    const handleCopy = () => {
      if (inputRef.current) {
        inputRef.current.select()
        navigator.clipboard.writeText(inputRef.current.value).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }).catch(() => {
          console.error('Failed to copy')
        })
      }
    }
  return (
    <div className='drop-shadow-lg lg:p-8 pb-12'>
        <div className='w-[95%] sm:w-[88%] md:w-[78%] mt-8 p-3 sm:p-4 rounded-md shadow bg-white mx-auto'>
        <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 text-center'>Shorted Url</h2>
        <div className='flex items-center justify-center gap-4 sm:flex-row flex-col'>
            <input
              ref={inputRef}
              type='text'
              placeholder='Your short URL will appear here'
              value={resp || ''}
              readOnly
              className='w-full text-center text-sm sm:text-base py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
              />
              <button onClick={handleCopy} className='w-full sm:w-auto text-lg bg-[#1D9E75] hover:bg-[#16a876]  text-white font-bold sm:py-2.5 py-1 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer'>
                {copied ? 'Copied!' : 'Copy'}
              </button>
          </div>
          </div>        
      
    </div>
    
  )
}

export default ShortenedOutput





