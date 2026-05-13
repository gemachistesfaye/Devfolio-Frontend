import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, User, Code2, Layout, Mail, GitBranch, Globe, Zap } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'NAVIGATION' | 'SYSTEM' | 'SOCIALS';
}

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const commands: CommandItem[] = [
    { id: 'dev', title: 'Developer OS', subtitle: 'Switch to terminal mode', icon: <Terminal size={18} />, action: () => navigate('/developer'), category: 'NAVIGATION' },
    { id: 'client', title: 'Client Experience', subtitle: 'Switch to visual mode', icon: <Layout size={18} />, action: () => navigate('/client'), category: 'NAVIGATION' },
    { id: 'ethio', title: 'Project: Ethio-Brew', subtitle: 'Coffee SaaS Ecosystem', icon: <Code2 size={18} />, action: () => navigate('/client?project=PROT_01'), category: 'SYSTEM' },
    { id: 'health', title: 'Project: Sheger Health', subtitle: 'Clinic Management System', icon: <Code2 size={18} />, action: () => navigate('/client?project=PROT_02'), category: 'SYSTEM' },
    { id: 'git', title: 'GitHub Profile', subtitle: 'View source architectures', icon: <GitBranch size={18} />, action: () => window.open('https://github.com/gemachistesfaye', '_blank'), category: 'SOCIALS' },
    { id: 'in', title: 'LinkedIn', subtitle: 'Professional network', icon: <User size={18} />, action: () => window.open('https://www.linkedin.com/in/gemachis-tesfaye-137196318', '_blank'), category: 'SOCIALS' },
    { id: 'mail', title: 'Contact Engineer', subtitle: 'Send a direct inquiry', icon: <Mail size={18} />, action: () => window.location.href = 'mailto:gemachistesfaye36@gmail.com', category: 'SOCIALS' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    cmd.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-4 p-6 border-b border-white/5">
          <Search className="text-white/40" size={20} />
          <input 
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-white text-lg font-medium placeholder:text-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 font-black border border-white/10">ESC</div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 no-scrollbar">
          {['NAVIGATION', 'SYSTEM', 'SOCIALS'].map(cat => {
            const items = filteredCommands.filter(c => c.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="space-y-2">
                <div className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{cat}</div>
                <div className="space-y-1">
                  {items.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      onClick={() => handleSelect(cmd)}
                      className="w-full p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-white/[0.03] group text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#00ff00] group-hover:bg-[#00ff00]/10 transition-all">
                        {cmd.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white group-hover:text-[#00ff00] transition-all">{cmd.title}</div>
                        <div className="text-xs text-white/40">{cmd.subtitle}</div>
                      </div>
                      <Zap size={14} className="text-white/0 group-hover:text-[#00ff00]/40 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
           <div className="flex gap-4">
             <span>↑↓ Navigate</span>
             <span>↵ Select</span>
           </div>
           <span>Gemachis.OS // Command_Palette</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
