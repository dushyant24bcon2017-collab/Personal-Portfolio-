"use client";

import Link from "next/link";
import { useState } from "react";

// The interactive Contact Button component
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
    <div className="relative inline-flex flex-col items-center mt-8">
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
  // Hamburger menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="blueprint-grid"></div>
      <div className="ambient-glow"></div>

      {/* FIXED NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-midnight/70 backdrop-blur-lg border-b border-ash/40 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="#" className="font-display text-2xl font-extrabold tracking-tight text-parchment hover:text-white transition-colors" onClick={handleLinkClick}>
            DSR<span className="text-dough">.</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-mono tracking-widest uppercase text-slate hover:text-dough transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button 
            className="md:hidden text-parchment hover:text-dough transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // Close (X) Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            ) : (
              // Hamburger Menu Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-midnight/95 backdrop-blur-xl border-b border-ash/40 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[400px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="flex flex-col items-center gap-6">
            {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={handleLinkClick}
                className="text-base font-mono tracking-widest uppercase text-slate hover:text-dough transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="#contact" 
              onClick={handleLinkClick}
              className="mt-2 text-sm font-mono tracking-widest uppercase text-midnight bg-dough px-8 py-3 rounded-buttons hover:scale-105 transition-transform"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 min-h-screen font-body selection:bg-dough selection:text-midnight pt-20">
        
        {/* 1. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 min-h-[85vh] flex flex-col justify-center relative items-center text-center">
          <div className="max-w-3xl relative z-10 flex flex-col items-center">
            <div className="w-12 h-[1px] bg-dough mb-8 opacity-50"></div>
            
            <h1 className="scroll-m-20 text-center text-4xl md:text-6xl font-extrabold tracking-tight text-balance text-parchment drop-shadow-lg">
              Dushyant Singh Rathore
            </h1>
            <p className="font-body font-normal text-slate text-lg md:text-xl mt-6 max-w-xl leading-relaxed text-balance">
              Full-Stack Developer | Next.js & PERN Stack. Architecting disciplined, scalable systems with modern technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 w-full sm:w-auto">
              <Link 
                href="https://drive.google.com/file/d/1H9jwn3A_bsfRPFyE4GUPwypLX_Or35Wo/view?usp=sharing" 
                className="glow-button bg-dough text-midnight font-body font-semibold px-7 py-3.5 rounded-buttons w-full sm:w-auto text-center"
              >
                Download Resume
              </Link>
              <Link 
                href="https://github.com/dushyant24bcon2017-collab" 
                className="bg-midnight/50 backdrop-blur-sm text-parchment border border-ash font-body px-6 py-3.5 rounded-buttons hover:border-slate hover:bg-ash/50 transition-all duration-300 w-full sm:w-auto text-center"
              >
                View GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="max-w-[1200px] mx-auto px-6 py-32 scroll-mt-20">
          <h2 className="scroll-m-20 border-b border-ash/50 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-parchment mb-10 flex items-center gap-4">
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
        <section id="experience" className="max-w-[1200px] mx-auto px-6 py-32 scroll-mt-20">
          <h2 className="scroll-m-20 border-b border-ash/50 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">02 //</span> Experience
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 transition-all duration-300 hover:border-dough/50 group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-parchment flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-dough shadow-[0_0_8px_rgba(230,126,34,0.6)]"></span>
                    Founder & Operations Lead
                  </h3>
                  <p className="text-slate font-body mt-2 text-base">The Dough House</p>
                </div>
                <p className="text-slate font-mono text-sm mt-4 md:mt-0 opacity-70">Aug 2025 - Present</p>
              </div>
              <p className="text-slate leading-relaxed max-w-3xl text-lg">
              Launched and managed operations for an artisanal bakery brand, taking full ownership of product branding, organic
content strategy, and driving initial salesDeveloped a lightweight digital storefront to establish an early online presence and facilitate basic customer orders.
              </p>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="max-w-[1200px] mx-auto px-6 py-32 scroll-mt-20">
          <h2 className="scroll-m-20 border-b border-ash/50 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">03 //</span> Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* PROJECT 1: API Gateway */}
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-parchment mb-2 group-hover:text-dough transition-colors">
                High-Concurrency API Gateway
              </h3>
              
              <div className="trace font-sans font-bold uppercase tracking-widest text-[0.7rem] mb-6 mt-2 bg-midnight/40 p-3 rounded-md border border-ash/50">
                <span className="trace-node">ClientReq</span>
                <span className="trace-arrow"></span>
                <span className="trace-node text-dough">Redis.Lua</span>
                <span className="trace-arrow"></span>
                <span className="trace-node">ReverseProxy</span>
              </div>
              
              <p className="text-slate flex-grow mb-8 text-lg leading-relaxed">
                Engineered an API gateway for high concurrency. Integrated strict rate-limiting and API key verification utilizing Redis Lua scripts to ensure atomicity and eradicate race conditions, routed via HTTP-Proxy-Middleware.
              </p>
              
              <div className="hairline mb-6"></div>
              
              <div className="flex flex-wrap gap-3 mt-auto">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Redis</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Lua</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">http-proxy-middleware</span>
              </div>
            </div>

            {/* PROJECT 2: Pagination Engine */}
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-parchment mb-2 group-hover:text-dough transition-colors">
                Tuple Cursor Pagination Engine
              </h3>
              
              <div className="trace font-sans font-bold uppercase tracking-widest text-[0.7rem] mb-6 mt-2 bg-midnight/40 p-3 rounded-md border border-ash/50">
                <span className="trace-node">React UI</span>
                <span className="trace-arrow"></span>
                <span className="trace-node text-dough">Tuple Cursor</span>
                <span className="trace-arrow"></span>
                <span className="trace-node">Indexed DB</span>
              </div>
              
              <p className="text-slate flex-grow mb-8 text-lg leading-relaxed">
                A blazing-fast backend pagination engine utilizing tuple cursors and strategic database indexing for optimal data retrieval. Includes an automated seeding script and a lightweight React frontend to visualize data streams.
              </p>
              
              <div className="hairline mb-6"></div>

              <div className="flex flex-wrap gap-3 mt-auto">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">PostgreSQL</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Node.js</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">React</span>
              </div>
            </div>

            {/* PROJECT 3: Logistics Dashboard */}
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-parchment mb-2 group-hover:text-dough transition-colors">
                Logistics Dashboard
              </h3>
              
              <div className="trace font-sans font-bold uppercase tracking-widest text-[0.7rem] mb-6 mt-2 bg-midnight/40 p-3 rounded-md border border-ash/50">
                <span className="trace-node">Client</span>
                <span className="trace-arrow"></span>
                <span className="trace-node text-dough">Express.API</span>
                <span className="trace-arrow"></span>
                <span className="trace-node">PostgreSQL</span>
              </div>

              <p className="text-slate flex-grow mb-8 text-lg leading-relaxed">
                A robust multi-tenant inventory and logistics management system designed for scale. Features complex relational schemas and secure role-based access.
              </p>

              <div className="hairline mb-6"></div>

              <div className="flex flex-wrap gap-3 mt-auto">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Express.js</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">TypeScript</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">PostgreSQL</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Prisma</span>
              </div>
            </div>

            {/* PROJECT 4: AI Travel Planner */}
            <div className="glass-card border border-ash/80 rounded-cards p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:border-slate group hover:-translate-y-1">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-parchment mb-2 group-hover:text-dough transition-colors">
                AI Travel Planner
              </h3>
              
              <div className="trace font-sans font-bold uppercase tracking-widest text-[0.7rem] mb-6 mt-2 bg-midnight/40 p-3 rounded-md border border-ash/50">
                <span className="trace-node">ClientReq</span>
                <span className="trace-arrow"></span>
                <span className="trace-node text-dough">Vercel AI</span>
                <span className="trace-arrow"></span>
                <span className="trace-node">Gemini API</span>
              </div>

              <p className="text-slate flex-grow mb-8 text-lg leading-relaxed">
                An intelligent itinerary generator that creates customized travel plans on the fly using AI APIs and dynamic client-side rendering.
              </p>

              <div className="hairline mb-6"></div>

              <div className="flex flex-wrap gap-3 mt-auto">
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Next.js</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Vercel AI SDK</span>
                <span className="font-mono text-xs tracking-wider border border-ash text-parchment/80 bg-concrete/50 px-4 py-1.5 rounded-buttons">Gemini API</span>
              </div>
            </div>

          </div>
        </section>

        {/* 5. SKILLS SECTION */}
        <section id="skills" className="max-w-[1200px] mx-auto px-6 py-32 scroll-mt-20">
          <h2 className="scroll-m-20 border-b border-ash/50 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-parchment mb-12 flex items-center gap-4">
            <span className="text-slate font-mono text-sm tracking-widest uppercase">04 //</span> Technical Arsenal
          </h2>
          <div className="flex flex-wrap gap-4 max-w-4xl">
            {['TypeScript', 'JavaScript', 'Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Prisma ORM', 'Tailwind CSS'].map((skill) => (
              <div key={skill} className="glass-card border border-ash/80 rounded-buttons px-6 py-3 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                {skill === 'PostgreSQL' || skill === 'Node.js' || skill === 'Redis' ? (
                   <span className="w-1.5 h-1.5 rounded-full bg-supabase shadow-[0_0_6px_rgba(62,207,142,0.6)]"></span>
                ) : null}
                <span className="font-mono text-sm text-parchment tracking-wide">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <section id="contact" className="max-w-[1200px] mx-auto px-6 py-40 text-center relative flex flex-col items-center scroll-mt-20">
          <h2 className="scroll-m-20 text-center text-4xl md:text-6xl font-extrabold tracking-tight text-balance text-parchment mb-8">
            Let's Build Something.
          </h2>
          <p className="text-slate mb-6 max-w-md mx-auto text-lg leading-relaxed">
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