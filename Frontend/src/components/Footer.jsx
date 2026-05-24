import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Heart } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top structured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand details (4 cols wide) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className='relative bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center rounded-xl h-8 w-8 shadow-md shadow-emerald-900/30'>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 8a3 3 0 0 1 4.24 0l1.5-1.5a3 3 0 0 0-4.24-4.24L6 3.76" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 8a3 3 0 0 1-4.24 0l-1.5 1.5a3 3 0 0 0 4.24 4.24L10 12.24" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className='font-display font-extrabold text-lg tracking-tight text-white'>
                snip<span className='bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent'>.ly</span>
              </span>
            </Link>
            <p className="text-sm font-medium text-slate-450 max-w-sm leading-relaxed mt-2">
              Empowering creators and modern businesses with lightning-fast URL shortening, custom branding, and real-time visitor analytics.
            </p>
            {/* Social icons */}
            <div className="flex gap-3.5 mt-2">
              {/* Twitter SVG */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950/40 hover:text-emerald-400 border border-slate-900 flex items-center justify-center transition-all duration-200 text-slate-450" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* GitHub SVG */}
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950/40 hover:text-emerald-400 border border-slate-900 flex items-center justify-center transition-all duration-200 text-slate-450" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              {/* LinkedIn SVG */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-950/40 hover:text-emerald-400 border border-slate-900 flex items-center justify-center transition-all duration-200 text-slate-450" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product features (2 cols wide) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Product</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">URL Shortener</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Analytics Preview</Link></li>
              <li><Link to="/profile" className="hover:text-emerald-400 transition-colors">Custom Branding</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Guides (2 cols wide) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Resources</h3>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Developer API</a></li>
              <li><a href="/" className="hover:text-emerald-400 transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup (4 cols wide) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">Stay Updated</h3>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              Subscribe to our newsletter to receive feature releases and modern link management tips.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 w-full bg-slate-900 border border-slate-900/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-950 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : (
                  <>
                    <span>Subscribe</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <p>&copy; {new Date().getFullYear()} snip.ly. All rights reserved.</p>
          </div>
          
          <div className="flex gap-5">
            <a href="/" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
            <span>for modern creators</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer