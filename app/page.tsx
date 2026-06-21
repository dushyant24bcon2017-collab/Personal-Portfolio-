"use client";

import Link from "next/link";
import { useState } from "react";

// The new interactive Contact Button component
function ContactButton() {
  const [showNotification, setShowNotification] = useState(false);
  const email = "dushyant.24bcon2017@jecrcu.edu.in";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div 
        className={`absolute -top-14 bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 pointer-events-none ${
          showNotification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Email copied to clipboard!
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
      <button
        onClick={handleCopy}
        className="glow-button bg-dough text-midnight font-body font-semibold px-10 py-4 rounded-buttons text-lg inline-block transition-transform active:scale-95 cursor-pointer"
      >
        Get In Touch
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="blueprint-grid"></div>
      <div className="ambient-glow"></div>

      <main className="relative z-10 min-h-screen font-body selection:bg-dough selection:text-midnight">
        
        {/* 1. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 min-h-[90vh] flex flex-col justify-center relative">
          <div className="max-w-2xl relative z-10">
            <div className="w-12 h-[1px] bg-dough mb-8 opacity-50"></div>
            
            <h1 className="font-display font-[300] text-5xl md:text-7xl text-parchment leading-tight tracking-wide drop-shadow-lg">
              Dushyant Singh Rathore
            </h1>
            <p className="font-body font-normal text-slate text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
              Full-Stack Developer | Next.js & PERN Stack. Architecting disciplined, scalable systems with modern technologies.
            </p>
            
            <div className="flex items-center gap-5 mt-12">
              <Link 
                href="https://drive.google.com/file/d/1H9jwn3A_bsfRPFyE4GUPwypLX_Or35Wo/view?usp=sharing" 
                className="glow-button bg-dough text-midnight font-body font-semibold px-7 py-3.5 rounded-buttons"
              >
                Download Resume
              </Link>
              <Link 
                href="https://github.com/dushyant24bcon2017-collab" 
                className="bg-midnight/50 backdrop-blur-sm text-parchment border border-ash font-body px-6 py-3.5 rounded-buttons hover:border-slate hover:bg-ash/50 transition-all duration-300"
              >
                View GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 py-32 border-t border-ash/50">
          <h2 className="font-display font-[300] text-4xl text-parchment mb-10 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">01 //</span> About
          </h2>
          <div className="text-slate text-lg leading-relaxed max-w-3xl space-y-6">
            <p>
              I am a second-year B.Tech Computer Science student at JECRC University, based in Jaipur. I specialize in building full-stack applications with a heavy focus on the PERN stack, TypeScript, Prisma ORM, Next.js.
            </p>
            <p>
              For me, writing code is a lot like hitting an Upper/Lower split at the gym—it requires consistency, heavy lifting, and strict attention to the details. When I'm not architecting multi-tenant database schemas or debugging state management, I'm probably reading Books or running matches in EA FC.
            </p>
          </div>
        </section>

        {/* 3. EXPERIENCE SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 py-32 border-t border-ash/50">
          <h2 className="font-display font-[300] text-4xl text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">02 //</span> Experience
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 transition-all duration-300 hover:border-dough/50 group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="font-display font-[300] text-2xl md:text-3xl text-parchment flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-dough shadow-[0_0_8px_rgba(230,126,34,0.6)]"></span>
                    Founder & Operations Lead
                  </h3>
                  <p className="text-slate font-body mt-2 text-lg">The Dough House</p>
                </div>
                <p className="text-slate font-mono text-sm mt-4 md:mt-0 opacity-70">Aug 2025 - Present</p>
              </div>
              <p className="text-slate leading-relaxed max-w-3xl text-lg">
                Launched and scaled an artisanal bakery brand, managing digital presence, brand identity, and logistical operations for both signature and health-focused product lines. 
              </p>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 py-32 border-t border-ash/50">
          <h2 className="font-display font-[300] text-4xl text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">03 //</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="font-display font-[300] text-3xl text-parchment mb-4 group-hover:text-dough transition-colors">Logistics Dashboard</h3>
              <p className="text-slate flex-grow mb-10 text-lg leading-relaxed">
                A robust multi-tenant inventory and logistics management system designed for scale. Features complex relational schemas and secure role-based access.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Express.js</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">TypeScript</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">React</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">PostgreSQL</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Prisma</span>
              </div>
            </div>

            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="font-display font-[300] text-3xl text-parchment mb-4 group-hover:text-dough transition-colors">AI Travel Planner</h3>
              <p className="text-slate flex-grow mb-10 text-lg leading-relaxed">
                An intelligent itinerary generator that creates customized travel plans on the fly using AI APIs and dynamic client-side rendering.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Next.js</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Vercel AI SDK</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Gemini API</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SKILLS SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 py-32 border-t border-ash/50">
          <h2 className="font-display font-[300] text-4xl text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">04 //</span> Technical Arsenal
          </h2>
          <div className="flex flex-wrap gap-4 max-w-4xl">
            {['TypeScript', 'JavaScript', 'Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'].map((skill) => (
              <div key={skill} className="glass-card border border-ash/80 rounded-buttons px-6 py-3 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                {skill === 'PostgreSQL' || skill === 'Node.js' ? (
                   <span className="w-1.5 h-1.5 rounded-full bg-supabase shadow-[0_0_6px_rgba(62,207,142,0.6)]"></span>
                ) : null}
                <span className="font-mono text-sm text-parchment tracking-wide">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 py-40 border-t border-ash/50 text-center relative">
          <h2 className="font-display font-[300] text-5xl md:text-6xl text-parchment mb-8">Let's Build Something.</h2>
          <p className="text-slate mb-12 max-w-md mx-auto text-lg leading-relaxed">
            Currently open for new opportunities, freelance projects, or just a good discussion about system architecture.
          </p>
          <ContactButton />
        </section>
        
        <footer className="py-10 text-center border-t border-ash/50 text-slate/60 font-mono text-sm tracking-wide bg-midnight/50 backdrop-blur-md">
          <p>© {new Date().getFullYear()} Dushyant Singh Rathore. Architected with precision.</p>
        </footer>
      </main>
    </>
  );
}