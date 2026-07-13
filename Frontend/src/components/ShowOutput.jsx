import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import {
  Trash2,
  Copy,
  CircleCheckBig,
  Link2,
  Calendar,
  Zap,
  Eye,
  ExternalLink
} from 'lucide-react'
import Score from './Score'

const ShowOutput = ({ refreshTrigger }) => {
  const [recentLinks, setRecentLinks] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchRecentLinks = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3000/url/recent')
      setRecentLinks(response.data.data)
    } catch (error) {
      console.error('Error fetching recent links:', error)
      toast.error('Failed to load links')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentLinks()
  }, [refreshTrigger])

  const deleteLink = async (shortId) => {
    try {
      setDeletingId(shortId)
      await axios.delete(`http://localhost:3000/url/${shortId}`)
      setRecentLinks(prev =>
        prev.filter(link => link.shortId !== shortId)
      )
      toast.success('Link deleted successfully')
    } catch (error) {
      console.error('Error deleting link:', error)
      toast.error('Failed to delete link')
    } finally {
      setDeletingId(null)
    }
  }

  const copyLink = (shortId) => {
    const linkToCopy = recentLinks.find(link => link.shortId === shortId)
    if (linkToCopy) {
      const fullShortUrl = `http://localhost:3000/${linkToCopy.shortId}`

      navigator.clipboard.writeText(fullShortUrl).then(() => {
        setCopiedId(shortId)
        toast.success('Link copied to clipboard!')

        setTimeout(() => {
          setCopiedId(null)
        }, 2000)
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <p className="text-lg text-slate-600">Loading your links...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-slate-100 via-white to-emerald-50 px-4 py-10'>
      <div className='mx-auto max-w-6xl'>
        
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <Link2 size={32} className='text-emerald-500' />
            <h1 className='text-4xl font-extrabold text-slate-800'>My Links</h1>
          </div>
          <p className='text-slate-600'>Manage and track all your shortened URLs in one place</p>
        </div>

        {/* Main Content */}
        {recentLinks.length > 0 ? (
          <div className='space-y-4'>
            {recentLinks.map((link, index) => (
              <div
                key={link.shortId}
                className='group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-emerald-200 animate-in fade-in slide-in-from-bottom-2'
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                  
                  {/* Left Section - URL Info */}
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='rounded-xl bg-emerald-100 p-2 text-emerald-600 group-hover:scale-110 transition-transform'>
                        <Link2 size={20} />
                      </div>
                      <a
                        href={`http://localhost:3000/${link.shortId}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-emerald-600 font-bold font-mono text-lg hover:text-emerald-700 hover:underline transition-colors'
                      >
                        {link.shortUrl}
                      </a>
                      <ExternalLink size={16} className='text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity' />
                    </div>

                    <p className='text-sm text-slate-600 mb-4 break-all'>
                      {link.originalUrl}
                    </p>

                    {/* Stats */}
                    <div className='flex flex-wrap items-center gap-3'>
                      <div className='flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 font-semibold text-sm'>
                        <Eye size={16} />
                        {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
                      </div>

                      <div className='flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 font-semibold text-sm'>
                        <Calendar size={16} />
                        {new Date(link.createdAt).toLocaleDateString()}
                      </div>

                      <div
                        className={`flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold text-sm transition-all ${
                          link.expiresAt &&
                          new Date(link.expiresAt) < new Date()
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <Zap size={16} />
                        {link.expiresAt &&
                        new Date(link.expiresAt) < new Date()
                          ? 'Expired'
                          : 'Active'}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className='flex items-center gap-3 lg:gap-2 flex-wrap lg:flex-col lg:justify-end'>
                    <button
                      onClick={() => copyLink(link.shortId)}
                      className='flex items-center justify-center gap-2 rounded-2xl text-emerald-500 hover:bg-emerald-100 px-4 py-2.5 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                      title='Copy link'
                    >
                      {copiedId === link.shortId ? (
                        <>
                          <CircleCheckBig size={18} />
                          <span className='hidden sm:inline'>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span className='hidden sm:inline'>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteLink(link.shortId)}
                      disabled={deletingId === link.shortId}
                      className='flex items-center justify-center gap-2 rounded-2xl text-red-500 hover:bg-red-100 px-4 py-2.5 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                      title='Delete link'
                    >
                      {deletingId === link.shortId ? (
                        <>
                          <div className='h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin'></div>
                          <span className='hidden sm:inline'>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          <span className='hidden sm:inline'>Delete</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center'>
            <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200'>
              <Link2 size={40} className='text-slate-400' />
            </div>
            <h2 className='text-2xl font-bold text-slate-800 mb-2'>No Links Yet</h2>
            <p className='text-slate-600 mb-6'>
              Start creating shortened URLs to see them appear here! 🚀
            </p>
            <div className='text-sm text-slate-500'>
              Use the shortener above to create your first link
            </div>
          </div>
        )}

        {/* Score Section */}
        <div className='mt-12'>
          <Score />
        </div>

      </div>
    </div>
  )
}

export default ShowOutput