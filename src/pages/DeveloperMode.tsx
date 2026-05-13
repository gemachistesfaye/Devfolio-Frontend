import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, Shield, Cpu, Code2, GitBranch, Globe, Database, Activity, Server, Cpu as CpuIcon, Sparkles, Zap, Mail, Terminal, ArrowUpRight, User } from 'lucide-react';
import { DevfolioAI } from '../components/DevfolioAI';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" />;
};

const DeveloperMode: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<any[]>([
    { type: 'system', content: `
  ____ _____ __  __    _    ____ _   _ ___ ____  
 / ___| ____|  \\/  |  / \\  / ___| | | |_ _/ ___| 
| |  _|  _| | |\\/| | / _ \\| |   | |_| || |\\___ \\ 
| |_| | |___| |  | |/ ___ \\ |___|  _  || | ___) |
 \\____|_____|_|  |_/_/   \\_\\____|_| |_|___|____/ 
    ` },
    { type: 'info', content: 'Welcome to Gemachis Tesfaye\'s Professional Terminal v5.0.0' },
    { type: 'info', content: 'Full-Stack Engineer | Information Science Specialist | AI Architect' },
    { type: 'badge', content: '💼 Available for Freelance & Strategic Partnerships' },
    { type: 'system', content: 'Type "help" to explore engineered systems and protocols.' },
    { type: 'system', content: 'Press Ctrl+K for Global Command Palette.' },
    { type: 'system', content: '---' }
  ]);
  const [isBooting, setIsBooting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const projectData: { [key: string]: any } = {
    'ethio-brew': { title: 'Ethio-Brew', desc: 'Coffee SaaS Ecosystem', stack: 'React, Node, MySQL', impact: 'Digitized 50+ vendors' },
    'health-connect': { title: 'Sheger Health', desc: 'Clinical Data Layer', stack: 'React, Node, GPT-4', impact: 'Reduced triage latency by 65%' },
    'laundryflow': { title: 'LaundryFlow', desc: 'Process Automation', stack: 'Vite, JWT, MySQL', impact: 'Automated 500+ daily orders' },
    'heritage': { title: 'Heritage Portal', desc: 'Cultural Intelligence', stack: 'TypeScript, Gemini', impact: 'Synced dual-calendar logic' }
  };

  const commands: { [key: string]: (args?: string[]) => any } = {
    help: () => ({
      type: 'system',
      content: 'AVAILABLE PROTOCOLS:\n  - ls           : List engineered systems\n  - view <id>    : Detailed architecture audit\n  - about        : Identity and Bio\n  - skills       : Technical Matrix\n  - socials      : Network Uplinks\n  - history      : Command log\n  - sudo         : Elevate privileges\n  - clear        : Reset interface\n  - exit         : Return to Client Mode'
    }),
    ls: () => ({
      type: 'info',
      content: `DIRECTORY: /systems/architectures\n\n${Object.keys(projectData).map((id, i) => `[0${i + 1}] ${id.toUpperCase().padEnd(20)} // STATUS: OPERATIONAL`).join('\n')}\n\nType "view <project-id>" for technical teardown.`
    }),
    projects: () => commands.ls(),
    view: (args) => {
      if (!args || args.length === 0) return { type: 'error', content: 'Usage: view <project-id>. Try "ls" to see available systems.' };
      const id = args[0].toLowerCase();
      const p = projectData[id];
      if (!p) return { type: 'error', content: `System not found: ${id}` };
      return {
        type: 'info',
        content: `[ TEARDOWN: ${p.title} ]\n\nSUMMARY: ${p.desc}\nSTACK  : ${p.stack}\nIMPACT : ${p.impact}\nSTATUS : OPERATIONAL // VERIFIED`
      };
    },
    about: () => ({
      type: 'info',
      content: `[ IDENTITY ]\nGemachis Tesfaye\nSystem Architect & AI-First Developer\nHaramaya University / Information Science\n\n[ MISSION ]\nEngineering scalable digital infrastructure for complex operational challenges.`
    }),
    skills: () => ({
      type: 'info',
      content: `ENGINEERING: System Design, REST APIs, Security\nSTACK: React, Node.js, TypeScript, SQL, Gemini AI`
    }),
    socials: () => ({
      type: 'info',
      content: `UPLINKS:\n- GitHub   : https://github.com/gemachistesfaye\n- LinkedIn : https://www.linkedin.com/in/gemachis-tesfaye-137196318\n- Telegram : @urjiiko1`
    }),
    history: () => ({
      type: 'system',
      content: `COMMAND_LOG:\n${history.map((h, i) => `${i + 1} ${h}`).join('\n')}`
    }),
    sudo: () => {
      setTimeout(() => setOutput(prev => [...prev, { type: 'system', content: 'AUTHENTICATING...' }]), 500);
      setTimeout(() => setOutput(prev => [...prev, { type: 'system', content: 'PRIVILEGES ELEVATED: WELCOME ROOT.' }]), 1500);
      return { type: 'system', content: 'REQUESTING ELEVATION...' };
    },
    exit: () => {
      navigate('/client');
      return { type: 'system', content: 'TERMINATING SESSION...' };
    },
    ai: (args: string[]) => {
      if (!args.length) return { 
        type: 'info', 
        content: "[SYS_INTEL] System Architect AI online.\n\nQuery protocols: 'ai architecture', 'ai stack', 'ai <project-id>'\n\nType 'ai' followed by your query for heuristic analysis." 
      };
      const query = args.join(' ').toLowerCase();
      
      let response = "[SYS_INTEL] Processing heuristic analysis... Connection to Gemini-Pro stable.\n\nQuery not found in primary heuristics. Try analyzing system architecture or specific project prototypes.";
      
      if (query.includes('architecture')) response = "[AI_SYSTEM_CORE]\nArchitecture: Decoupled Edge-API-Core pattern.\n- Edge: Next.js SSR/ISR\n- Gateway: Node.js / JWT Auth\n- Persistent Layer: PostgreSQL / Redis Cache\n- Heuristics: Federated AI nodes.";
      else if (query.includes('stack')) response = "[AI_SYSTEM_CORE]\nStack Matrix:\n- Logic: TypeScript / React / Node.js\n- Data: SQL / NoSQL / Vector DB\n- Intelligence: Gemini Pro / GPT-4o\n- Automation: Python / CI/CD Pipelines";
      else if (query.includes('ethio') || query.includes('brew')) response = "[PROJECT_INTEL] Ethio-Brew Analysis:\n- Complexity: HIGH\n- Core: Multilingual Coffee Sommelier Engine\n- Business Logic: Multi-vendor marketplace with AI recommendations\n- Security: Production-grade RBAC/JWT encryption.";
      
      return { type: 'info', content: response };
    },
    status: () => ({
      type: 'system',
      content: `SYSTEM HEALTH: ONLINE // Latency: 42ms // Integrity: VERIFIED`
    }),
    clear: () => {
      setOutput([]);
      return null;
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setHistory(prev => [...prev, input]);
    setOutput(prev => [...prev, { type: 'user', content: input }]);

    if (commands[cmd]) {
      const response = commands[cmd](args);
      if (response) setOutput(prev => [...prev, response]);
    } else {
      setOutput(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type "help" for protocols.` }]);
    }
    setInput('');
  };

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-8">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold tracking-widest text-[#00ff00] uppercase mb-4">Initializing OS...</h1>
          <div className="w-full bg-[#00ff00]/10 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
              className="h-full bg-[#00ff00]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#00ff00] font-mono selection:bg-[#00ff00]/20 selection:text-[#00ff00] relative">
      <MatrixBackground />
      
      <div className="fixed top-6 right-8 z-[100]">
        <button 
          onClick={() => navigate('/client')}
          className="px-6 py-2 rounded-lg border border-[#00ff00]/20 text-[10px] font-black uppercase tracking-widest hover:bg-[#00ff00]/10 transition-all text-[#00ff00] backdrop-blur-md bg-black/40"
        >
          {`</> Client Mode`}
        </button>
      </div>

      <div className="pt-32 pb-12 px-8 w-full relative z-10 flex flex-col items-center">
        <div ref={scrollRef} className="w-full max-w-4xl space-y-6 overflow-y-auto no-scrollbar max-h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center text-center mb-16">
            {output.slice(0, 7).map((line, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                {line.type === 'system' && i === 0 && (
                  <div className="whitespace-pre font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ff00] via-[#00f2ff] to-[#00ff00] text-[12px] leading-none mb-10 drop-shadow-[0_0_15px_rgba(0,255,0,0.3)] animate-pulse">
                    {line.content}
                  </div>
                )}
                {line.type === 'info' && i === 1 && (
                  <div className="text-white font-black text-2xl uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {line.content}
                  </div>
                )}
                {line.type === 'info' && i === 2 && (
                  <div className="flex gap-4 items-center text-sm font-bold uppercase tracking-widest mb-6">
                    <span className="text-cyan-400">Full-Stack Engineer</span>
                    <span className="text-white/20">|</span>
                    <span className="text-purple-400">Information Science</span>
                    <span className="text-white/20">|</span>
                    <span className="text-yellow-500">AI Architect</span>
                  </div>
                )}
                {line.type === 'badge' && i === 3 && (
                  <div className="inline-block px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400 mt-2 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    {line.content}
                  </div>
                )}
                {line.type === 'system' && i > 3 && (
                  <div className={`text-xs font-black uppercase tracking-[0.3em] mt-3 ${i === 6 ? 'text-[#00ff00] opacity-40 animate-pulse' : 'text-white/60'}`}>
                    {line.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-[#00ff00]/5 pt-8">
            {output.slice(7).map((line, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                {line.type === 'user' && (
                  <div className="flex gap-3 items-center">
                    <span className="text-white opacity-40 text-xs">gemachis@devfolio:~$</span>
                    <span className="font-bold text-white">{line.content}</span>
                  </div>
                )}
                {line.type === 'system' && (
                  <div className="whitespace-pre-wrap flex gap-3 text-sm">
                    <span className="opacity-40 text-[10px] mt-1">[SYS]</span>
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === 'info' && (
                  <div className="text-white/80 whitespace-pre-wrap pl-10 border-l border-[#00ff00]/10 py-1 text-sm">
                    {line.content}
                  </div>
                )}
                {line.type === 'error' && (
                  <div className="text-rose-500 font-bold flex gap-3 text-sm">
                    <span className="opacity-40 text-[10px] mt-1">[ERR]</span>
                    <span>{line.content}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleCommand} className="flex gap-3 items-center mt-6 border-l-2 border-[#00ff00] pl-4 py-1 bg-[#00ff00]/5">
            <span className="text-white opacity-40 text-xs">gemachis@devfolio:~$</span>
            <input 
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white caret-[#00ff00] font-bold text-sm"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>

      <DevfolioAI mode="developer" />
    </div>
  );
};

export default DeveloperMode;
