import React, { useState, useRef } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

const ShortenedOutput = ({ response }) => {
  const [copied, setCopied] = useState(false)
  const resp = response?.data?.shortUrl
  const inputRef = useRef(null)

  if (!resp) return null

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select()
      navigator.clipboard.writeText(resp).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        console.error('Failed to copy')
      })
    }
  }

  return (
    <div className='mt-8 animate-in fade-in zoom-in-95 duration-300'>
      <div className='w-full border border-emerald-100 bg-emerald-50/50 rounded-2xl p-5 sm:p-6 shadow-lg shadow-emerald-500/5'>
        <div className="flex items-center justify-between mb-4">
          <h2 className='text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2'>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            Your Shortened URL is Ready!
          </h2>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Success
          </span>
        </div>

        <div className='flex items-center justify-center gap-3 sm:flex-row flex-col'>
          <div className="relative flex-1 w-full">
            <input
              ref={inputRef}
              type='text'
              value={resp}
              readOnly
              className='w-full text-left font-mono font-semibold text-sm sm:text-base py-3 pl-4 pr-10 text-emerald-800 bg-white border border-emerald-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20'
            />
            <a 
              href={resp} 
              target="_blank" 
              rel="noreferrer" 
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition-colors"
              title="Open Link"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          <button 
            onClick={handleCopy} 
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 text-sm font-bold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer ${
              copied 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShortenedOutput





