import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Globe, Briefcase, Zap, Heart, MessageSquare } from 'lucide-react';

const ClientSidebar: React.FC = () => {
  const menuItems = [
    { icon: <Globe size={20} />, label: "Overview", id: "hero" },
    { icon: <Zap size={20} />, label: "Services", id: "services" },
    { icon: <Briefcase size={20} />, label: "Portfolio", id: "work" },
    { icon: <Heart size={20} />, label: "Social Proof", id: "testimonials" },
    { icon: <MessageSquare size={20} />, label: "Inquiry", id: "contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-20 lg:w-64 h-[calc(100vh-3.5rem)] bg-dark border-r border-white/5 flex flex-col p-4 fixed left-0 top-14 z-50">
      <div className="mb-10 lg:px-4 flex justify-center lg:justify-start">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black">D</div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.id)}
            className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-2xl text-text-secondary hover:bg-white/5 hover:text-white transition-all group"
          >
            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="hidden lg:block font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto hidden lg:block p-4 glass rounded-3xl border-primary/10">
        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Status</div>
        <div className="text-xs font-bold text-white">Accepting Clients</div>
      </div>
    </div>
  );
};

export default ClientSidebar;
