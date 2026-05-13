import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, Users, Globe, Terminal, ShieldAlert, Cpu } from 'lucide-react';

const trafficData = [
  { time: '00:00', visitors: 120, sessions: 80 },
  { time: '04:00', visitors: 45, sessions: 30 },
  { time: '08:00', visitors: 310, sessions: 250 },
  { time: '12:00', visitors: 450, sessions: 380 },
  { time: '16:00', visitors: 390, sessions: 310 },
  { time: '20:00', visitors: 280, sessions: 210 },
  { time: '24:00', visitors: 150, sessions: 110 },
];

const regionData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Africa (ET)', value: 85 },
  { name: 'Asia', value: 20 },
];

const SystemAnalytics: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      <header>
        <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
          <Activity size={12} className="animate-pulse" /> Telemetry_Active
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">System Analytics</h2>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Unique Visitors", value: "14,204", icon: <Users size={16} />, color: "text-blue-400" },
          { title: "Recruiter Sessions", value: "342", icon: <ShieldAlert size={16} />, color: "text-green-400" },
          { title: "AI Core Interactions", value: "8,192", icon: <Cpu size={16} />, color: "text-purple-400" },
          { title: "Active Deployments", value: "7 Nodes", icon: <Terminal size={16} />, color: "text-primary" }
        ].map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors`} />
            <div className={`text-[10px] font-mono mb-4 flex items-center gap-2 ${stat.color} uppercase tracking-widest`}>
              {stat.icon} {stat.title}
            </div>
            <div className="text-3xl font-black text-white tracking-tighter">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card p-6 border-white/5"
        >
          <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6 flex items-center justify-between">
            <span>Global Traffic Density (24H)</span>
            <span className="text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live_Sync
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#ffffff10', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ fontSize: '10px', color: '#888' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="sessions" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 border-white/5"
        >
          <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <Globe size={12} /> Geographic Uplink
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" stroke="#ffffff40" fontSize={10} hide />
                <YAxis dataKey="name" type="category" stroke="#ffffff80" fontSize={10} axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0B1120', borderColor: '#ffffff10', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name.includes('ET') ? '#4ade80' : '#38bdf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
