import React from 'react';
import { motion } from 'framer-motion';

const ClientNavbar: React.FC = () => {
  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-dark/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs">D</div>
          <span className="font-bold text-xl tracking-tighter">DEVFOLIO<span className="text-primary">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary px-6 py-2.5 text-xs">
            Start Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
