import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Download, Mail, MapPin, CheckCircle2,
  Code2, Database, Sparkles, TerminalSquare, Layout,
  Globe, Layers, ChevronRight, Zap, ExternalLink, GitBranch, ChevronLeft,
  MessageCircle, Camera, LineChart, Target, Clock, BarChart3,
  Shield, Rocket, Activity, Users, Search, Bell, Settings,
  PieChart, TrendingUp, Cpu, User, Sun, Moon, Terminal, ChevronDown
} from 'lucide-react';
import { DevfolioAI } from '../components/DevfolioAI';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500 origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-10 opacity-40"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(56, 189, 248, 0.1),
            transparent 80%
          )
        `,
      }}
    />
  );
};

const BackgroundEffects = ({ isDark }: { isDark: boolean }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* BASE LAYER: DEEP SPACE */}
    <div className={`absolute inset-0 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`} />
    
    {/* LAYER 1: PRECISION GRID */}
    <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'invert' : ''}`} 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 60H0V0h60v60zM1 1h58v58H1V1z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />

    {/* LAYER 2: CINEMATIC AURORA ORBS */}
    <motion.div 
      animate={{ 
        x: [0, 80, 0], 
        y: [0, 40, 0],
        scale: [1, 1.2, 1] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[130px] opacity-[0.12] ${isDark ? 'bg-cyan-500' : 'bg-cyan-200'}`} 
    />
    <motion.div 
      animate={{ 
        x: [0, -100, 0], 
        y: [0, 150, 0],
        scale: [1, 1.3, 1] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className={`absolute top-[20%] -right-[15%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-[0.1] ${isDark ? 'bg-purple-600' : 'bg-purple-200'}`} 
    />
    <motion.div 
      animate={{ 
        x: [0, 60, 0], 
        y: [0, -120, 0],
        scale: [1.2, 1, 1.2] 
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className={`absolute -bottom-[15%] left-[10%] w-[50%] h-[50%] rounded-full blur-[110px] opacity-[0.08] ${isDark ? 'bg-amber-500' : 'bg-amber-200'}`} 
    />

    {/* LAYER 3: SPECTRAL PARTICLES */}
    <div className="absolute inset-0">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: Math.random() * 1000 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [null, Math.random() * -600],
            x: [null, (Math.random() - 0.5) * 250]
          }}
          transition={{ 
            duration: 12 + Math.random() * 25, 
            repeat: Infinity, 
            delay: Math.random() * 12 
          }}
          className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'} blur-[1px]`}
          style={{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>

    {/* LAYER 4: NOISE & MESH DEPTH */}
    <div className={`absolute inset-0 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.01]'} noise-bg`} />
  </div>
);

const ClientMode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Ecosystem',
      desc: 'Architecting high-fidelity interfaces and fluid user experiences',
      icon: <Layout size={20} />,
      skills: [
        { name: 'React.js & Logic', level: 95, desc: 'Production-ready SPAs & complex state' },
        { name: 'TypeScript', level: 88, desc: 'Type-safe, maintainable enterprise code' },
        { name: 'Tailwind CSS', level: 95, desc: 'Modern, responsive design systems' },
        { name: 'Framer Motion', level: 90, desc: 'Cinematic transitions & interactions' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Infrastructure',
      desc: 'Engineering secure server-side logic and relational data systems',
      icon: <Database size={20} />,
      skills: [
        { name: 'Node.js & Express', level: 92, desc: 'Scalable RESTful API architecture' },
        { name: 'SQL Architecture', level: 85, desc: 'MySQL & PostgreSQL relational design' },
        { name: 'Authentication', level: 90, desc: 'JWT, OAuth, and RBAC security' },
        { name: 'System Performance', level: 88, desc: 'Query optimization & server health' }
      ]
    },
    {
      id: 'ai-data',
      title: 'AI Systems',
      desc: 'Building intelligent automation and data-driven solutions',
      icon: <Cpu size={20} />,
      skills: [
        { name: 'Gemini AI Logic', level: 85, desc: 'Integrating LLMs into real-world workflows' },
        { name: 'Information Science', level: 90, desc: 'Data organization and systems analysis' },
        { name: 'Workflow Automation', level: 88, desc: 'Reducing friction in business operations' },
        { name: 'Data Visualization', level: 82, desc: 'Transforming data into actionable insights' }
      ]
    },
    {
      id: 'tools',
      title: 'DevOps & Deployment',
      desc: 'Streamlining the path from code to production',
      icon: <Settings size={20} />,
      skills: [
        { name: 'Git & Versioning', level: 92, desc: 'Collaborative development standards' },
        { name: 'Cloud Deployment', level: 85, desc: 'Vercel, Render, and CI/CD pipelines' },
        { name: 'Security Auditing', level: 88, desc: 'Hardening digital infrastructure' },
        { name: 'SEO & Performance', level: 84, desc: 'Ensuring fast, discoverable systems' }
      ]
    }
  ];
  
  const projects = [
    { 
      id: 'PROT_01', 
      title: 'Ethio-Brew', 
      summary: 'A production-grade coffee e-commerce ecosystem bringing Ethiopian heritage to the digital age. Built with AI-driven intelligence, multilingual support, and a robust business command center.', 
      features: [
        { title: 'Multilingual Excellence', desc: 'Full native support for English, Amharic, and Afaan Oromo.' },
        { title: 'Gemini AI Sommelier', desc: 'Intelligent coffee recommendations and brewing science insights.' },
        { title: 'Admin Command Center', desc: 'Real-time business intelligence with live revenue tracking.' }
      ],
      impact: 'Modernized traditional coffee trade logic, increasing digital reach by 40% in initial testing.',
      tech: ['React.js', 'Node.js', 'MySQL', 'Gemini Pro', 'Tailwind'], 
      status: 'OPERATIONAL' 
    },
    { 
      id: 'PROT_02', 
      title: 'Sheger Health Connect', 
      summary: 'A modern clinical health-tech platform designed for Ethiopian medical facilities. Focuses on secure patient data management, role-based workflows, and AI-powered triage.', 
      features: [
        { title: 'RBAC Security', desc: 'Tiered access control for Admins, Doctors, and Patients with JWT.' },
        { title: 'AI Triage Assistant', desc: 'Intelligent health advisor powered by GPT-4 for symptoms.' },
        { title: 'Clinical Dashboards', desc: 'Real-time monitoring of appointments and hospital metrics.' }
      ],
      impact: 'Reduces manual triage latency by 65% through intelligent symptomatology routing.',
      tech: ['React', 'Node.js', 'MySQL', 'Socket.io', 'GPT-4'], 
      status: 'PRODUCTION_READY' 
    },
    { 
      id: 'PROT_03', 
      title: 'LaundryFlow', 
      summary: 'A high-performance laundry management SaaS optimized for university campuses. Streamlines manual operations into a digital pipeline with real-time tracking.', 
      features: [
        { title: 'Unique-ID Tracking', desc: 'Precision clothing identification system to eliminate loss.' },
        { title: 'Wallet-Based Payments', desc: 'Integrated digital wallet system with secure verification.' },
        { title: 'Real-Time Status', desc: 'Live tracking from clothes submission to final delivery.' }
      ],
      impact: 'Scaled to manage 500+ daily orders with zero item-loss integrity.',
      tech: ['React', 'Node.js', 'MySQL', 'Vite', 'JWT'], 
      status: 'ACTIVE' 
    },
    { 
      id: 'PROT_04', 
      title: 'Heritage Portal', 
      summary: 'An interactive cultural intelligence platform preserving Ethiopian heritage. Bridges the gap between traditional calendars and modern software with AI-powered insights.', 
      features: [
        { title: 'Dual-Calendar Engine', desc: 'Precision JDN algorithms syncing Gregorian and Ethiopian calendars.' },
        { title: 'AI Heritage Guide', desc: 'Gemini-powered assistant trained on Ethiopian history.' },
        { title: 'Private Heritage Box', desc: 'Secure, client-side cultural planning and reminder system.' }
      ],
      impact: 'Preserves 3000+ years of cultural logic through accessible digital architecture.',
      tech: ['TypeScript', 'React 19', 'Gemini Flash', 'Tailwind', 'JDN Logic'], 
      status: 'VERIFIED' 
    }
  ];

  // Deep Link Support for Command Palette
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get('project');
    if (projectId) {
      const index = projects.findIndex(p => p.id === projectId);
      if (index !== -1) {
        setActiveProject(index);
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.search, projects]);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} font-inter selection:bg-yellow-500/30 transition-colors duration-500 noise-bg cursor-default`}>
      <ScrollProgress />
      <MouseGlow />
      <BackgroundEffects isDark={isDark} />
      
      {/* NAVIGATION_PILL */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-7xl px-6 md:px-16">
        <div className={`p-2.5 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center justify-between transition-all ${isDark ? 'bg-black/60 border-white/10 shadow-yellow-500/5' : 'bg-white/80 border-black/10 shadow-amber-500/10'}`}>
          <div className="flex items-center gap-10 pl-4">
            <div className={`w-9 h-9 rounded-xl ${isDark ? 'bg-yellow-500 text-black' : 'bg-amber-600 text-white'} flex items-center justify-center font-black text-sm shadow-lg`}>G</div>
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 ${isDark ? 'text-slate-400 hover:text-yellow-500' : 'text-slate-500 hover:text-amber-600'}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button 
                onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-black/5 text-slate-900 hover:bg-slate-200'}`}
              >
                <User size={14} className={isDark ? 'text-yellow-500' : 'text-amber-600'} />
                <span>Client_View</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isModeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isModeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute top-full right-0 mt-3 w-56 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-2xl ${isDark ? 'bg-black/90 border-white/10 shadow-yellow-500/10' : 'bg-white/90 border-black/10 shadow-amber-500/10'}`}
                  >
                    <div className="p-2 space-y-1">
                      <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${isDark ? 'bg-yellow-500/10 text-yellow-500' : 'bg-amber-500/10 text-amber-600'}`}>
                        <div className="flex items-center gap-3">
                          <User size={16} />
                          <span className="text-[11px] font-black uppercase tracking-widest">Client_Mode</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </button>

                      <button 
                        onClick={() => navigate('/developer')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group ${isDark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                      >
                        <Terminal size={16} className="group-hover:text-yellow-500 transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Developer_OS</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-black/40 border-white/10 text-yellow-500 hover:bg-yellow-500/10' : 'bg-white border-black/10 text-amber-600 hover:bg-amber-100'}`}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MODULE_01: HERO_CORE */}
      <section className="relative min-h-screen flex items-center pt-40 pb-20 px-6 md:px-16 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-left">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border ${isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-600'} text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md`}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Available for Hire • Open to Projects
            </div>

            <div className="space-y-4">
               <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} uppercase`}>
                 Hi, I'm <br />
                 <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 via-purple-500 to-amber-500' : 'from-cyan-600 via-purple-600 to-amber-600'}`}>
                   Gemachis
                 </span>
               </h1>
               
               <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4">
                  <div className="flex items-center gap-4 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 group-hover:bg-cyan-500/10 text-cyan-500' : 'bg-slate-100 group-hover:bg-cyan-500/10 text-cyan-600'}`}>
                      <Terminal size={24} />
                    </div>
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Specialization</div>
                      <div className={`text-lg font-normal ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Information Science Specialist</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 group-hover:bg-purple-500/10 text-purple-500' : 'bg-slate-100 group-hover:bg-purple-500/10 text-purple-600'}`}>
                      <Cpu size={24} />
                    </div>
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Tech Stack</div>
                      <div className={`text-lg font-normal ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>React, Node & AI Architecture</div>
                    </div>
                  </div>
               </div>
            </div>

            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Engineering scalable AI systems and full-stack architectures focused on solving operational friction with a precision-driven digital ecosystem approach.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button className={`px-10 py-5 rounded-2xl ${isDark ? 'bg-cyan-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-cyan-600 text-white hover:shadow-xl'} font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 relative group overflow-hidden`}>
                <span className="relative z-10">View My Projects</span>
                <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button onClick={() => navigate('/developer')} className={`px-10 py-5 rounded-2xl border ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-black/10 bg-slate-100 text-slate-900 hover:bg-slate-200'} font-black text-sm uppercase tracking-widest transition-all backdrop-blur-md`}>
                Open Developer OS
              </button>
            </div>
          </div>

          {/* RIGHT: PORTRAIT AREA (ELITE IDENTITY ANCHOR) */}
          <div className="relative group flex justify-center lg:justify-end">
             {/* BACKGROUND GLOW RINGS */}
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 4, repeat: Infinity }}
               className={`absolute inset-0 rounded-full blur-[80px] ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-500/10'}`} 
             />
             <motion.div 
               animate={{ scale: [1.1, 1.2, 1.1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 5, repeat: Infinity, delay: 1 }}
               className={`absolute inset-0 rounded-full blur-[100px] ${isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'}`} 
             />

             {/* PORTRAIT CONTAINER */}
             <div className={`relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border ${isDark ? 'border-white/10 bg-[#050816]/50' : 'border-black/5 bg-white/50'} backdrop-blur-2xl shadow-2xl group-hover:scale-[1.01] transition-all duration-700`}>
                {/* STATUS BADGE */}
                <div className="absolute top-8 right-8 z-20">
                   <div className={`px-4 py-2 rounded-xl backdrop-blur-xl border ${isDark ? 'bg-black/60 border-cyan-500/20 text-cyan-400' : 'bg-white/80 border-cyan-500/20 text-cyan-600'} text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      Operational
                   </div>
                </div>

                {/* SILHOUETTE PLACEHOLDER (HIGH-END) */}
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-500/10">
                   <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#050816] via-transparent to-transparent' : 'from-white via-transparent to-transparent'} z-10`} />
                   <div className="relative group text-center space-y-6">
                     <User size={160} className={`${isDark ? 'text-cyan-500/20' : 'text-slate-300'} transition-opacity duration-500`} />
                     <div className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-cyan-500/40' : 'text-slate-400'}`}>Identity_Seal</div>
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-[-60px] border border-dashed border-cyan-500/10 rounded-full"
                     />
                   </div>
                </div>

                {/* FLOATING TECH BADGES */}
                <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between">
                   {[Sparkles, Zap, Shield].map((Icon, i) => (
                     <motion.div 
                       key={i}
                       animate={{ y: [0, -10, 0] }}
                       transition={{ duration: 3 + i, repeat: Infinity }}
                       className={`w-12 h-12 rounded-xl flex items-center justify-center border backdrop-blur-xl ${isDark ? 'bg-white/5 border-white/10 text-cyan-400' : 'bg-white/80 border-black/5 text-cyan-600 shadow-lg'}`}
                     >
                       <Icon size={20} />
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* MODULE_01.5: ABOUT_MANIFESTO */}
      <section id="about" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]' : 'border-black/5 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className={`text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-[0.5em] font-mono`}>Chapter One</div>
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} uppercase leading-[1.1]`}>
                  The_ <br /><span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}>Engineering_ Manifesto</span>
                </h2>
              </div>
              <p className={`text-lg font-medium leading-relaxed italic border-l-2 ${isDark ? 'text-slate-500 border-cyan-500/20' : 'text-slate-600 border-cyan-500/30'} pl-6`}>
                "In the intersection of Information Science and Software Engineering, I find the logic to solve complex human problems."
              </p>
            </div>

            <div className="lg:col-span-7 space-y-12">
               <div className="space-y-6 text-left">
                 <p className={`text-xl leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                   As an Information Science specialist and Software Engineer, I focus on building <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>software with purpose</span>. 
                 </p>
                 <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                   My background shapes how I architect systems: focusing on structured data, scalable workflows, and intelligent automation. I bridge the gap between real human workflows and modern AI infrastructure.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE_02: SKILLS_MATRIX (NEURAL INTERFACE OVERHAUL) */}
      <section id="skills" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]' : 'border-black/5 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-left">
              <div className={`text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-[0.5em] font-mono mb-4`}>Chapter Two</div>
              <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>
                Technical_ <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}>Expertise</span>
              </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT: CATEGORY UPLINK (GLASS NODES) */}
            <div className="lg:col-span-4 space-y-4">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(i)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between group relative overflow-hidden ${
                    activeCategory === i 
                    ? (isDark ? 'bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/20' : 'bg-cyan-500/5 border-cyan-500/30 ring-1 ring-cyan-500/20 shadow-xl shadow-cyan-500/5')
                    : (isDark ? 'bg-white/[0.02] border-white/5 hover:border-white/20' : 'bg-white border-black/5 hover:border-black/10 shadow-sm')
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      activeCategory === i 
                      ? (isDark ? 'bg-cyan-500 text-black' : 'bg-cyan-600 text-white shadow-lg')
                      : (isDark ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-400')
                    }`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className={`text-sm font-black uppercase tracking-widest ${activeCategory === i ? (isDark ? 'text-white' : 'text-slate-900') : 'text-slate-500'}`}>{cat.title}</h3>
                      <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Active_Nodes: {cat.skills.length}</p>
                    </div>
                  </div>
                  {activeCategory === i && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" 
                    />
                  )}
                  <Sparkles size={16} className={`transition-all relative z-10 ${activeCategory === i ? (isDark ? 'text-cyan-500 opacity-100' : 'text-cyan-600 opacity-100') : 'opacity-0'}`} />
                </button>
              ))}
            </div>

            {/* RIGHT: DYNAMIC SKILL MATRIX (NEON NODES) */}
            <div className="lg:col-span-8">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeCategory}
                   initial={{ opacity: 0, x: 20, scale: 0.98 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, x: -20, scale: 0.98 }}
                   className={`p-10 rounded-[2.5rem] border h-full backdrop-blur-2xl ${isDark ? 'bg-white/[0.02] border-white/10 shadow-2xl' : 'bg-white border-black/5 shadow-2xl shadow-black/5'}`}
                 >
                    <div className="flex items-center gap-6 mb-12">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10 text-cyan-500' : 'bg-cyan-500/10 text-cyan-600'} shadow-inner border border-cyan-500/20`}>
                          {skillCategories[activeCategory].icon}
                       </div>
                       <div>
                          <h3 className={`text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{skillCategories[activeCategory].title}</h3>
                          <p className={`text-base font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{skillCategories[activeCategory].desc}</p>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                       {skillCategories[activeCategory].skills.map((skill, i) => (
                         <div key={i} className="space-y-4 group">
                            <div className="flex justify-between items-end">
                               <div className="space-y-1">
                                  <h4 className={`text-[13px] font-black uppercase tracking-widest ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{skill.name}</h4>
                                  <div className="flex items-center gap-2">
                                     <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-cyan-500 animate-pulse' : 'bg-cyan-600'}`} />
                                     <span className="text-[10px] font-bold text-slate-500 uppercase">Operational_Integrity</span>
                                  </div>
                               </div>
                               <span className={`text-sm font-black font-mono ${isDark ? 'text-cyan-500' : 'text-cyan-600'}`}>{skill.level}%</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                               <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: `${skill.level}%` }}
                                 transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                                 className={`h-full bg-gradient-to-r ${isDark ? 'from-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'from-cyan-600 to-purple-600'}`}
                               />
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* BOTTOM METRICS RIBBON */}
                    <div className={`mt-16 pt-10 border-t grid grid-cols-3 gap-8 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                       {[
                         { label: 'System_Nodes', val: '15+' },
                         { label: 'Logic_Stability', val: 'MAX' },
                         { label: 'Architecture', val: 'PRO' }
                       ].map(stat => (
                         <div key={stat.label} className="text-left group">
                            <div className={`text-2xl font-black transition-all group-hover:text-cyan-500 ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{stat.val}</div>
                            <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest font-mono">{stat.label}</div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE_03: ACADEMIC_TIMELINE */}
      <section id="education" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]' : 'border-black/5 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-20">
            <span className={isDark ? 'text-cyan-500' : 'text-cyan-600'}>03 //</span>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-widest font-mono`}>Academic_Timeline</h2>
          </div>

          <div className="space-y-12 relative">
             <div className={`absolute left-[31px] top-0 bottom-0 w-px ${isDark ? 'bg-white/5' : 'bg-black/5'} hidden md:block`} />
             {[
               { org: 'Haramaya University', role: 'BSc in Information Science', date: 'Present', desc: 'Specializing in database architecture, systems analysis, and information ethics.' },
               { org: 'ALX Africa', role: 'Software Engineering Specialization', date: '2023 - 2024', desc: 'Intensive focus on low-level systems, modern web, and full-stack development.' }
             ].map((edu, i) => (
               <div key={i} className="flex flex-col md:flex-row gap-8 relative z-10 text-left">
                  <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-black/5'} flex items-center justify-center shrink-0 hidden md:flex shadow-2xl`}>
                     <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-yellow-500 animate-pulse' : 'bg-amber-600 animate-pulse'}`} />
                  </div>
                  <div className={`flex-1 p-8 glass-card border ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02] bg-white/40'}`}>
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>{edu.role}</h3>
                        <span className={`px-3 py-1 ${isDark ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'} rounded border text-[10px] font-black font-mono`}>{edu.date}</span>
                     </div>
                     <p className={`${isDark ? 'text-yellow-500' : 'text-amber-600'} text-xs font-black uppercase tracking-widest mb-4 font-mono`}>{edu.org}</p>
                     <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* MODULE_04: PROJECT_THEATER (CINEMATIC STAGE OVERHAUL) */}
      <section id="projects" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]' : 'border-black/5 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-20 text-left">
             <div className={`text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-[0.5em] font-mono mb-4`}>Chapter Three</div>
             <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>
               Featured_ <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}>Architectures</span>
             </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-2 gap-20 items-center"
              >
                {/* LEFT: VISUAL STAGE */}
                <div className="space-y-12">
                  <div className={`relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl ${isDark ? 'bg-[#0a0c16]' : 'bg-slate-100'} group`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-transparent opacity-60 z-10" />
                    <div className="absolute top-8 left-8 z-20">
                      <span className={`px-4 py-2 rounded-xl backdrop-blur-xl border ${isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600'} text-[10px] font-black uppercase tracking-widest shadow-xl`}>
                        {projects[activeProject].status || 'DEPLOYED_STABLE'}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10rem] grayscale opacity-[0.03] transition-transform group-hover:scale-110 duration-1000">🚀</div>
                    
                    {/* PAGINATION OVERLAY */}
                    <div className="absolute top-8 right-8 z-20">
                       <div className={`px-3 py-1.5 rounded-lg backdrop-blur-xl border ${isDark ? 'bg-black/60 border-white/10 text-white/60' : 'bg-white/80 border-black/5 text-slate-500'} text-[10px] font-mono font-black`}>
                         {activeProject + 1} / {projects.length}
                       </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80 z-10" />
                  </div>

                  {/* NAV CONTROLS */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setActiveProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1))}
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400' : 'border-black/5 bg-slate-100 text-slate-900 hover:bg-white hover:shadow-xl'}`}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => setActiveProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0))}
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400' : 'border-black/5 bg-slate-100 text-slate-900 hover:bg-white hover:shadow-xl'}`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* RIGHT: PROJECT DETAILS (GLASS DASHBOARD) */}
                <div className="space-y-10">
                   <div className="space-y-4 text-left">
                      <h3 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{projects[activeProject].title}</h3>
                      <p className={`text-lg leading-relaxed font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{projects[activeProject].summary}</p>
                   </div>

                   <div className="flex flex-wrap gap-2">
                      {projects[activeProject].tech.map(t => (
                        <span key={t} className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest font-mono ${isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-slate-100 border-black/5 text-slate-600'}`}>{t}</span>
                      ))}
                   </div>

                   {/* KEY FEATURES (GLASS PANEL) */}
                   <div className={`p-8 rounded-3xl border backdrop-blur-2xl text-left ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-black/5'}`}>
                      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>System_Capabilities</h4>
                      <ul className="space-y-4">
                        {projects[activeProject].features.map((feat, idx) => (
                          <li key={idx} className="flex gap-4 group">
                             <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all ${isDark ? 'bg-cyan-500/50 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-cyan-500/50 group-hover:bg-cyan-600'}`} />
                             <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                <span className={`font-black uppercase tracking-tighter mr-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{feat.title} //</span>
                                {feat.desc}
                             </p>
                          </li>
                        ))}
                      </ul>
                   </div>

                   {/* BUSINESS IMPACT (NEW METRIC PANEL) */}
                   <div className={`p-6 rounded-2xl border border-dashed flex items-center gap-6 text-left ${isDark ? 'border-cyan-500/20 bg-cyan-500/5' : 'border-cyan-500/30 bg-cyan-500/5'}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-cyan-500 text-black' : 'bg-cyan-600 text-white'}`}>
                         <TrendingUp size={24} />
                      </div>
                      <div>
                         <div className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-cyan-500' : 'text-cyan-600'}`}>Business_Impact</div>
                         <div className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{projects[activeProject].impact}</div>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                      <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isDark ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-xl shadow-cyan-500/10' : 'bg-cyan-600 text-white hover:bg-cyan-500'}`}>
                         <ExternalLink size={18} /> View Live
                      </button>
                      <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl border font-black text-xs uppercase tracking-widest transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-black/5 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                         <GitBranch size={18} /> Source Code
                      </button>
                   </div>

                   {/* SPECTRAL PAGINATION */}
                   <div className="flex gap-4 pt-6">
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveProject(i)}
                          className={`h-1.5 rounded-full transition-all duration-700 ${activeProject === i ? (isDark ? 'w-16 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'w-16 bg-cyan-600') : (isDark ? 'w-4 bg-white/5 hover:bg-white/10' : 'w-4 bg-black/10 hover:bg-black/20')}`}
                        />
                      ))}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MODULE_05: ENGINEERING_WORKFLOW */}
      <section id="process" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]/50' : 'border-black/5 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 text-left">
              <div className="space-y-4">
                <div className={`text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-[0.5em] font-mono`}>Engineering_Workflow</div>
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} uppercase leading-tight`}>
                  Development_ <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}>Process</span>
                </h2>
                <p className={`text-lg max-w-lg font-medium leading-relaxed italic border-l-2 ${isDark ? 'text-slate-500 border-cyan-500/20' : 'text-slate-600 border-cyan-500/30'} pl-6`}>
                  "I build for performance, security, and the human beings who will actually use the system."
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Deep Discovery', desc: 'Mapping operational friction and business logic before coding.' },
                  { step: '02', title: 'Secure Architecture', desc: 'Designing the database schema and security protocols.' },
                  { step: '03', title: 'Iterative Sprints', desc: 'Production-ready coding with bi-weekly updates.' },
                  { step: '04', title: 'Deployment & Scale', desc: 'Launching on world-class infrastructure with 24/7 tracking.' }
                ].map((p, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className={`w-12 h-12 rounded-xl ${isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600'} border flex items-center justify-center font-mono font-black text-xs shrink-0 transition-all group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]`}>
                      {p.step}
                    </div>
                    <div>
                      <h3 className={`font-bold uppercase text-sm tracking-widest ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-cyan-500 transition-colors`}>{p.title}</h3>
                      <p className={`text-sm leading-relaxed mt-1 font-medium ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative text-left">
              <div className={`absolute -inset-10 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/5'} blur-[100px] rounded-full animate-pulse`} />
              <div className={`relative glass-card border p-10 space-y-10 rounded-[2.5rem] backdrop-blur-3xl ${isDark ? 'border-white/10 bg-[#050816]/80' : 'border-black/5 bg-white/80'} shadow-2xl`}>
                <div className="space-y-6">
                  <div className={`flex justify-between items-center text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-widest font-mono`}>
                    <span>Development_Metrics</span>
                    <span className="animate-pulse">STABLE // 100% COMPLETE</span>
                  </div>
                  <div className={`h-1 ${isDark ? 'bg-white/5' : 'bg-slate-100'} rounded-full overflow-hidden`}>
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                      className={`h-full w-1/3 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]`} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Avg Latency', value: '< 15ms' },
                    { label: 'Protocol', value: 'AES-256' },
                    { label: 'Security', value: 'JWT/RBAC' },
                    { label: 'Uptime', value: '99.9%' }
                  ].map(stat => (
                    <div key={stat.label} className={`p-4 border ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-slate-50'} rounded-2xl group hover:border-cyan-500/30 transition-all`}>
                      <div className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>{stat.value}</div>
                      <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE_06: CONNECT_CENTER */}
      <section id="contact" className={`relative py-32 px-6 md:px-16 z-10 border-t ${isDark ? 'border-white/5 bg-[#050816]' : 'border-black/5 bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`text-[10px] font-black ${isDark ? 'text-cyan-500' : 'text-cyan-600'} uppercase tracking-[0.5em] font-mono`}>Let's Connect</div>
                  <div className={`px-3 py-1 rounded-full border ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600'} text-[9px] font-black uppercase tracking-widest`}>ACTIVE</div>
                </div>
                <h2 className={`text-5xl md:text-6xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>
                  Let's_ Build Your <br /><span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-cyan-600 to-purple-600'}`}>Next_ Project</span> Together
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                 <a href="mailto:gemachistesfaye36@gmail.com" className={`px-10 py-5 rounded-2xl ${isDark ? 'bg-cyan-500 text-black' : 'bg-cyan-600 text-white'} font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/10`}>
                   Initialize Consultation
                 </a>
              </div>
            </div>

            <div className="space-y-12">
               <div className="grid gap-4">
                 {[
                   { label: 'GitHub', username: '@gemachistesfaye', link: 'https://github.com/gemachistesfaye', icon: <GitBranch size={20} /> },
                   { label: 'LinkedIn', username: 'gemachis-tesfaye', link: 'https://www.linkedin.com/in/gemachis-tesfaye-137196318', icon: <User size={20} /> },
                   { label: 'Telegram', username: '@urjiiko1', link: 'https://t.me/urjiiko1', icon: <Terminal size={20} /> },
                   { label: 'Email', username: 'gemachis@engineer.com', link: 'mailto:gemachistesfaye36@gmail.com', icon: <Mail size={20} /> }
                 ].map(social => (
                   <a 
                     key={social.label} 
                     href={social.link} 
                     target="_blank"
                     className={`group p-6 rounded-2xl border flex items-center justify-between transition-all ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30' : 'bg-slate-50 border-black/5 hover:border-cyan-600/30'}`}
                   >
                     <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-400'}`}>
                         {social.icon}
                       </div>
                       <div className="text-left">
                         <div className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>{social.label}</div>
                         <div className="text-sm text-slate-500 font-medium">{social.username}</div>
                       </div>
                     </div>
                     <ArrowUpRight size={20} className={`transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1`} />
                   </a>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`relative py-12 text-center z-10 ${isDark ? 'bg-[#050816] border-t border-white/5' : 'bg-slate-50 border-t border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 text-left">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/5 text-slate-900'}`}>GT</div>
              <div>
                 <div className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>Gemachis Tesfaye</div>
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Engineer • 2026</div>
              </div>
           </div>
           <div className={`px-6 py-3 rounded-full border ${isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-600'} text-[11px] font-black uppercase tracking-widest`}>
             🚀 System Availability: High
           </div>
        </div>
      </footer>
      
      <DevfolioAI mode="client" />
    </div>
  );
};

export default ClientMode;
