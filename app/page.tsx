"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/* ─── Scroll-reveal wrapper ─── */
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 3D tilt card ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform, transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ─── Mouse gradient follower ─── */
function MouseGradient() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 50, damping: 30 });
  const springY = useSpring(0, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [springX, springY]);

  useEffect(() => {
    const unsubX = springX.on("change", (v) => setPos((p) => ({ ...p, x: v })));
    const unsubY = springY.on("change", (v) => setPos((p) => ({ ...p, y: v })));
    return () => { unsubX(); unsubY(); };
  }, [springX, springY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-30"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,107,43,0.06), transparent 60%)`,
      }}
    />
  );
}

/* ─── Galaxy starfield ─── */
function Galaxy() {
  const [stars] = useState(() => {
    const centerX = 50;
    const centerY = 45;
    return Array.from({ length: 200 }, (_, i) => {
      // Mix of clustered (galaxy core) and scattered (outer) stars
      const isCore = i < 80;
      const angle = Math.random() * Math.PI * 2;
      const dist = isCore
        ? Math.random() * 25
        : 20 + Math.random() * 40;
      // Elliptical spread for galaxy shape
      const x = centerX + Math.cos(angle) * dist * 1.3 + (Math.random() - 0.5) * 8;
      const y = centerY + Math.sin(angle) * dist * 0.6 + (Math.random() - 0.5) * 5;

      const brightness = isCore ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4 + 0.1;
      const size = isCore
        ? Math.random() * 2.5 + 0.5
        : Math.random() * 1.8 + 0.3;

      // Color variety: warm whites, blue-whites, faint orange, faint purple
      const colors = [
        `rgba(255,255,255,${brightness})`,
        `rgba(200,220,255,${brightness})`,
        `rgba(255,220,180,${brightness * 0.8})`,
        `rgba(180,170,255,${brightness * 0.7})`,
        `rgba(255,180,140,${brightness * 0.6})`,
      ];

      return {
        id: i,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
        size,
        color: colors[i % colors.length],
        twinkleDuration: 2 + Math.random() * 5,
        twinkleDelay: Math.random() * -5,
        hasDrift: Math.random() > 0.6,
        driftDuration: 30 + Math.random() * 40,
        driftX: (Math.random() - 0.5) * 15,
        driftY: (Math.random() - 0.5) * 10,
        glow: isCore && size > 2,
      };
    });
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Galaxy core nebula glow */}
      <div
        className="absolute"
        style={{
          left: "35%",
          top: "25%",
          width: "35%",
          height: "25%",
          background: "radial-gradient(ellipse, rgba(255,107,43,0.03) 0%, rgba(139,122,247,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: s.glow ? `0 0 ${s.size * 3}px ${s.color}` : undefined,
          }}
          animate={
            s.hasDrift
              ? {
                  opacity: [1, 0.3, 1],
                  x: [0, s.driftX, 0],
                  y: [0, s.driftY, 0],
                }
              : { opacity: [1, 0.2, 1] }
          }
          transition={{
            duration: s.hasDrift ? s.driftDuration : s.twinkleDuration,
            repeat: Infinity,
            delay: s.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <Reveal>
      <div className="section-rule mb-12" />
      <div className="flex items-baseline gap-4 mb-20">
        <span className="number-accent">{num}</span>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">{title}</h2>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <>
      {/* Background layers */}
      <div className="dot-grid" />
      <Galaxy />
      <MouseGradient />

      {/* Sticky nav — fades in on scroll */}
      <motion.nav
        className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20 xl:px-28"
        style={{ opacity: navOpacity }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="font-mono text-xs tracking-[0.15em] text-fg-muted uppercase">
              Majid Kofia
            </span>
          </div>
          <div className="flex gap-6">
            {["Projects", "Experience", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`link-underline font-mono text-xs tracking-[0.08em] text-fg-muted hover:text-accent transition-colors ${
                  item === "Skills" ? "hidden sm:block" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      <main className="relative min-h-screen z-10">
        {/* ════════════════════════════════════════════════════════════════ */}
        {/* HERO                                                           */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 pt-36 pb-28 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="blob blob-orange" style={{ top: "-180px", left: "-200px" }} />
          <div className="blob blob-teal" style={{ top: "80px", right: "-120px" }} />
          <div className="blob blob-purple" style={{ bottom: "-80px", left: "35%" }} />

          <div className="relative max-w-6xl mx-auto">
            <Reveal delay={0.1}>
              <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-6 opacity-70">
                AI Engineer
              </p>
            </Reveal>

            <Reveal delay={0.2} y={60}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.045em] leading-[0.9]">
                Majid
                <br />
                <span className="gradient-text">Kofia</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 max-w-xl">
                <p className="text-lg sm:text-xl text-fg-muted leading-relaxed">
                  I build and deploy end-to-end AI-powered applications —
                  from WhatsApp chatbots to financial intelligence pipelines.
                </p>
                <p className="text-sm text-fg-dim mt-3">Jeddah, Saudi Arabia</p>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  {
                    href: "mailto:majidkofia@hotmail.com",
                    label: "Email",
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://github.com/majidmoe",
                    label: "GitHub",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.linkedin.com/in/majid-m-kofia",
                    label: "LinkedIn",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass-link inline-flex items-center gap-2 px-5 py-2.5 text-sm text-fg-muted hover:text-accent"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.icon}
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* PROJECTS                                                       */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="px-6 py-28 md:px-12 lg:px-20 xl:px-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader num="01" title="Projects" />

            <div className="grid gap-6">
              {/* ClinicalBot — Featured */}
              <Reveal>
                <TiltCard className="featured-card p-7 sm:p-9 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em]">ClinicalBot</h3>
                        <span className="font-mono text-[0.6rem] tracking-[0.15em] text-teal bg-teal/10 px-2.5 py-1 rounded-full uppercase">
                          Production
                        </span>
                      </div>
                      <p className="text-fg-muted text-sm">WhatsApp AI Assistant</p>
                    </div>
                    <span className="font-mono text-xs text-fg-dim tracking-wider shrink-0">Feb 2026 –</span>
                  </div>
                  <div className="space-y-3 text-fg-muted text-sm leading-relaxed mb-8 max-w-3xl">
                    <p>
                      Production WhatsApp chatbot for clinical report management using
                      Gemini 2.5 Flash with function calling for zero-hard-coded intent detection.
                    </p>
                    <p>
                      RAG pipeline with pgvector and Supabase for semantic search across
                      medical document chunks. Multi-node n8n workflow for message parsing,
                      AI processing, and response routing. Deployed as Dockerized microservices.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Gemini 2.5 Flash", "Function Calling", "RAG", "pgvector", "Supabase", "n8n", "Docker", "WhatsApp API"].map((t) => (
                      <motion.span key={t} className="tech-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>

              {/* Newsletter */}
              <Reveal delay={0.1}>
                <TiltCard className="glass-card p-7 sm:p-9 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-1">
                        Automated Market Intelligence Newsletter
                      </h3>
                      <p className="text-fg-muted text-sm">AI-Powered Financial Brief</p>
                    </div>
                    <span className="font-mono text-xs text-fg-dim tracking-wider shrink-0">Feb 2026 –</span>
                  </div>
                  <div className="space-y-3 text-fg-muted text-sm leading-relaxed mb-8 max-w-3xl">
                    <p>
                      Automated weekly newsletter that scrapes Saudi financial news from
                      multiple sources, classifies articles by portfolio relevance using
                      Gemini AI, and generates analyst-grade equity research summaries.
                    </p>
                    <p>
                      AI-driven classification with seasonal context awareness (Ramadan, Hajj,
                      earnings seasons) to surface indirect market impacts. Premium mobile-ready
                      HTML email with live TASI index and Brent crude data.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Gemini 2.5 Flash", "n8n", "RSS Scraping", "Gmail API", "HTML Email"].map((t) => (
                      <motion.span key={t} className="tech-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>

              {/* PDF Rebrander */}
              <Reveal delay={0.1}>
                <TiltCard className="glass-card p-7 sm:p-9 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-1">PDF Rebrander</h3>
                      <p className="text-fg-muted text-sm">Automated Document Processing</p>
                    </div>
                    <span className="font-mono text-xs text-fg-dim tracking-wider shrink-0">Feb – Mar 2026</span>
                  </div>
                  <div className="space-y-3 text-fg-muted text-sm leading-relaxed mb-8 max-w-3xl">
                    <p>
                      Express microservice using Gemini Vision API to detect branding areas
                      (headers, footers, logos) in uploaded PDFs. Automated overlay generation
                      with pdf-lib, replacing detected branding with custom assets. Containerized
                      with Docker, integrated into ClinicalBot pipeline.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Gemini Vision API", "Express", "pdf-lib", "Docker"].map((t) => (
                      <motion.span key={t} className="tech-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>

              {/* Two-column smaller projects */}
              <div className="grid md:grid-cols-2 gap-6">
                <Reveal delay={0}>
                  <TiltCard className="glass-card p-6 sm:p-8 h-full">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-[-0.01em] mb-1">
                          Football Analytics Platform
                        </h3>
                        <p className="text-fg-muted text-sm">Saudi AI League</p>
                      </div>
                      <span className="font-mono text-xs text-fg-dim tracking-wider shrink-0">APR 2025</span>
                    </div>
                    <p className="text-fg-muted text-sm leading-relaxed mb-6">
                      End-to-end football analytics combining YOLOv8 for real-time
                      player/ball detection and tracking with LLaMA 3 for tactical
                      insights and automated match reports. Deployed via Streamlit.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["YOLOv8", "LLaMA 3", "Streamlit", "Python"].map((t) => (
                        <motion.span key={t} className="tech-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>

                <Reveal delay={0.1}>
                  <TiltCard className="glass-card p-6 sm:p-8 h-full">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-[-0.01em] mb-1">
                          Player Recommendation System
                        </h3>
                        <p className="text-fg-muted text-sm">Senior Project</p>
                      </div>
                      <span className="font-mono text-xs text-fg-dim tracking-wider shrink-0">2024–25</span>
                    </div>
                    <p className="text-fg-muted text-sm leading-relaxed mb-6">
                      Recommendation engine using cosine similarity on FIFA player
                      attributes (rating, position, weak foot) to deliver top-5 suggestions.
                      Optimized preprocessing and similarity computation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Cosine Similarity", "pandas"].map((t) => (
                        <motion.span key={t} className="tech-tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* EXPERIENCE                                                     */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="px-6 py-28 md:px-12 lg:px-20 xl:px-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader num="02" title="Experience" />

            <div className="space-y-10 max-w-3xl">
              <Reveal>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center pt-1.5">
                    <div className="timeline-dot" />
                    <div className="w-px flex-1 mt-3" style={{ background: "linear-gradient(180deg, rgba(255,107,43,0.2), transparent)" }} />
                  </div>
                  <div className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8 mb-1">
                      <h3 className="text-lg font-bold">Aramco</h3>
                      <span className="font-mono text-xs text-fg-dim tracking-wider">SEP – OCT 2024</span>
                    </div>
                    <p className="text-accent text-sm mb-5 opacity-65">Data Intelligence Intern</p>
                    <ul className="space-y-2.5 text-fg-muted text-sm leading-relaxed">
                      {[
                        "Automated resume processing by building a PDF-to-structured-CSV pipeline, reducing manual data entry time",
                        "Engineered prompts for LLM-powered HR systems, improving response accuracy for candidate screening",
                        "Developed unsupervised topic model to cluster and surface key themes from employee feedback data",
                        "Optimized batch processing workflows with GPU parallelization for faster model inference",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-accent select-none mt-0.5 opacity-30 text-xs">&#9656;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center pt-1.5">
                    <div className="timeline-dot" />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8 mb-1">
                      <h3 className="text-lg font-bold">Microland Limited</h3>
                      <span className="font-mono text-xs text-fg-dim tracking-wider">JUL – AUG 2024</span>
                    </div>
                    <p className="text-accent text-sm mb-5 opacity-65">IT Support Engineer</p>
                    <ul className="space-y-2.5 text-fg-muted text-sm leading-relaxed">
                      {[
                        "Resolved IT support tickets across multiple departments, managing escalation workflows",
                        "Configured and imaged PCs with secure enterprise setups; troubleshot network infrastructure including NOC-switch connections",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-accent select-none mt-0.5 opacity-30 text-xs">&#9656;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* SKILLS                                                         */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="skills" className="px-6 py-28 md:px-12 lg:px-20 xl:px-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader num="03" title="Skills" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
                { label: "AI / ML", items: ["Gemini API", "LLaMA", "YOLOv8", "TensorFlow", "NLP", "RAG", "pgvector"] },
                { label: "Backend", items: ["Node.js", "Express", "Next.js", "REST APIs"] },
                { label: "Data", items: ["PostgreSQL", "Supabase", "pandas"] },
                { label: "Infrastructure", items: ["Docker", "n8n", "Vercel", "Linux"] },
                { label: "APIs", items: ["WhatsApp Business API", "Gmail API"] },
              ].map((cat, i) => (
                <Reveal key={cat.label} delay={i * 0.05}>
                  <motion.div
                    className="skill-card h-full"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-mono text-[0.65rem] tracking-[0.15em] text-accent uppercase mb-4 opacity-50">
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s) => (
                        <motion.span key={s} className="tech-tag" whileHover={{ scale: 1.08 }}>{s}</motion.span>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* EDUCATION                                                      */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-28 md:px-12 lg:px-20 xl:px-28">
          <div className="max-w-6xl mx-auto">
            <SectionHeader num="04" title="Education" />

            <Reveal>
              <div className="max-w-3xl">
                <TiltCard className="glass-card p-7 sm:p-9">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold">University of Jeddah</h3>
                    <span className="font-mono text-xs text-fg-dim tracking-wider">2020 – 2025</span>
                  </div>
                  <p className="text-accent text-sm mb-5 opacity-65">
                    Bachelor of Science in Artificial Intelligence
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-fg-muted">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[0.65rem] text-accent opacity-45">GPA</span>
                      <span className="text-foreground font-semibold">3.8 / 5.0</span>
                    </div>
                    <div className="w-px h-4" style={{ background: "rgba(255,107,43,0.15)" }} />
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-mono text-[0.65rem] text-accent opacity-45">LANG</span>
                      <span>Arabic (Native)</span>
                      <span className="text-fg-dim">·</span>
                      <span>English (IELTS 6.5 / B2)</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* CONTACT                                                        */}
        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="relative px-6 pt-28 pb-36 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="blob blob-orange" style={{ bottom: "-120px", right: "-80px", opacity: 0.5 }} />

          <div className="max-w-6xl mx-auto relative">
            <SectionHeader num="05" title="Get in Touch" />

            <Reveal>
              <div className="max-w-xl">
                <p className="text-fg-muted text-lg leading-relaxed mb-10">
                  Interested in working together or have a project in mind?
                  <br />
                  I&apos;m open to opportunities and collaborations.
                </p>

                <motion.a
                  href="mailto:majidkofia@hotmail.com"
                  className="cta-btn inline-flex items-center justify-center gap-3 px-8 py-4 text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  majidkofia@hotmail.com
                </motion.a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="gradient-border-top px-6 py-8 md:px-12 lg:px-20 xl:px-28">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-fg-dim">
              &copy; {new Date().getFullYear()} Majid Kofia
            </span>
            <div className="flex gap-6">
              <a href="https://github.com/majidmoe" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-fg-dim hover:text-accent transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/majid-m-kofia" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-fg-dim hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
