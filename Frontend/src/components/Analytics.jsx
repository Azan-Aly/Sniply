import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  TrendingUp,
  Link2,
  MousePointer,
  Zap,
  Calendar
} from 'lucide-react'

const Analytics = () => {
  const [stats, setStats] = useState(null)
  const [recentLinks, setRecentLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const [statsRes, linksRes] = await Promise.all([
          axios.get('http://localhost:3000/url/stats'),
          axios.get('http://localhost:3000/url/recent')
        ])

        setStats(statsRes.data.data)
        setRecentLinks(linksRes.data.data || [])
      } catch (error) {
        console.error('Error fetching analytics:', error)
        toast.error('Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <p className="text-lg text-slate-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  // Prepare data for charts
  const topLinks = recentLinks
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8)

  const chartData = topLinks.map(link => ({
    name: link.shortUrl.split('/').pop().slice(0, 10),
    clicks: link.clicks,
    shortUrl: link.shortUrl
  }))

  const pieData = recentLinks.length > 0
    ? [
      { name: 'Total Clicks', value: stats?.clicks || 0 },
      { name: 'Links Created', value: stats?.totalLinks || 0 }
    ]
    : []

  const COLORS = ['#10b981', '#06b6d4']

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-emerald-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 flex items-center gap-3">
            <TrendingUp size={40} className="text-emerald-500" />
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-2">Track your URL shortener performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Links Card */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Links Created</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {stats?.totalLinks || 0}
                </h2>
                <p className="text-emerald-600 text-sm font-semibold mt-3">
                Active URLs in your account
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                <Link2 size={32} />
              </div>
            </div>
          </div>

          {/* Total Clicks Card */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Clicks</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {stats?.clicks || 0}
                </h2>
                <p className="text-cyan-600 text-sm font-semibold mt-3">
                  Cumulative link clicks
                </p>
              </div>
              <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
                <MousePointer size={32} />
              </div>
            </div>
          </div>

          {/* Active Today Card */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Created Today</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {stats?.activeToday || 0}
                </h2>
                <p className="text-purple-600 text-sm font-semibold mt-3">
                  Links created today
                </p>
              </div>
              <div className="rounded-2xl bg-purple-100 p-4 text-purple-600">
                <Calendar size={32} />
              </div>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Top Links Bar Chart */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Top Performing Links</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="clicks" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </div>

          {/* Stats Distribution Pie Chart */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Statistics Overview</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </div>

        </div>

        {/* Recent Links Table */}
        <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6">All Links</h3>
          
          {recentLinks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-600">Short URL</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-600">Original URL</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-600">Clicks</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-600">Created</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLinks.map((link) => (
                    <tr
                      key={link.shortId}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-emerald-600 font-semibold font-mono">
                          {link.shortUrl}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-slate-800 truncate block max-w-xs"
                          title={link.originalUrl}
                        >
                          {link.originalUrl.length > 40
                            ? link.originalUrl.slice(0, 40) + '...'
                            : link.originalUrl}
                        </a>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 font-semibold">
                          {link.clicks}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-600">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 font-semibold ${
                            link.expiresAt &&
                            new Date(link.expiresAt) < new Date()
                              ? 'bg-red-100 text-red-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {link.expiresAt &&
                          new Date(link.expiresAt) < new Date()
                            ? 'Expired'
                            : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No links created yet. Start shortening URLs!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Analytics
