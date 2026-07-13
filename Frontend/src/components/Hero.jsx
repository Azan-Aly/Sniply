import React, { useState } from 'react'
import axiosActual from 'axios'
import ShortenedOutput from './ShortenedOutput'
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'sonner';
import RefreshToken from '../context/RefreshToken';
import { 
  Link2, 
  Sparkles, 
  Calendar, 
  Zap, 
  LineChart, 
  ShieldAlert, 
  ArrowRight, 
  MousePointerClick, 
  Globe2, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth();

  const [response, setResponse] = useState()
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      originalUrl: longUrl,
      customAlias: customAlias,
      expiryDate: expiryDate
    };
    if (loading) return;

    if (!user) {
      toast.error("Please login to shorten links!");
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axiosActual.post("http://localhost:3000/url/shorten", formData);

      setResponse(response.data);
      console.log("Success:", response.data);
      toast.success("URL shortened successfully!");

      setLongUrl('');
      setCustomAlias('');
      setExpiryDate('');

    } catch (error) {
      console.log(error.response)
      const { message, field } = error?.response?.data?.data || {};
      if (field === "customAlias") {
        toast.error("Alias already taken. Try a different one.");
      } else if(field === "noAuth"){
        toast.error("First login please")
        navigate("/login")
      }
       else {
        toast.error(message || "Something went wrong");
        console.log(error)
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 relative overflow-hidden font-sans'>
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* main Hero Header Section */}
        <div className='flex items-center flex-col pt-20 pb-12 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-top-6 duration-700'>
          {/* Announcement pill */}
          <div className='inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 mb-6 hover:bg-emerald-100/60 transition-colors duration-200 cursor-default'>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>✨ Sniply 2.0 is live! Customize and Track links</span>
          </div>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-none mb-6'>
            Shorten. Share.<br className="sm:hidden" />
            <span className='bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent px-1'>Track Smart.</span>
          </h1>

          <p className='text-base sm:text-lg lg:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed mb-8'>
            Turn long, cluttered URLs into clean, recognizable links in seconds. Elevate your sharing with customized aliases and powerful real-time visitor analytics.
          </p>
        </div>

        {/* Hero Input Form Card Section */}
        <div className='max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-6 duration-700'>
          <form onSubmit={submitHandler} className='w-full'>
            <div className='rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl shadow-slate-100/80 p-5 sm:p-7 hover:border-slate-300/80 transition-all duration-300'>
              
              {/* URL Input */}
              <div className='relative flex flex-col sm:flex-row gap-3 mb-5'>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Link2 size={20} />
                  </div>
                  <input
                    className='w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-800 bg-slate-50 hover:bg-slate-100/30 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200'
                    type="url"
                    placeholder='Paste your long URL here...'
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 px-7 rounded-xl transition-all duration-250 shadow-md shadow-emerald-200/50 hover:shadow-lg active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer sm:w-auto w-full'
                >
                  {isSubmitting ? 'Shortening...' : 'Shorten Link'}
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Custom Alias & Expiration */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5 mt-5'>
                {/* Custom Alias */}
                <div className='w-full'>
                  <label htmlFor="customAlias" className='flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 cursor-pointer'>
                    <Sparkles size={14} className="text-emerald-500" />
                    Custom Alias <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-semibold select-none border-r border-slate-200/70 pr-2">
                      snip.ly/
                    </div>
                    <input
                      className='w-full pl-22 pr-4 py-2.5 text-sm sm:text-base text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200'
                      type="text"
                      id='customAlias'
                      placeholder='my-slug'
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                    />
                  </div>
                </div>

                {/* Expiration Date */}
                <div className='w-full'>
                  <label htmlFor="expires" className='flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 cursor-pointer'>
                    <Calendar size={14} className="text-emerald-500" />
                    Set Expiration <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="expires"
                    id="expires"
                    className='w-full py-2.5 px-4 text-sm sm:text-base text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200'
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Rendering the shortened output card right here for maximum ease of use */}
          <ShortenedOutput response={response} />
        </div>

        {/* Features / Why Sniply Section */}
        <div className="border-t border-slate-200/60 pt-20 pb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-4">
              Everything you need in a Link Management Platform
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Sniply empowers creators, marketers, and businesses with simple yet advanced utility to scale link building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-250">
                <Zap size={22} fill="rgba(16, 185, 129, 0.1)" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Lightning Fast Redirections</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Enjoy optimized redirection speed with high uptime globally, ensuring your visitors never experience delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-250">
                <LineChart size={22} fill="rgba(16, 185, 129, 0.1)" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Detailed Analytics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Track link performance by monitoring detailed views, geographic location, referrers, and device configurations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-250">
                <Sparkles size={22} fill="rgba(16, 185, 129, 0.1)" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Branded Custom Slugs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Customize your shortened links with meaningful aliases to build trust and increase click-through rates by up to 34%.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform duration-250">
                <ShieldAlert size={22} fill="rgba(16, 185, 129, 0.1)" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Secure Expiring Links</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Safely configure auto-expiration dates on links to secure private documents, limited campaigns, or temporary media.
              </p>
            </div>
          </div>
        </div>

        {/* Mock Analytics Dashboard Preview */}
        <div className="py-16 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-5 max-w-md">
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs block mb-3">Real-time tracking</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 leading-tight mb-5">
                Stunning analytics dashboards ready for you
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                Understand who is clicking your links and when. Visualize performance data across countries, browsers, operating systems, and referrers.
              </p>
              
              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  Dynamic charts depicting click velocities
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  Geo-IP mapping down to city level
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  Referrals logs to measure campaigns
                </li>
              </ul>

              {!user && (
                <Link to="/register">
                  <button className="flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-xl transition-all cursor-pointer">
                    Get Access to Dashboard
                    <ArrowRight size={16} />
                  </button>
                </Link>
              )}
            </div>

            {/* Right Mock UI Card */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-2xl"></div>
              
              {/* Dashboard Bar */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <div className="text-slate-400 font-mono text-[11px] bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  snip.ly/dashboard/analytics
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Total Clicks</span>
                  <div className="flex items-baseline gap-1.5 font-sans">
                    <span className="text-xl font-bold text-white font-display">12,482</span>
                    <span className="text-[10px] font-semibold text-emerald-500">+14%</span>
                  </div>
                </div>
                
                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Active Links</span>
                  <div className="flex items-baseline gap-1.5 font-sans">
                    <span className="text-xl font-bold text-white font-display">84</span>
                    <span className="text-[10px] font-semibold text-emerald-500">+3</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-3.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Avg CTR</span>
                  <div className="flex items-baseline gap-1.5 font-sans">
                    <span className="text-xl font-bold text-white font-display">4.2%</span>
                    <span className="text-[10px] font-semibold text-emerald-500">+0.8%</span>
                  </div>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4.5 mb-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Clicks Performance (Past 7 Days)
                  </span>
                  <span className="text-[10px] text-slate-500">Updated 2m ago</span>
                </div>
                <div className="h-28 flex items-end gap-2.5 sm:gap-4.5 pt-2">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/20 rounded-md h-12 transition-all hover:bg-emerald-500/40 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Mon</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/30 rounded-md h-18 transition-all hover:bg-emerald-500/50 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Tue</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/40 rounded-md h-24 transition-all hover:bg-emerald-500/60 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Wed</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/20 rounded-md h-10 transition-all hover:bg-emerald-500/40 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Thu</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/60 rounded-md h-26 transition-all hover:bg-emerald-500/80 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Fri</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-md h-32 transition-all shadow-md shadow-emerald-500/20 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-500">Sat</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald-500/50 rounded-md h-20 transition-all hover:bg-emerald-500/70 cursor-default"></div>
                    <span className="text-[9px] font-bold text-slate-600">Sun</span>
                  </div>
                </div>
              </div>

              {/* Country breakdowns */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-slate-950/80 border border-slate-800/60 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe2 size={16} className="text-teal-400" />
                    <span className="text-xs font-semibold text-slate-300">USA Visitors</span>
                  </div>
                  <span className="text-xs font-bold text-white">48% (5,991)</span>
                </div>
                
                <div className="flex-1 bg-slate-950/80 border border-slate-800/60 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick size={16} className="text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-300">Top Referrer</span>
                  </div>
                  <span className="text-xs font-bold text-white font-sans">Twitter/X (62%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Flow */}
        <div className="py-16 border-t border-slate-200/60 text-center">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs block mb-3">Simple Steps</span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-12">How Sniply works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-250/20 mb-5 relative z-10">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Paste & Snip</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Insert your lengthy URL in the input bar. Add custom alias slugs or expiry schedules as needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-250/20 mb-5 relative z-10">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Share Link</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Copy the newly created neat link with one simple tap and deploy it on your platforms or documents.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-250/20 mb-5 relative z-10">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Track Metrics</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Open your analytics dashboard to watch visitor data grow. Gather statistics and analyze impact.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTA Section Banner */}
        <div className="my-16">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">
                Ready to take control of your links?
              </h2>
              <p className="text-slate-400 font-medium text-base mb-8">
                Join thousands of creators and professionals. Get access to detailed analytics and custom branding today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {user ? (
                  <Link to="/dashboard">
                    <button className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200 cursor-pointer">
                      Access Dashboard
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200 cursor-pointer">
                        Sign Up for Free
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="w-full sm:w-auto text-sm font-bold text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white px-7 py-3.5 rounded-xl transition-all duration-200 cursor-pointer bg-slate-900/50 hover:bg-slate-900">
                        Log In to Account
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RefreshToken />
    </div>
  )
}

export default Hero