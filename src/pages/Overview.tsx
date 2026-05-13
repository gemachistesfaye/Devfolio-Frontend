import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Globe, 
  Database, 
  Shield, 
  Server,
  Terminal,
  Activity,
  Box
} from 'lucide-react';

const MetricCard = ({ icon, label, value, subtext, color }: any) => (
  <div className="glass-card p-6 flex flex-col group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover:bg-${color}-500/10 transition-all`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${color}-400 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">{label}</div>
    </div>
    <div className="text-3xl font-black text-white tracking-tighter mb-1">{value}</div>
    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{subtext}</div>
  </div>
);

const Overview: React.FC = () => {
  const metrics = [
    { icon: <Zap size={20} />, label: "Sys_Performance", value: "98.4%", subtext: "Response Score", color: "blue" },
    { icon: <Cpu size={20} />, label: "AI_Processing", value: "1.2ms", subtext: "Inference Time", color: "purple" },
    { icon: <Database size={20} />, label: "Data_Integrity", value: "100%", subtext: "Sync Reliability", color: "green" },
    { icon: <Box size={20} />, label: "Active_Modules", value: "12", subtext: "Deployed Units", color: "orange" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
            <Activity size={12} /> System_Health: Operational
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white">Infrastructure Overview</h2>
        </div>
        <div className="flex gap-3">
           <button className="btn-outline text-[10px] py-2 px-4 uppercase tracking-widest">Generate Report</button>
           <button className="btn-primary text-[10px] py-2 px-4 uppercase tracking-widest">Manual Override</button>
        </div>
      </header>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MetricCard {...m} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tech Proficiency Matrix */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase tracking-tighter">Technical_Matrix</h3>
            <Terminal size={16} className="text-text-muted" />
          </div>
          <div className="space-y-6">
            {[
              { label: "Frontend Engineering (React / TS / Framer)", value: 95 },
              { label: "AI & Neural Systems (Gemini / LLMs)", value: 88 },
              { label: "Backend & Data Logic (Node / SQL)", value: 92 },
              { label: "Data Analytics & BI (Power BI / Viz)", value: 85 },
            ].map((skill, i) => (
              <div key={skill.label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-text-muted">{skill.label}</span>
                  <span className="text-primary">{skill.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-primary" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Deployment Timeline (Mini) */}
        <div className="glass-card p-8">
           <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Recent_Deploys</h3>
           <div className="space-y-6">
              {[
                { module: "Auth_V2", status: "Success", time: "2h ago" },
                { module: "AI_Chat_Core", status: "Success", time: "5h ago" },
                { module: "DB_Indexer", status: "Running", time: "Now" },
                { module: "Mesh_UI", status: "Success", time: "1d ago" },
              ].map((deploy, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <div className={`w-2 h-2 rounded-full ${deploy.status === 'Running' ? 'bg-primary animate-ping' : 'bg-green-500'}`} />
                   <div className="flex-1">
                      <div className="text-[11px] font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">{deploy.module}</div>
                      <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{deploy.time}</div>
                   </div>
                   <div className="text-[9px] font-mono text-text-muted">{deploy.status.toUpperCase()}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
