import React from 'react';
import { motion } from 'framer-motion';
import { History, GraduationCap, Code2, Sparkles, Server, Palette, Award } from 'lucide-react';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Roadmap Timeline */}
      <section className="space-y-12">
        <header>
          <div className="flex items-center gap-2 text-primary font-mono text-[10px] mb-2 uppercase tracking-[0.3em]">
            <History size={12} /> System_Evolution_Log
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Career Milestones</h2>
        </header>

        <div className="relative pl-8 md:pl-0 border-l border-white/10 md:border-none space-y-16">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {[
            { 
              date: "2021 - 2025", 
              title: "Information Science Degree", 
              org: "HARAMAYA UNIVERSITY", 
              desc: "Focus: Data systems, database design, analytics, software development, and information systems.",
              tech: "Python • MySQL • HTML/CSS/JS • Power BI",
              type: "edu",
              icon: <GraduationCap size={16} className="text-primary" />
            },
            { 
              date: "2025", 
              title: "Frontend Development", 
              org: "ISHUB AAU", 
              desc: "Built responsive real-world applications using modern frontend architecture.",
              tech: "React.js • JavaScript • Tailwind CSS",
              type: "train",
              icon: <Code2 size={16} className="text-purple-400" />
            },
            { 
              date: "2025", 
              title: "AI Bootcamp", 
              org: "GeezX AI", 
              desc: "Applied AI concepts to real-world problem-solving systems and mastered ethical AI implementations.",
              tech: "AI Tools • Machine Learning • Ethics",
              type: "train",
              icon: <Sparkles size={16} className="text-indigo-400" />
            },
            { 
              date: "2024", 
              title: "Software Frameworks Training", 
              org: "HARAMAYA UNIVERSITY", 
              desc: "Learned scalable software structure, backend design principles, and system architecture.",
              tech: "System Architecture • Backend Concepts • SQL",
              type: "train",
              icon: <Server size={16} className="text-emerald-400" />
            },
            { 
              date: "2024", 
              title: "ALX Founder Academy", 
              org: "ALX VENTURES", 
              desc: "Deep Dive program focused on entrepreneurship and venture building. Developing skills for scaling impactful SaaS startups.",
              tech: "Entrepreneurship • Startup Thinking • Product Strategy",
              type: "train",
              icon: <Award size={16} className="text-amber-400" />
            },
            { 
              date: "2024", 
              title: "Graphic Design & UI/UX", 
              org: "IFARGAN x HARAMAYA", 
              desc: "Improved visual design and user interface thinking for building premium software experiences.",
              tech: "UI/UX Design • Branding • Adobe Tools",
              type: "train",
              icon: <Palette size={16} className="text-pink-400" />
            }
          ].map((exp, i) => (
            <motion.div 
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex w-8 h-8 absolute left-1/2 -translate-x-1/2 rounded-full bg-dark-900 border border-white/20 items-center justify-center z-10">
                {exp.icon}
              </div>
              <div className="md:hidden absolute -left-[41px] top-4 w-6 h-6 rounded-full bg-dark-900 border border-white/20 flex items-center justify-center z-10">
                {exp.icon}
              </div>
              
              <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                <div className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors group relative overflow-hidden">
                  <div className={`absolute top-0 w-32 h-32 bg-primary/5 blur-[50px] ${i % 2 === 0 ? 'left-0' : 'right-0'} pointer-events-none`} />
                  
                  <div className={`flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-[0.2em] ${i % 2 !== 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-primary">{exp.date}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-text-muted flex items-center gap-1">
                      {exp.org}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase mb-2">{exp.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{exp.desc}</p>
                  
                  <div className={`flex flex-wrap gap-2 ${i % 2 !== 0 ? 'md:justify-end' : ''}`}>
                    {exp.tech.split(' • ').map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/60 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperienceTimeline;
