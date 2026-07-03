"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Interactive terminal — "session.log". A printed listing you can type into,
// not an OS-window imitation, per the Terminal Snippet Block spec.
function TerminalWidget() {
  type Line = { type: "input" | "output"; text: string };

  const RESUME_URL =
    "https://drive.google.com/file/d/1H9jwn3A_bsfRPFyE4GUPwypLX_Or35Wo/view?usp=sharing";

  const [history, setHistory] = useState<Line[]>([
    { type: "output", text: "session initialized — type 'help' to begin" },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, () => string[]> = {
    help: () => [
      "available commands:",
      "  whoami       who is running this session",
      "  ls           list shipped components",
      "  cat resume   open resume in a new tab",
      "  contact      get in touch",
      "  clear        clear the log",
    ],
    whoami: () => [
      "dushyant_singh_rathore — full-stack developer",
      "jaipur, in · b.tech cse · rev 2.0",
    ],
    ls: () => [
      "U1  high-concurrency-api-gateway    [shipped]",
      "U2  tuple-cursor-pagination         [shipped]",
      "U3  logistics-dashboard             [in progress]",
      "U4  ai-travel-planner               [shipped]",
    ],
    "cat resume": () => {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      return ["opening résumé in a new tab..."];
    },
    contact: () => ["dushyant.24bcon2017@jecrcu.edu.in", "status: receiving"],
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (cmd === "") return;
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const handler = commands[cmd];
    const output = handler ? handler() : [`command not found: ${cmd} — try 'help'`];
    setHistory((h) => [
      ...h,
      { type: "input", text: raw },
      ...output.map((text) => ({ type: "output" as const, text })),
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(value);
    setValue("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  return (
    <div
      className="w-full bg-[var(--color-substrate-deep)] border border-[var(--color-trace-gray)] rounded-[2px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-trace-gray)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-legend-gray)]">
          session.log
        </span>
        <span className="font-mono text-[11px] text-[var(--color-legend-gray)]">rev 2.0</span>
      </div>

      <div
        ref={scrollRef}
        className="h-[220px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.6] scroll-smooth"
      >
        {history.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="text-[var(--color-ink)]">
              <span className="text-[var(--color-solder-mask)]">guest@dsr:~$</span> {line.text}
            </div>
          ) : (
            <div key={i} className="text-[var(--color-legend-gray)] whitespace-pre-wrap">
              {line.text}
            </div>
          )
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-2 border-t border-[var(--color-trace-gray)]"
      >
        <span className="font-mono text-[13px] text-[var(--color-solder-mask)]">guest@dsr:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent outline-none font-mono text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-legend-gray)] min-w-0"
          placeholder="type 'help'"
          spellCheck={false}
          autoComplete="off"
          aria-label="Interactive terminal command input"
        />
      </form>
    </div>
  );
}

// Contact Button designed to spec: single fill color, lift shadow, solder-mask hover
function ContactButton() {
  const [showNotification, setShowNotification] = useState(false);
  const email = "dushyant.24bcon2017@jecrcu.edu.in";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts (some http hosts, older browsers)
        const el = document.createElement("textarea");
        el.value = email;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-start mt-6">
      <div
        role="status"
        aria-live="polite"
        className={`absolute -top-12 left-0 bg-[var(--color-substrate-deep)] border border-[var(--color-trace-gray)] text-[var(--color-ink)] font-mono text-[12px] py-1.5 px-3 transition-all duration-200 pointer-events-none rounded-[2px] ${
          showNotification ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        [EMAIL_COPIED_TO_CLIPBOARD]
      </div>
      <button onClick={handleCopy} className="btn-primary" aria-label={`Copy email address ${email}`}>
        Initialize Contact
      </button>
    </div>
  );
}
function Typewriter() {
  const phrases = [
    "Full-Stack Developer focused on Next.js & the PERN ecosystem.",
    "Architecting disciplined and scalable systems with modern tooling.",
    "Building scalable backends.",
    "Building secure API gateways."
  ];
  
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    // Deleting is usually faster than typing for a better feel
    const typeSpeed = isDeleting ? 30 : 60; 

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        // Pause when the phrase is fully typed out
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // Move to the next phrase once fully deleted
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        // Add or remove a character
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    // min-h-[48px] prevents the page layout from jumping up and down when the text wraps to two lines or deletes completely
    <p className="font-fieldwork font-normal text-[16px] leading-relaxed text-[var(--color-ink)] mb-[24px] max-w-[560px] min-h-[48px]">
      {text}
      <span className="inline-block w-[8px] h-[15px] bg-[var(--color-solder-mask)] ml-[4px] animate-pulse align-middle"></span>
    </p>
  );
}
// Scanning-reticle logomark. Same corner-bracket language as the
// Component Index cards, animated with a sweep line — the site's one
// dynamic brand mark, used exactly once so it stays a signature.
// Scanning-reticle logomark. Same corner-bracket language as the
// Component Index cards, animated with a sweep line — the site's one
// dynamic brand mark, used exactly once so it stays a signature.
function ScanningMark() {
  return (
    <span className="relative inline-flex h-[22px] w-[22px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-full w-full overflow-visible">
        <path d="M2 7V2H7" className="scan-bracket" fill="none" stroke="var(--color-solder-mask)" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M17 2H22V7" className="scan-bracket" fill="none" stroke="var(--color-solder-mask)" strokeWidth="1.5" strokeLinecap="square" style={{ animationDelay: "0.15s" }} />
        <path d="M22 17V22H17" className="scan-bracket" fill="none" stroke="var(--color-solder-mask)" strokeWidth="1.5" strokeLinecap="square" style={{ animationDelay: "0.3s" }} />
        <path d="M7 22H2V17" className="scan-bracket" fill="none" stroke="var(--color-solder-mask)" strokeWidth="1.5" strokeLinecap="square" style={{ animationDelay: "0.45s" }} />
        <line x1="12" y1="10" x2="12" y2="14" stroke="var(--color-trace-gray)" strokeWidth="1" />
        <line x1="10" y1="12" x2="14" y2="12" stroke="var(--color-trace-gray)" strokeWidth="1" />
        <clipPath id="scan-clip">
          <rect x="2" y="2" width="20" height="20" />
        </clipPath>
        <g clipPath="url(#scan-clip)">
          <rect x="2" y="1" width="20" height="1.5" fill="var(--color-solder-mask)" className="scan-sweep" />
        </g>
      </svg>
    </span>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const navItems = ["About", "Timeline", "Components", "Specs"];

  return (
    <>
      {/* GLOBAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--color-substrate)] border-b border-[var(--color-trace-gray)] h-[56px] flex items-center justify-between px-6 xl:px-0">
        <div className="max-w-[960px] w-full mx-auto flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 font-panelface font-bold text-[18px] uppercase tracking-widest text-[var(--color-ink)]"
            onClick={handleLinkClick}
          >
            <ScanningMark />
            DSR
            <span className="sr-only">status: available</span>
          </Link>

          <div className="hidden md:flex items-center gap-[24px]">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-fieldwork font-medium text-[14px] uppercase tracking-[0.04em] text-[var(--color-ink)] hover:text-[var(--color-solder-mask)] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link href="#contact" className="btn-ghost ml-2">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[var(--color-ink)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden absolute top-[56px] left-0 w-full bg-[var(--color-substrate-deep)] border-b border-[var(--color-trace-gray)] transition-all duration-200 overflow-hidden ${
            isMobileMenuOpen ? "max-h-[300px] border-b opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="flex flex-col items-start p-6 gap-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleLinkClick}
                className="font-fieldwork font-medium text-[14px] uppercase tracking-[0.04em] text-[var(--color-ink)] w-full pb-2 border-b border-[var(--color-trace-gray)]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-[56px] pb-[64px]">
        {/* HERO SECTION */}
        <section className="max-w-[960px] mx-auto px-6 pt-[96px] pb-[64px]">
          <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
            <div className="flex flex-col max-w-[600px]">
              <span className="font-mono uppercase text-[var(--color-legend-gray)] text-[12px] tracking-[0.08em] mb-[12px]">
                ENGINEER — FULL-STACK / BACKEND FOCUSED
              </span>
              <h1 className="font-panelface font-medium text-[56px] leading-[1.08] tracking-[0.02em] text-[var(--color-ink)] mb-[16px]">
                Dushyant Singh Rathore
              </h1>
              <Typewriter />
              <div className="font-mono text-[13px] text-[var(--color-legend-gray)] mb-[32px] flex items-center gap-2">
                <span>B.TECH CSE</span>
                <span>·</span>
                <span>JAIPUR, IN</span>
                <span>·</span>
                <span>REV 2.0</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="https://drive.google.com/file/d/1H9jwn3A_bsfRPFyE4GUPwypLX_Or35Wo/view?usp=sharing"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Résumé
                </Link>
                <Link
                  href="https://github.com/dushyant24bcon2017-collab"
                  className="btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB
                </Link>
              </div>
            </div>

            {/* Right column — the "decorative" slot from the design spec,
                filled with a real interactive terminal instead of a static graphic */}
            <div className="w-full">
              <TerminalWidget />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-[960px] mx-auto px-6 py-[48px]">
          <h2 className="font-panelface font-bold text-[28px] uppercase tracking-[0.12em] text-[var(--color-ink)] border-b border-[var(--color-trace-gray)] pb-[12px] mb-[24px]">
            Overview
          </h2>
          <div className="font-fieldwork text-[15px] text-[var(--color-ink)] leading-[1.6] max-w-[720px] space-y-4">
            <p>
              I am a third-year B.Tech Computer Science student at JECRC University, based in Jaipur. I specialize in building full-stack applications with a heavy focus on the PERN stack, TypeScript, Prisma ORM, and Next.js.
            </p>
            <p>
              For me, writing code is a lot like hitting an Upper/Lower split at the gym — it requires consistency, heavy lifting, and strict attention to the details. When I'm not architecting database schemas or debugging state management, I'm reading books or running matches in Fifa.
            </p>
          </div>
        </section>

        {/* TIMELINE (EXPERIENCE) SECTION */}
        <section id="timeline" className="max-w-[960px] mx-auto px-6 py-[48px]">
          <h2 className="font-panelface font-bold text-[28px] uppercase tracking-[0.12em] text-[var(--color-ink)] border-b border-[var(--color-trace-gray)] pb-[12px] mb-[24px]">
            Revision History
          </h2>
          <div className="w-full border border-[var(--color-trace-gray)] rounded-[2px] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[80px_140px_1fr] bg-[var(--color-substrate-deep)] border-b border-[var(--color-ink)] px-4 py-3 font-fieldwork font-semibold text-[13px] uppercase text-[var(--color-ink)]">
              <div>Rev</div>
              <div>Date</div>
              <div>Description of Changes</div>
            </div>
            {/* Table Rows */}
            <div className="grid grid-cols-[80px_140px_1fr] spec-table-row border-b border-[var(--color-trace-gray)] px-4 py-3 items-start">
              <div className="font-mono text-[13px] text-[var(--color-solder-mask)]">v2.0</div>
              <div className="font-mono text-[13px] text-[var(--color-legend-gray)]">Aug 2025 – Pres</div>
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)] leading-[1.5]">
                <strong className="font-medium block mb-1">Founder &amp; Operations Lead, The Dough House</strong>
                Launched operations for an artisanal bakery brand. Developed lightweight digital storefront, managed product branding, organic content strategy, and facilitated customer ordering systems.
              </div>
            </div>
            <div className="grid grid-cols-[80px_140px_1fr] spec-table-row border-b border-[var(--color-trace-gray)] px-4 py-3 items-start">
              <div className="font-mono text-[13px] text-[var(--color-solder-mask)]">v1.0</div>
              <div className="font-mono text-[13px] text-[var(--color-legend-gray)]">2024 – 2028</div>
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)] leading-[1.5]">
                <strong className="font-medium block mb-1">B.Tech CSE, JECRC University</strong>
                Second-year student. Foundations in full-stack architecture, database management systems, and competitive problem solving.
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="components" className="max-w-[960px] mx-auto px-6 py-[48px]">
          <h2 className="font-panelface font-bold text-[28px] uppercase tracking-[0.12em] text-[var(--color-ink)] border-b border-[var(--color-trace-gray)] pb-[12px] mb-[24px]">
            Component Index
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* U1: API Gateway */}
            <div className="component-card">
              <div className="fiducial-tl"></div>
              <div className="fiducial-tr"></div>
              <div className="fiducial-bl"></div>
              <div className="fiducial-br"></div>

              <div className="font-mono text-[12px] text-[var(--color-legend-gray)] mb-[16px]">U1</div>
              <h3 className="font-fieldwork font-semibold text-[18px] text-[var(--color-ink)] mb-[8px]">
                High-Concurrency API Gateway
              </h3>
              <p className="font-fieldwork font-normal text-[15px] text-[var(--color-legend-gray)] leading-[1.5] mb-[16px] line-clamp-2">
                API gateway with security , strict rate-limiting and atomicity utilizing Redis Lua scripts to eradicate race conditions.
              </p>

              <div className="flex items-center gap-2 mb-[16px]">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-solder-mask)]"></span>
                <span className="font-mono text-[12px] text-[var(--color-ink)]">shipped</span>
                <span className="font-mono text-[12px] text-[var(--color-legend-gray)] ml-auto">Redis · Lua · Proxy</span>
              </div>

              <div className="w-full h-[1px] bg-[var(--color-trace-gray)] my-[16px]"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Role</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Backend Eng</div>
                </div>
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Outcome</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Zero Race Cond | High Latency | Security</div>
                </div>
              </div>
            </div>

            {/* U2: Pagination Engine */}
            <div className="component-card">
              <div className="fiducial-tl"></div>
              <div className="fiducial-tr"></div>
              <div className="fiducial-bl"></div>
              <div className="fiducial-br"></div>

              <div className="font-mono text-[12px] text-[var(--color-legend-gray)] mb-[16px]">U2</div>
              <h3 className="font-fieldwork font-semibold text-[18px] text-[var(--color-ink)] mb-[8px]">
                Tuple Cursor Pagination
              </h3>
              <p className="font-fieldwork font-normal text-[15px] text-[var(--color-legend-gray)] leading-[1.5] mb-[16px] line-clamp-2">
                Blazing-fast backend engine utilizing tuple cursors and strategic DB indexing for optimal streaming.
              </p>

              <div className="flex items-center gap-2 mb-[16px]">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-solder-mask)]"></span>
                <span className="font-mono text-[12px] text-[var(--color-ink)]">shipped</span>
                <span className="font-mono text-[12px] text-[var(--color-legend-gray)] ml-auto">PostgreSQL · Node · React</span>
              </div>

              <div className="w-full h-[1px] bg-[var(--color-trace-gray)] my-[16px]"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Role</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Backend Eng</div>
                </div>
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Outcome</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">O(1) Data Retrieval | Cursor Pagination |Seeding Script</div>
                </div>
              </div>
            </div>

            {/* U3: Logistics Dashboard */}
            <div className="component-card">
              <div className="fiducial-tl"></div>
              <div className="fiducial-tr"></div>
              <div className="fiducial-bl"></div>
              <div className="fiducial-br"></div>

              <div className="font-mono text-[12px] text-[var(--color-legend-gray)] mb-[16px]">U3</div>
              <h3 className="font-fieldwork font-semibold text-[18px] text-[var(--color-ink)] mb-[8px]">
                Logistics Dashboard
              </h3>
              <p className="font-fieldwork font-normal text-[15px] text-[var(--color-legend-gray)] leading-[1.5] mb-[16px] line-clamp-2">
                Robust multi-tenant inventory management system with complex relational schemas and role-based access.
              </p>

              <div className="flex items-center gap-2 mb-[16px]">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-solder-mask)]"></span>
                <span className="font-mono text-[12px] text-[var(--color-ink)]">shipped</span>
                <span className="font-mono text-[12px] text-[var(--color-legend-gray)] ml-auto">Express · Prisma</span>
              </div>

              <div className="w-full h-[1px] bg-[var(--color-trace-gray)] my-[16px]"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Role</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Architecture</div>
                </div>
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Outcome</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Multi-Tenancy | RABC | Transaction Queries</div>
                </div>
              </div>
            </div>

            {/* U4: AI Travel Planner */}
            <div className="component-card">
              <div className="fiducial-tl"></div>
              <div className="fiducial-tr"></div>
              <div className="fiducial-bl"></div>
              <div className="fiducial-br"></div>

              <div className="font-mono text-[12px] text-[var(--color-legend-gray)] mb-[16px]">U4</div>
              <h3 className="font-fieldwork font-semibold text-[18px] text-[var(--color-ink)] mb-[8px]">
                AI Travel Planner
              </h3>
              <p className="font-fieldwork font-normal text-[15px] text-[var(--color-legend-gray)] leading-[1.5] mb-[16px] line-clamp-2">
                Intelligent itinerary generator utilizing Vercel AI SDK and Gemini for dynamic client-side rendering.
              </p>

              <div className="flex items-center gap-2 mb-[16px]">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-solder-mask)]"></span>
                <span className="font-mono text-[12px] text-[var(--color-ink)]">shipped</span>
                <span className="font-mono text-[12px] text-[var(--color-legend-gray)] ml-auto">Next.js · Gemini</span>
              </div>

              <div className="w-full h-[1px] bg-[var(--color-trace-gray)] my-[16px]"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Role</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">Full-Stack</div>
                </div>
                <div>
                  <div className="font-mono text-[12px] text-[var(--color-legend-gray)] uppercase">Outcome</div>
                  <div className="font-mono text-[13px] text-[var(--color-ink)] mt-1">API Integration | Tool Calling | Vercel AI SDK</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="specs" className="max-w-[960px] mx-auto px-6 py-[48px]">
          <h2 className="font-panelface font-bold text-[28px] uppercase tracking-[0.12em] text-[var(--color-ink)] border-b border-[var(--color-trace-gray)] pb-[12px] mb-[24px]">
            Technical Parameters
          </h2>

          <div className="w-full border-t border-[var(--color-trace-gray)]">
            {/* Header Row */}
            <div className="grid grid-cols-3 px-4 py-2 border-b border-[var(--color-trace-gray)] font-fieldwork font-semibold text-[13px] uppercase text-[var(--color-ink)]">
              <div>Parameter</div>
              <div>Value</div>
              <div>Notes</div>
            </div>

            {/* Data Rows */}
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-[var(--color-trace-gray)] spec-table-row items-center">
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)]">Core Languages</div>
              <div className="font-mono text-[13px] text-[var(--color-ink)]">TypeScript, JavaScript,Python</div>
              <div className="font-mono text-[12px] text-[var(--color-legend-gray)]">ES6+ Standard</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-[var(--color-trace-gray)] spec-table-row items-center">
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)]">Frontend Stack</div>
              <div className="font-mono text-[13px] text-[var(--color-ink)]">Next.js, React, Tailwind</div>
              <div className="font-mono text-[12px] text-[var(--color-legend-gray)]">SSR / SSG</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-[var(--color-trace-gray)] spec-table-row items-center">
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)]">Backend Runtime</div>
              <div className="font-mono text-[13px] text-[var(--color-ink)]">Node.js, Express</div>
              <div className="font-mono text-[12px] text-[var(--color-legend-gray)]">REST APIs / Middleware</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-[var(--color-trace-gray)] spec-table-row items-center">
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)]">Database & Cache</div>
              <div className="font-mono text-[13px] text-[var(--color-ink)]">PostgreSQL, Redis</div>
              <div className="font-mono text-[12px] text-[var(--color-legend-gray)]">Relational / KV</div>
            </div>
            <div className="grid grid-cols-3 px-4 py-2.5 border-b border-[var(--color-trace-gray)] spec-table-row items-center">
              <div className="font-fieldwork text-[14px] text-[var(--color-ink)]">Data Modeling</div>
              <div className="font-mono text-[13px] text-[var(--color-ink)]">Prisma ORM</div>
              <div className="font-mono text-[12px] text-[var(--color-legend-gray)]">Multi-tenant schemas</div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-[960px] mx-auto px-6 py-[64px] border-t border-[var(--color-trace-gray)] mt-[32px]">
          <div className="flex flex-col items-start max-w-[600px]">
            <span className="font-mono uppercase text-[var(--color-legend-gray)] text-[12px] tracking-[0.08em] mb-[12px]">
              END OF DOCUMENT
            </span>
            <h2 className="font-panelface font-bold text-[36px] text-[var(--color-ink)] mb-[16px]">
              Status: Receiving
            </h2>
            <p className="font-fieldwork text-[16px] text-[var(--color-ink)] leading-[1.6] mb-[24px]">
              Available for system architecture discussions, scalable stack inquiries, or technical opportunities.
            </p>
            <ContactButton />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[var(--color-ink)] text-[var(--color-substrate)] py-[32px] px-6 xl:px-0">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-[13px]">© {new Date().getFullYear()} Dushyant Singh Rathore</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-solder-mask)]"></span>
            <span className="font-mono text-[13px]">listening</span>
          </div>
        </div>
      </footer>
    </>
  );
}