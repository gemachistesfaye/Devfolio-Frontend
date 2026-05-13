import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl">
        <button 
          onClick={() => navigate('/')}
          className="hover:text-primary transition-colors flex items-center gap-2"
        >
          <Home size={18} />
          <span className="hidden md:block font-bold tracking-tighter">DEVFOLIO</span>
        </button>

        <div className="h-4 w-[1px] bg-white/20" />

        <div className="flex gap-6 text-sm font-medium">
          <NavLink 
            to="/developer" 
            className={({isActive}) => `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-400'}`}
          >
            Developer
          </NavLink>
          <NavLink 
            to="/client" 
            className={({isActive}) => `transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-400'}`}
          >
            Client
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
