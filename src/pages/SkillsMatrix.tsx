import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldAlert, Activity } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const overallData = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Database', A: 90, fullMark: 100 },
  { subject: 'AI/LLMs', A: 88, fullMark: 100 },
  { subject: 'DevOps', A: 75, fullMark: 100 },
  { subject: 'Analytics', A: 85, fullMark: 100 },
];

const SkillsMatrix: React.FC = () => {
  return (
    <div className="space-y-12">
      <header>
        <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
          <Cpu size={12} /> Tech_Matrix: v4.2.0
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">System Architecture Profile</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Radar Chart */}
        <div className="glass-card p-8 flex flex-col h-[400px]">
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
            <Activity size={16} className="text-primary" />
            Core Competency Radar
          </h3>
          <div className="flex-1 w-full h-full text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={overallData}>
                <PolarGrid stroke="rgba(56,189,248,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(5,8,22,0.9)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8' }} />
                <Radar name="Gemachis" dataKey="A" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { category: "Frontend Engine", tech: "React, TS, Tailwind, Framer" },
            { category: "Backend Core", tech: "Node, Express, Python" },
            { category: "Data Storage", tech: "PostgreSQL, MySQL, Supabase" },
            { category: "Intelligence AI", tech: "Gemini AI, Chatbots, ML Logic" },
            { category: "Business Analytics", tech: "Power BI, DAX, Visualizations" },
            { category: "Cloud & Ops", tech: "Vercel, Render, JWT, Git" }
          ].map((item, i) => (
            <motion.div 
              key={item.category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-4 rounded-xl border border-white/5 hover:border-primary/40 transition-colors group"
            >
              <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center justify-between">
                {item.category}
                <ShieldAlert size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs text-white font-mono leading-relaxed">{item.tech}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
