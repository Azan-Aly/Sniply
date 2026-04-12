import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2 } from 'lucide-react';
import Score from './Score';


const ShowOutput = ({ refreshTrigger }) => {

  const [recentLinks, setRecentLinks] = useState([]);
  
  const fetchRecentLinks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/url/recent');
      setRecentLinks(response.data.data);
      // console.log("Recent Links:", response.data.data);
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
        <div className='w-[92%] mb-20 bg-white drop-shadow mx-auto mt-8 rounded-lg p-6 '>
          {recentLinks.length > 0 ? (
            <>
              <p className='font-semibold'>Recent Links</p>
              {recentLinks.map((link, index) => (
                <div key={index}>
                  <div className='mt-4 flex flex-col sm:flex-row  sm:items-center justify-between'>
                    <div>
                      <p className='text-[#31c77f] font-semibold font-mono text-lg'>{link.shortUrl}</p>
                      <p className='text-sm text-[#8b8b8b] mb-2'>{link.originalUrl}</p>
                      <div className='flex items-start flex-col gap-2 sm:flex-row'>
                        <span className='rounded-full bg-[#1D9E75] text-white px-4 py-1  '>{link.clicks} clicks</span>
                        <span className='rounded-full bg-[#4d4d4d] text-white px-4 py-1 sm:ml-2 '>{new Date(link.createdAt).toLocaleDateString()}</span>
                        <span className={`rounded-full ${link.expiresAt && new Date(link.expiresAt) < new Date() ? 'bg-[#e5e5e5] text-red-500' : 'bg-[#31c77f] text-white'} px-4 py-1 sm:ml-2 text-center`}>{link.expiresAt && new Date(link.expiresAt) < new Date() ? 'expired' : 'active'}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteLink(link.shortId)} className='focus:outline-none cursor-pointer text-red-500 px-4 py-2 rounded h-fit'><Trash2 color='currentColor' /></button>
                  </div>
                  <hr className='m-4'/>
                </div>
              ))}
            </>
          ) : (
            <p className='text-center text-[#8b8b8b] py-8'>No recent links</p>
          )}
        </div>
        
        <Score />
    </div>
  )
}

export default ShowOutput