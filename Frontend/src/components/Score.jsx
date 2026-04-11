import React, { useState } from 'react'

const Score = ({ response }) => {
  const [shortUrl, setShortUrl] = useState('')
    // setShortUrl(response?.data?.shortUrl)
    const resp = response?.data?.shortUrl
  return (
    <div className='flex items-center justify-center py-10 px-8'>
      <div className='w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Shorted Url</h2>
        <input
          type='text'
          placeholder='Your short URL will appear here'
          value={resp}
          readOnly
          className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none'
        />
      </div>``
    </div>
  )
}

export default Score






































// import React from 'react'

// const Score = ({ response }) => {
//   const totalLinks = response?.data?.totalLinks || 0
//   const totalClicks = response?.data?.clicks || 0
//   const activeToday = response?.data?.activeToday || 0

//   const stats = [
//     {
//       id: 1,
//       value: totalLinks,
//       label: 'Total links',
//       icon: '🔗'
//     },
//     {
//       id: 2,
//       value: totalClicks,
//       label: 'Total Clicks',
//       icon: '👆'
//     },
//     {
//       id: 3,
//       value: activeToday,
//       label: 'Active Today',
//       icon: '🔥'
//     }
//   ]

//   const StatCard = ({ stat }) => (
//     <div className='w-1/3 bg-[#1d9e75] hover:bg-[#16a876] text-white text-center rounded-lg p-6 shadow-md transition-all duration-300 transform hover:scale-105'>
//       <div className='text-4xl mb-2'>{stat.icon}</div>
//       <h2 className='text-3xl font-bold mb-2'>{stat.value}</h2>
//       <p className='text-sm font-medium uppercase tracking-wide'>{stat.label}</p>
//     </div>
//   )
    
//   return (
//     <div className='flex items-center justify-between gap-6 py-10 px-8 sm:px-16 md:px-34'>
//       {stats.map(stat => (
//         <StatCard key={stat.id} stat={stat} />
//       ))}
//     </div>
//   )
// }

// export default Score