import React from 'react'

const About = () => {
  return (
    <div>
         {/* <div className='flex justify-center px-4 w-full'>
        <div className='w-4/5 min-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg p-8'>
          
          <div className='flex gap-2 mb-6'>
            <input
              className='flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
              type="text"
              placeholder='Enter Long URL here...'
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              onClick={handleShorten}
              className='bg-[#1D9E75] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#15774d] transition'
            >
              Shorten
            </button>
          </div>

          {/* Custom Alias 
          <div className='flex justify-between items-center gap-4 lg:flex-row'>
            <div className='w-full'>
              <label htmlFor="customAlias" className='block text-sm font-medium text-gray-700 mb-2'>
                Custom Alias (optional)
              </label>
              <input
                className='w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D9E75]'
                type="text"
                id='customAlias'
                placeholder='Type your custom alias here (optional)'
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>

            {/* Expiration Date 
            <div className='w-full'>
              <label htmlFor="expires" className='block text-sm font-medium text-gray-700 mb-2'>
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
      </div> */}



        {/* <div className='bg-fuchsia-500'>
        <form action="" className='w-[80%] mx-auto bg-fuchsia-200 flex flex-wrap'>
            <input type="text" name="url" id="url" className='w-[80%]'/>
            <button className='w-[20%] bg-amber-200 px-4 py-2'>Shorten</button>

            <label className='mt-16 w-[50%]' htmlFor="alias">Custom alias (optional)</label>
            <input type="text" name="alias" id="" />

            <label className='mt-16 w-[50%]' htmlFor="expiryDate"></label>
            <input type="datetime-local" name="expiryDate" id="expiryDate" />
        </form>
        </div> */}
    </div>
  )
}

export default About