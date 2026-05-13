import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Command,
  ChevronRight
} from 'lucide-react';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Gemachis AI Core initialized. How can I assist with your technical inquiry?' }
  ]);

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-96 glass-panel rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-primary/40"
          >
            {/* AI Header */}
            <div className="p-6 border-b border-white/5 bg-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary border border-primary/50 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                  <Cpu size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Sys_Assistant</div>
                  <div className="text-sm font-bold text-white">Gemachis AI</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-96 overflow-y-auto p-6 space-y-6 no-scrollbar bg-dark-900/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] p-4 rounded-2xl text-[11px] leading-relaxed font-medium
                    ${m.role === 'user' ? 'bg-primary text-dark-900 font-bold' : 'bg-white/5 text-text-secondary border border-white/10'}
                  `}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="flex items-center gap-3 glass-panel rounded-2xl px-4 py-1.5 border-white/10">
                <Terminal size={14} className="text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Ask about systems, stack, or projects..."
                  className="bg-transparent border-none outline-none text-[10px] text-white w-full py-2 font-mono"
                />
                <button className="text-primary hover:scale-110 transition-transform">
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-3 flex justify-center gap-4 text-[8px] font-black text-text-muted uppercase tracking-widest">
                <span>INTENT: ANALYZE</span>
                <span className="w-1 h-1 bg-white/20 rounded-full my-auto" />
                <span>MODEL: GPT-4O</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-dark-900 shadow-[0_10px_30px_rgba(56,189,248,0.4)] border border-primary/20 relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-dark-900 rounded-full animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
