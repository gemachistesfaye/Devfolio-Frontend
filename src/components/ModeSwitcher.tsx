import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Briefcase, Activity, FileJson, FileCode, FileType, FileText, Globe, Zap, Heart, MessageSquare } from 'lucide-react';

const TopSystemBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = location.pathname.startsWith('/developer');

  const devFiles = [
    { name: "overview.json", icon: <FileJson size={14} className="text-yellow-500" />, path: "/developer" },
    { name: "projects.ts", icon: <FileCode size={14} className="text-blue-400" />, path: "/developer/projects" },
    { name: "skills.css", icon: <FileCode size={14} className="text-purple-400" />, path: "/developer/skills" },
    { name: "architecture.drawio", icon: <FileType size={14} className="text-orange-400" />, path: "/developer/architecture" },
    { name: "timeline.md", icon: <FileText size={14} className="text-blue-300" />, path: "/developer/timeline" },
    { name: "contact.api", icon: <FileCode size={14} className="text-green-400" />, path: "/developer/contact" }
  ];

  const clientLinks = [
    { name: "Services", icon: <Zap size={14} />, id: "#services" },
    { name: "Portfolio", icon: <Briefcase size={14} />, id: "#work" },
    { name: "Process", icon: <Activity size={14} />, id: "#process" },
    { name: "Social", icon: <Heart size={14} />, id: "#testimonials" },
    { name: "Contact", icon: <MessageSquare size={14} />, id: "#contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100]">
      {/* Primary Switcher Bar */}
      <header className={`
        w-full h-14 border-b flex items-center px-6 justify-between backdrop-blur-xl
        ${isDev ? 'bg-[#252526]/90 border-[#3C3C3C]' : 'bg-[#0F172A]/90 border-white/5 shadow-lg'}
      `}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${isDev ? 'bg-[#007ACC] text-white' : 'bg-primary text-white'}`}>
              {isDev ? 'OS' : 'D'}
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase ${isDev ? 'text-gray-400 font-mono' : 'text-white'}`}>
              {isDev ? '<DEVFOLIO_OS />' : 'DEVFOLIO CLIENT'}
            </span>
          </div>

          {/* Mode Switcher Pills */}
          <div className={`flex items-center p-1 rounded-full border ${isDev ? 'bg-[#1E1E1E] border-[#3C3C3C]' : 'bg-white/5 border-white/10'}`}>
            <button onClick={() => navigate('/developer')} className={`px-4 py-1 rounded-full text-[9px] font-bold transition-all ${isDev ? 'bg-[#007ACC] text-white' : 'text-text-secondary'}`}>
              DEV_MODE
            </button>
            <button onClick={() => navigate('/client')} className={`px-4 py-1 rounded-full text-[9px] font-bold transition-all ${!isDev ? 'bg-primary text-white' : 'text-text-secondary'}`}>
              CLIENT_MODE
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-gray-500">
           <Activity size={12} className={isDev ? 'text-green-500' : 'text-primary'} />
           {isDev ? 'SYS_READY' : 'PROJ_OPEN'}
        </div>
      </header>

      {/* Secondary Navigation (Tabs) Bar */}
      <nav className={`
        w-full h-10 border-b flex items-center px-6 overflow-x-auto no-scrollbar
        ${isDev ? 'bg-[#2D2D2D] border-[#3C3C3C]' : 'bg-[#111827] border-white/5'}
      `}>
        {isDev ? (
          <div className="flex items-center">
            {devFiles.map(file => (
              <NavLink
                key={file.name}
                to={file.path}
                end
                className={({isActive}) => `
                  h-10 px-4 flex items-center gap-2 text-xs border-r border-[#3C3C3C] transition-colors
                  ${isActive ? 'bg-[#1E1E1E] text-white border-t border-t-[#007ACC]' : 'text-gray-500 hover:bg-[#37373D] hover:text-gray-300'}
                `}
              >
                {file.icon}
                {file.name}
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            {clientLinks.map(link => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-2 text-[11px] font-bold text-text-secondary hover:text-white transition-colors"
              >
                {link.icon}
                {link.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default TopSystemBar;
