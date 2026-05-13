import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Sparkles, User, Bot, Loader2, ChevronDown, Cpu } from 'lucide-react';

interface DevfolioAIProps {
  mode: 'developer' | 'client';
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

// Pre-configured simulated AI intelligence for demonstration
const aiKnowledgeBase = {
  developer: {
    greeting: "[SYS_INIT] System Architect AI active. Deep-dive into architecture, protocols, or stack metrics?",
    suggestions: ["Explain System Architecture", "View Tech Ecosystem", "Recommend best project"],
    responses: {
      "architecture": "[AI_SYSTEM]\nMy architecture follows a decoupled Edge-API-Core pattern. Edge layer uses Next.js for SSR/ISR. The API Gateway (Node.js) handles JWT validation and rate limiting. Data is persisted in a relational PostgreSQL schema with Redis for caching high-frequency queries.",
      "stack": "[AI_SYSTEM]\nCore Ecosystem: React/TypeScript for frontends. Node.js, Flask, and PHP for APIs. PostgreSQL, MySQL, and MongoDB for data. Analytics via Power BI. AI via Gemini-Pro. Engineering languages include Python, JavaScript, and C++.",
      "project": "[AI_SYSTEM]\nBased on complexity, I recommend 'Ethio-Brew'. It demonstrates a complete SaaS cycle: Multilingual support, AI recommendation engine, multi-vendor management, and production-grade security protocols."
    }
  },
  client: {
    greeting: "Hello. I'm Gemachis's AI Strategist. I can explain our technical approach and how it translates to business value.",
    suggestions: ["Explain Ethio-Brew", "How do you handle scaling?", "Let's discuss a project"],
    responses: {
      "ethio-brew": "Ethio-Brew is an AI-powered SaaS marketplace. We solved the 'vendor exposure' problem by building an intelligent recommendation engine. Result: 40% improvement in product discovery and a seamless multi-vendor onboarding process.",
      "scaling": "We use production-focused architectures including horizontal scaling on the edge and optimized database indexing. Every system is built to handle growth from 10 to 10,000+ users without performance degradation.",
      "project": "I can help scope your MVP. We focus on 'Engineering over coding'—ensuring your product is not just pretty, but structurally sound and ready for real-world traffic."
    }
  }
};

export const DevfolioAI: React.FC<DevfolioAIProps> = ({ mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const kb = aiKnowledgeBase[mode];

  // Initialize greeting on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: '1', role: 'ai', content: kb.greeting }]);
    }
  }, [isOpen, mode, messages.length, kb.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay and AI processing
    setTimeout(() => {
      let aiResponse = "I'm currently running in demo mode. In production, I connect to the Gemini API to provide dynamic answers!";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('ethio')) aiResponse = kb.responses['ethio-brew'] || kb.responses['ethiobrew'];
      else if (lowerText.includes('backend') || lowerText.includes('stack')) aiResponse = kb.responses['backend'] || "We use React, Node.js, and modern databases to build scalable systems.";
      else if (lowerText.includes('rbac') || lowerText.includes('role')) aiResponse = kb.responses['rbac'] || "We build secure systems with distinct user roles and permissions.";
      else if (lowerText.includes('service') || lowerText.includes('do you offer')) aiResponse = kb.responses['services'] || "We build scalable SaaS products.";
      else if (lowerText.includes('mvp') || lowerText.includes('cost') || lowerText.includes('price')) aiResponse = kb.responses['mvp'] || "Projects are scoped based on complexity.";

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  const isDev = mode === 'developer';
  
  const theme = {
    button: isDev ? 'bg-black text-[#00ff00] border border-[#00ff00]/40 hover:bg-[#00ff00]/10 shadow-[0_0_20px_rgba(0,255,0,0.3)]' : 'bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.4)]',
    window: isDev ? 'bg-black/95 border-[#00ff00]/30 shadow-[0_0_50px_rgba(0,255,0,0.15)]' : 'bg-[#0a0d14]/95 border-primary/20 shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    header: isDev ? 'bg-black border-[#00ff00]/20 text-[#00ff00]' : 'bg-gradient-to-r from-primary to-violet-600 text-white border-white/10',
    userMsg: isDev ? 'bg-[#00ff00]/5 border-[#00ff00]/20 text-white font-mono' : 'bg-primary text-white',
    aiMsg: isDev ? 'bg-[#00ff00]/10 border-[#00ff00]/30 text-[#00ff00] font-mono' : 'bg-white/5 border-white/10 text-gray-200',
    inputBg: isDev ? 'bg-black border-[#00ff00]/30 focus:border-[#00ff00] text-[#00ff00] font-mono' : 'bg-[#161b27] border-white/10 focus:border-primary text-white'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col rounded-2xl border backdrop-blur-xl overflow-hidden ${theme.window}`}
          >
            {/* Header - Terminal Style */}
            <div className={`p-3 border-b flex items-center justify-between shrink-0 ${theme.header}`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-1" />
                <Terminal size={14} className="text-[#00ff00]" />
                <div>
                  <div className="font-black text-[10px] tracking-widest uppercase">
                    {isDev ? 'SYSTEM_CORE_V5.0' : 'Gemachis AI'}
                  </div>
                  <div className="text-[8px] opacity-70 font-mono">
                    PID: 0x4A2 // STABLE
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#00ff00] opacity-50 hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </div>

            {/* Chat Area - Scanline effect */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar relative">
              {isDev && <div className="absolute inset-0 pointer-events-none scanline-bg opacity-10" />}
              
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-40 text-[9px] font-mono uppercase tracking-tighter">
                    {msg.role === 'user' ? (
                      <>
                        <span>root@devfolio</span>
                        <User size={8} />
                      </>
                    ) : (
                      <>
                        <Cpu size={8} className="text-[#00ff00]" />
                        <span className="text-[#00ff00]">sys_intel // mem: 42mb</span>
                      </>
                    )}
                  </div>
                  <div className={`max-w-[90%] p-3 text-[11px] leading-relaxed border ${msg.role === 'user' ? `${theme.userMsg} rounded-lg rounded-tr-none` : `${theme.aiMsg} rounded-lg rounded-tl-none`}`}>
                    <div className="whitespace-pre-wrap font-mono">
                      {msg.role === 'ai' && <span className="mr-2 text-[#00ff00]">➜</span>}
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`p-3 border rounded-lg rounded-tl-none ${theme.aiMsg}`}>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[#00ff00] animate-bounce" />
                      <div className="w-1 h-1 bg-[#00ff00] animate-bounce delay-75" />
                      <div className="w-1 h-1 bg-[#00ff00] animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {kb.suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className={`text-[10px] px-2.5 py-1.5 rounded-full border transition-colors ${
                      isDev ? 'border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/10' : 'border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 shrink-0 bg-black/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isDev ? "Execute query..." : "Ask me anything..."}
                  className={`w-full pl-4 pr-12 py-3 rounded-xl border outline-none text-sm transition-colors ${theme.inputBg} ${isDev ? 'font-mono placeholder-[#00F5FF]/30' : 'placeholder-gray-500'}`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                    isDev ? 'text-[#00F5FF] hover:bg-[#00F5FF]/10' : 'text-indigo-400 hover:bg-indigo-500/10'
                  }`}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative z-50 ${theme.button}`}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 inherit-bg" />
        {isOpen ? <X size={24} /> : (isDev ? <Terminal size={24} /> : <MessageSquare size={24} />)}
      </motion.button>
    </div>
  );
};
