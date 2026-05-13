import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, User, Download } from 'lucide-react';

const TopSystemBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = location.pathname.startsWith('/developer');
  const [time, setTime] = useState(new Date());
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  if (!isDev) return null;

  return (
    <header className="fixed top-0 left-0 w-full h-12 z-[100] border-b border-white/5 bg-dark-900/70 backdrop-blur-xl flex items-center px-5 justify-between">

      {/* LEFT — Branding */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-dark-900 font-black text-sm shadow-[0_0_12px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-transform">
            G
          </div>
          <span className="text-[11px] font-black text-white uppercase tracking-widest hidden sm:block">
            Gemachis<span className="text-primary">.OS</span>
          </span>
        </div>

        <div className="h-5 w-px bg-white/10 hidden md:block" />

        {/* Ctrl+K hint */}
        <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-white/30">
          <span className="border border-white/10 rounded px-1.5 py-0.5 bg-white/5">⌘</span>
          <span className="border border-white/10 rounded px-1.5 py-0.5 bg-white/5">K</span>
        </div>
      </div>

      {/* CENTER — Live status pill */}
      <div className="hidden lg:flex items-center gap-4 bg-white/5 px-5 py-1.5 rounded-full border border-white/5 text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <Activity size={11} className="text-green-400 animate-pulse" />
          <span className="text-white/40">LATENCY:</span>
          <span className="text-white">12ms</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="text-white/40">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-bold">ONLINE</span>
        </div>
      </div>

      {/* RIGHT — Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/client')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider hover:bg-purple-500/20 transition-all"
        >
          <User size={11} />
          Client
        </button>

        <button
          onClick={handleInstallClick}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-wider hover:text-white transition-all"
        >
          <Download size={11} />
          Install
        </button>

        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-[10px] font-black border border-primary/30 cursor-pointer hover:scale-110 transition-transform" title="Gemachis Tesfaye">
          GT
        </div>
      </div>
    </header>
  );
};

export default TopSystemBar;
