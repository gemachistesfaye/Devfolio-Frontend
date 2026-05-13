import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DeveloperMode from './pages/DeveloperMode';
import ClientMode from './pages/ClientMode';
import DeveloperProjects from './pages/DeveloperProjects';
import SkillsMatrix from './pages/SkillsMatrix';
import ExperienceTimeline from './pages/ExperienceTimeline';
import DeveloperContact from './pages/DeveloperContact';
import SystemAnalytics from './pages/SystemAnalytics';
import SystemArchitecture from './pages/SystemArchitecture';
import TopSystemBar from './components/TopSystemBar';
import CommandPalette from './components/CommandPalette';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('INITIALIZING DEVFOLIO OS');

  useEffect(() => {
    // Global mouse tracking for the glow effect
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Boot sequence
    const t1 = setTimeout(() => setLoadingText('LOADING AI MODULES...'), 800);
    const t2 = setTimeout(() => setLoadingText('CONNECTING SYSTEM CORE...'), 1600);
    const t3 = setTimeout(() => setIsLoading(false), 2400);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 selection:bg-primary/30 selection:text-white font-mono">
      <div className="mouse-glow" />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="fixed inset-0 z-[1000] bg-dark-900 flex flex-col items-center justify-center p-6 scanline-bg"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center text-primary font-black text-3xl shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                D_OS
              </div>
              <div className="w-64 h-1 bg-white/5 overflow-hidden relative">
                 <motion.div 
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 2.4, ease: "linear" }}
                   className="h-full bg-primary shadow-[0_0_10px_rgba(56,189,248,1)]" 
                 />
              </div>
              <motion.div 
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-primary uppercase tracking-[0.4em] animate-pulse"
              >
                {loadingText}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TopSystemBar />

      <main className="relative z-10 pt-14">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            
            {/* Developer Mode Routes */}
            <Route path="/developer/*" element={
              <div className="developer-mode">
                <Routes>
                  <Route index element={<DeveloperMode />} />
                  <Route path="terminal" element={<DeveloperMode />} />
                  <Route path="projects" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><DeveloperProjects /></div>} />
                  <Route path="skills" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><SkillsMatrix /></div>} />
                  <Route path="architecture" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><SystemArchitecture /></div>} />
                  <Route path="experience" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><ExperienceTimeline /></div>} />
                  <Route path="contact" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><DeveloperContact /></div>} />
                  <Route path="analytics" element={<div className="min-h-screen pt-20 px-8 bg-dark-900"><SystemAnalytics /></div>} />
                </Routes>
              </div>
            } />

            {/* Client Mode Routes */}
            <Route path="/client/*" element={<ClientMode />} />
          </Routes>
        </AnimatePresence>
      </main>

      <CommandPalette />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
