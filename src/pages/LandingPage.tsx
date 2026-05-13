import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal, Briefcase, ChevronRight, Code2, LineChart, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredMode, setHoveredMode] = useState<'developer' | 'client' | null>(null);

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Gradients */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredMode === 'developer' ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNTYsIDE4OSLCAyNDgsIDAuMSkiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />
      </div>
      
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredMode === 'client' ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="absolute inset-0 bg-[#050816]/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center justify-center h-full">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold tracking-[0.3em] uppercase">
             Gemachis Tesfaye
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Choose Experience Mode
          </h1>
          <p className="text-gray-400 font-medium">Select your preferred viewing environment.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative">
          
          {/* Developer Mode Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => setHoveredMode('developer')}
            onMouseLeave={() => setHoveredMode(null)}
            onClick={() => navigate('/developer/terminal')}
            className={`cursor-pointer group relative p-1 rounded-3xl transition-all duration-500 ${
              hoveredMode === 'developer' ? 'scale-105' : hoveredMode === 'client' ? 'scale-95 opacity-50 grayscale' : 'scale-100'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-green-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-[#0A0D18] border border-cyan-500/20 group-hover:border-cyan-500/50 rounded-[22px] p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[400px]">
              
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={120} className="text-cyan-400" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Code2 size={32} />
                </div>
                
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Developer OS</h2>
                  <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">Hacker / Terminal UI</div>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    Dive deep into the architecture. Access terminal interfaces, system metrics, code structure, and raw technical capability designed for engineers and recruiters.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-8 text-cyan-400 font-bold uppercase tracking-widest text-xs relative z-10">
                Initialize System <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Client Mode Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => setHoveredMode('client')}
            onMouseLeave={() => setHoveredMode(null)}
            onClick={() => navigate('/client')}
            className={`cursor-pointer group relative p-1 rounded-3xl transition-all duration-500 ${
              hoveredMode === 'client' ? 'scale-105' : hoveredMode === 'developer' ? 'scale-95 opacity-50 grayscale' : 'scale-100'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative h-full bg-[#0A0D18] border border-blue-500/20 group-hover:border-blue-500/50 rounded-[22px] p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[400px]">
              
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Briefcase size={120} className="text-blue-400" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
                </div>
                
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Client Mode</h2>
                  <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">SaaS / Business UI</div>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    A streamlined, elegant experience focused on business value, product outcomes, and SaaS execution. Designed for founders, clients, and startups.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-8 text-blue-400 font-bold uppercase tracking-widest text-xs relative z-10">
                View Portfolio <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-4 text-xs font-mono text-gray-500"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          SYSTEM ONLINE • READY FOR DEPLOYMENT
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;
