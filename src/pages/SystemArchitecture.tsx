import React from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Database, 
  Server, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Cloud,
  Zap,
  Activity
} from 'lucide-react';

const Node = ({ icon, label, sub, type = 'default' }: any) => (
  <div className={`
    glass-panel p-6 rounded-2xl border flex flex-col items-center gap-4 text-center min-w-[200px] relative
    ${type === 'primary' ? 'border-primary/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'border-white/10'}
  `}>
    <div className={`p-4 rounded-xl bg-white/5 ${type === 'primary' ? 'text-primary' : 'text-white'}`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{label}</div>
      <div className="text-[8px] font-bold text-text-muted uppercase tracking-tighter">{sub}</div>
    </div>
  </div>
);

const Connection = ({ vertical = false, length = 'h-12' }: any) => (
  <div className={`flex items-center justify-center ${vertical ? `flex-col ${length}` : `h-[1px] w-12`} bg-white/10 relative`}>
     <div className={`absolute ${vertical ? 'w-2 h-2 top-0' : 'w-2 h-2 left-0'} rounded-full bg-primary/20 blur-[2px]`} />
  </div>
);

const SystemArchitecture: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <header>
        <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
          <Network size={12} /> System_Topology: Optimized
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-white">Network Architecture</h2>
      </header>

      <div className="glass-card p-12 overflow-x-auto no-scrollbar">
        <div className="min-w-[1000px] flex flex-col items-center">
          
          {/* External Layer */}
          <div className="flex gap-16 items-center">
            <Node icon={<Globe size={24} />} label="Traffic_Gateway" sub="Global Content Delivery" />
            <div className="w-12 h-[1px] bg-white/10" />
            <Node icon={<ShieldCheck size={24} />} label="Firewall_RBAC" sub="System Security Layer" type="primary" />
          </div>

          <div className="h-12 w-[1px] bg-white/10" />

          {/* Logic Layer */}
          <div className="flex gap-12 items-center">
             <div className="flex flex-col items-center">
                <Node icon={<Server size={24} />} label="Core_Engine_API" sub="Express.js Instance" />
                <div className="h-12 w-[1px] bg-white/10" />
                <Node icon={<Cpu size={24} />} label="AI_Neural_Node" sub="Inference System" />
             </div>
             
             <div className="w-24 h-[1px] bg-white/10" />

             <div className="flex flex-col items-center gap-12">
                <div className="px-6 py-3 glass-panel rounded-full text-[10px] font-black text-primary border-primary/20 uppercase tracking-[0.3em]">
                   Event_Bus_Synchronizer
                </div>
                <div className="flex gap-12">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-1 h-8 bg-white/10" />
                      <Node icon={<Database size={24} />} label="Primary_DB" sub="PostgreSQL / Supabase" />
                   </div>
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-1 h-8 bg-white/10" />
                      <Node icon={<Activity size={24} />} label="Cache_Node" sub="Redis Layer" />
                   </div>
                </div>
             </div>
          </div>

          <div className="h-12 w-[1px] bg-white/10" />

          {/* Infrastructure Layer */}
          <div className="flex gap-12">
             <Node icon={<Cloud size={24} />} label="Storage_S3" sub="Asset Persistence" />
             <Node icon={<Lock size={24} />} label="Auth_Node" sub="JWT Verification" />
             <Node icon={<Zap size={24} />} label="Worker_Nodes" sub="Asynchronous Jobs" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass-card p-8 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol_Stack</h3>
            <div className="space-y-3 font-mono text-[10px]">
               <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-text-muted">TRANSPORT:</span> <span className="text-primary">HTTPS / WSS</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-text-muted">API_TYPE:</span> <span className="text-primary">RESTFUL_JSON</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-text-muted">AUTH_TYPE:</span> <span className="text-primary">BEARER_JWT</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-text-muted">VERSION:</span> <span className="text-primary">SYSTEM_V4</span></div>
            </div>
         </div>
         <div className="md:col-span-2 glass-card p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">System_Scalability_Matrix</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: "Concurrent_Req", value: "10k+", color: "primary" },
                 { label: "DB_Queries", value: "250ms", color: "green" },
                 { label: "Sync_Latency", value: "12ms", color: "blue" },
                 { label: "AI_Token_Sec", value: "1.2k", color: "purple" }
               ].map(stat => (
                 <div key={stat.label} className="text-center">
                    <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-[8px] font-bold text-text-muted uppercase tracking-[0.2em]">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
