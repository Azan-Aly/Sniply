import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, MousePointer2, MonitorCheck } from 'lucide-react'

const Score = () => {
  const [data, setData] = useState({});
  const getStats = async () => {
    try{
      const response = await axios.get("http://localhost:3000/url/stats")
      // console.log("Stats:", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  useEffect(() => {
    getStats();
  }, [])
 

  const stats = [
    {
      id: 1,
      value: data.totalLinks || 0,
      label: 'Total Links',
      icon: <Link />
    },
    {
      id: 2,
      value: data.clicks || 0,
      label: 'Total Clicks',
      icon: <MousePointer2 />
    },
    {
      id: 3,
      value: data.activeToday || 0,
      label: 'Active Today',
      icon: <MonitorCheck />
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-12 py-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{stat.icon}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-black text-center">
            {stat.value}
          </h2>

          <div className="mt-3 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Score