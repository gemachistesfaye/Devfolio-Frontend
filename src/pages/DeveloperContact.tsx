import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, Terminal, ShieldAlert, Wifi, Lock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DeveloperContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${API_URL}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header>
        <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
          <Wifi size={12} className="animate-pulse" /> Secure_Comms_Link
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Transmit Packet</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Connection Status Panel */}
        <div className="md:col-span-2 space-y-4">
           <div className="glass-card p-6 border-white/5 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                   <Lock size={18} />
                 </div>
                 <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-tighter">Connection Secure</h3>
                   <div className="text-[10px] font-mono text-primary flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> E2E Encrypted
                   </div>
                 </div>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                 <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-text-muted">Target_Node:</span>
                    <span className="text-white">Gemachis.T</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-text-muted">Protocol:</span>
                    <span className="text-primary">HTTPS / WSS</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-text-muted">Status:</span>
                    <span className="text-green-400">AWAITING_INPUT</span>
                 </div>
              </div>
           </div>

           <div className="glass-panel p-4 border-orange-500/20 bg-orange-500/5 rounded-xl flex gap-3 items-start">
             <ShieldAlert size={16} className="text-orange-400 shrink-0 mt-0.5" />
             <p className="text-[10px] text-orange-400/80 font-mono leading-relaxed">
               All transmissions are logged. Unauthorized probing of this system will be reported to system administrators.
             </p>
           </div>
        </div>

        {/* Terminal Form */}
        <div className="md:col-span-3">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted uppercase mb-8 pb-4 border-b border-white/5">
               <Terminal size={12} /> input_stream_open
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                    <span className="text-text-muted">&gt;</span> identity.name
                  </label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-dark-900 border border-white/10 rounded-lg py-2.5 px-4 text-xs font-mono text-white focus:border-primary focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] focus:outline-none transition-all placeholder:text-white/20"
                    placeholder='"John Doe"'
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                    <span className="text-text-muted">&gt;</span> identity.email
                  </label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-dark-900 border border-white/10 rounded-lg py-2.5 px-4 text-xs font-mono text-white focus:border-primary focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] focus:outline-none transition-all placeholder:text-white/20"
                    placeholder='"john@domain.com"'
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="text-text-muted">&gt;</span> payload.organization (optional)
                </label>
                <input 
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg py-2.5 px-4 text-xs font-mono text-white focus:border-primary focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] focus:outline-none transition-all placeholder:text-white/20"
                  placeholder='"Enterprise Corp"'
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="text-text-muted">&gt;</span> payload.data
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-white focus:border-primary focus:shadow-[0_0_10px_rgba(56,189,248,0.2)] focus:outline-none transition-all resize-none placeholder:text-white/20"
                  placeholder='// Enter transmission contents here...'
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="text-[10px] font-mono">
                  {status === 'loading' && <span className="text-yellow-400 animate-pulse">TRANSMITTING...</span>}
                  {status === 'success' && <span className="text-green-400">ACKNOWLEDGED. PACKET RECEIVED.</span>}
                  {status === 'error' && <span className="text-red-400">TRANSMISSION FAILED. RETRY.</span>}
                  {status === 'idle' && <span className="text-text-muted">SYSTEM READY</span>}
                </div>
                
                <button 
                  disabled={status === 'loading'}
                  className="bg-primary hover:bg-white text-dark-900 font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] disabled:opacity-50"
                >
                  {status === 'loading' ? 'EXEC...' : 'EXECUTE'} <Send size={14} />
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperContact;
