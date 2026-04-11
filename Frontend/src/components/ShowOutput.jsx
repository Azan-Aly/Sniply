import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ShowOutput = ({ refreshTrigger }) => {

  const [recentLinks, setRecentLinks] = useState([]);
  
  const fetchRecentLinks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/url/recent');
      setRecentLinks(response.data.data);
      console.log("Recent Links:", response.data.data);
    } catch (error) {
      console.error('Error fetching recent links:', error);
    }
  }

  useEffect(() => {
    fetchRecentLinks();
  }, [])



  const deleteLink = async (shortId) => {
    try {
      await axios.delete(`http://localhost:3000/url/${shortId}`);
      setRecentLinks(recentLinks.filter(link => link.shortId !== shortId));
      console.log("Link deleted:", shortId);

    } catch (error) {
      console.error('Error deleting link:', error);
    }
  }


  return (
    <div className='w-full rounded-lg p-4 overflow-y-auto'>
        <div className='w-[80%] mb-20 bg-white shadow mx-auto mt-8 rounded-lg p-6 '>
          {recentLinks.length > 0 ? (
            <>
              <p className='font-semibold'>Recent Links</p>
              {recentLinks.map((link, index) => (
                <div key={index}>
                  <div className='mt-4 flex items-center justify-between'>
                    <div>
                      <p className='text-[#31c77f] font-semibold font-mono text-lg'>{link.shortUrl}</p>
                      <p className='text-sm text-[#8b8b8b] mb-2'>{link.originalUrl}</p>
                      <span className='rounded-full bg-[#1D9E75] text-white px-4 py-1  '>{link.clicks} clicks</span>
                      <span className='rounded-full bg-[#4d4d4d] text-white px-4 py-1 ml-2 '>{new Date(link.createdAt).toLocaleDateString()}</span>
                      <span className={`rounded-full ${link.expiresAt && new Date(link.expiresAt) < new Date() ? 'bg-[#e5e5e5] text-red-500' : 'bg-[#31c77f] text-white'} px-4 py-1 ml-2 text-center`}>{link.expiresAt && new Date(link.expiresAt) < new Date() ? 'expired' : 'active'}</span>
                    </div>
                    <button onClick={() => deleteLink(link.shortId)} className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded h-fit'>Delete</button>
                  </div>
                  <hr className='mt-4'/>
                </div>
              ))}
            </>
          ) : (
            <p className='text-center text-[#8b8b8b] py-8'>No recent links</p>
          )}
        </div>
    </div>
  )
}

export default ShowOutput