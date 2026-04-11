import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-white to-[#cffff0] text-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 text-black">Sniply</h2>
            <p className="text-black">Make your links shorter, smarter, and better.</p>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="/" className="text-black hover:text-[#15c08a] transition-colors rounded">Home</a>
            <a href="/about" className="text-black hover:text-[#15c08a] transition-colors rounded">About</a>
            <a href="/contact" className="text-black hover:text-[#15c08a] transition-colors rounded">Contact</a>
            <a href="/" className="text-black hover:text-[#15c08a] transition-colors rounded">Privacy</a>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center text-black text-sm">
          <p>&copy; 2026 snip.ly - URL Shortener. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer