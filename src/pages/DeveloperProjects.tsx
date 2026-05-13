import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Server, Cpu, ExternalLink, GitBranch, Shield, Zap, Box, Network } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  architecture: string;
  stack: {
    frontend: string;
    backend: string;
    database: string;
    ai?: string;
  };
  metrics: {
    uptime: string;
    users: string;
    performance: string;
  };
  links: {
    demo: string;
    github: string;
  };
}

const projects: Project[] = [
  {
    id: "SYS-001",
    title: "Ethio-Brew Marketplace",
    role: "Full-Stack Engineer",
    description: "Enterprise-grade B2B e-commerce platform for Ethiopian coffee distributors. Features complex multi-vendor routing, automated payment gateways, and multilingual architecture.",
    architecture: "Microservices backend managing inventory state, with a highly responsive React frontend optimizing product discovery and cart operations.",
    stack: {
      frontend: "React, Redux, Tailwind",
      backend: "Node.js, Express, JWT",
      database: "MySQL Cluster",
      ai: "Gemini Product Recommendations"
    },
    metrics: { uptime: "99.9%", users: "5K+ Active", performance: "0.8s Load" },
    links: { demo: "#", github: "#" }
  },
  {
    id: "SYS-002",
    title: "Sheger Health Connect",
    role: "System Architect",
    description: "Comprehensive health-tech portal for hospital administration. Implements strict Role-Based Access Control (Admin, Doctor, Patient) for secure medical record handling.",
    architecture: "Monolithic Express backend enforcing HIPAA-inspired data encryption, serving a type-safe React client interface.",
    stack: {
      frontend: "React, TypeScript",
      backend: "Express.js, REST",
      database: "PostgreSQL",
    },
    metrics: { uptime: "99.99%", users: "Hospital Network", performance: "Secure Data" },
    links: { demo: "#", github: "#" }
  },
  {
    id: "SYS-003",
    title: "SmartHire-AI",
    role: "AI Integration Dev",
    description: "Intelligent recruitment pipeline that autonomously screens applicant resumes using NLP and administers custom technical quizzes.",
    architecture: "Python-heavy analytics backend communicating with a Next.js dashboard via highly optimized API endpoints.",
    stack: {
      frontend: "Next.js, Tailwind",
      backend: "Python, FastAPI",
      database: "PostgreSQL",
      ai: "OpenAI / Gemini"
    },
    metrics: { uptime: "98%", users: "HR Agencies", performance: "AI Parse: 2s" },
    links: { demo: "#", github: "#" }
  },
  {
    id: "SYS-004",
    title: "Ethiopian Events Portal",
    role: "Frontend Architect",
    description: "Cultural event discovery platform resolving the complex algorithmic challenge of synchronizing Ethiopian and Gregorian calendar dates interactively.",
    architecture: "Client-side heavy logic for dual-calendar calculations, utilizing a lightweight Node backend for event persistence.",
    stack: {
      frontend: "React, TS, Framer",
      backend: "Node.js",
      database: "MongoDB"
    },
    metrics: { uptime: "100%", users: "Public", performance: "Zero Lag UI" },
    links: { demo: "#", github: "#" }
  },
  {
    id: "SYS-005",
    title: "LaundryFlow SaaS",
    role: "Full-Stack Dev",
    description: "Campus laundry automation system with real-time tracking, digital wallet functionality, and automated worker assignment logic.",
    architecture: "Serverless architecture leveraging Supabase Edge Functions for rapid status updates and real-time client synchronization.",
    stack: {
      frontend: "React, Vite",
      backend: "Edge Functions",
      database: "Supabase DB",
      ai: "Support Chatbot"
    },
    metrics: { uptime: "99.5%", users: "Haramaya Campus", performance: "Real-time" },
    links: { demo: "#", github: "#" }
  },
  {
    id: "SYS-006",
    title: "Ecommerce Analytics Dashboard",
    role: "Data Analyst",
    description: "High-level Business Intelligence dashboard aggregating millions of rows of sales data to predict trends and optimize inventory.",
    architecture: "Data warehouse extraction from SQL servers, transformed via DAX, and visualized through Power BI.",
    stack: {
      frontend: "Power BI",
      backend: "DAX",
      database: "SQL Server",
      ai: "Predictive Analytics"
    },
    metrics: { uptime: "100%", users: "Executive Level", performance: "Batch Processing" },
    links: { demo: "#", github: "#" }
  }
];

const DeveloperProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <div className="space-y-12">
      <header>
        <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
          <Database size={12} /> System_Blueprints
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-white">Deployed Architectures</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Project Selector (Left) */}
        <div className="lg:col-span-4 space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border
                ${activeProject.id === project.id 
                  ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]' 
                  : 'bg-white/5 border-white/5 hover:border-white/20'}
              `}
            >
              <div className="text-[10px] font-mono text-primary mb-1">{project.id}</div>
              <div className="font-bold text-white tracking-tight">{project.title}</div>
            </div>
          ))}
        </div>

        {/* Project Viewer (Right) */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 min-h-[600px] flex flex-col border border-white/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-2">{activeProject.title}</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  <Shield size={12} /> {activeProject.role}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={activeProject.links.github} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all">
                  <GitBranch size={18} />
                </a>
                <a href={activeProject.links.demo} className="w-10 h-10 rounded-full bg-primary text-dark-900 flex items-center justify-center hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            <div className="space-y-8 flex-1">
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase mb-2">System Overview</div>
                <p className="text-text-secondary leading-relaxed">{activeProject.description}</p>
              </div>

              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase mb-2">Architecture Topology</div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/5 text-sm text-text-secondary leading-relaxed">
                  {activeProject.architecture}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-primary uppercase"><Terminal size={10} className="inline mr-1"/> Frontend</div>
                  <div className="text-xs font-bold text-white">{activeProject.stack.frontend}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-primary uppercase"><Server size={10} className="inline mr-1"/> Backend</div>
                  <div className="text-xs font-bold text-white">{activeProject.stack.backend}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-primary uppercase"><Database size={10} className="inline mr-1"/> Database</div>
                  <div className="text-xs font-bold text-white">{activeProject.stack.database}</div>
                </div>
                {activeProject.stack.ai && (
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-purple-400 uppercase"><Cpu size={10} className="inline mr-1"/> AI Core</div>
                    <div className="text-xs font-bold text-white">{activeProject.stack.ai}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
               <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Uptime SLA</div>
                  <div className="text-lg font-black text-white">{activeProject.metrics.uptime}</div>
               </div>
               <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Active Nodes</div>
                  <div className="text-lg font-black text-white">{activeProject.metrics.users}</div>
               </div>
               <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase mb-1">Latency</div>
                  <div className="text-lg font-black text-primary flex items-center gap-2">
                    <Zap size={14} /> {activeProject.metrics.performance}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default DeveloperProjects;
