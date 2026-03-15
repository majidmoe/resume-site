import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import "./cv.css";

export const metadata: Metadata = {
  title: "Majid Kofia — CV",
};

export default function CVPage() {
  return (
    <>
      <div className="cv-page min-h-screen">
        <PrintButton />

        <div className="max-w-[800px] mx-auto px-8 py-10 print:p-0">
          {/* ── Header ── */}
          <header className="mb-1">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--ink)" }}>
              Majid Kofia
            </h1>
            <p className="text-base mt-1" style={{ color: "var(--ink-muted)" }}>
              AI Engineer
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm" style={{ color: "var(--ink-dim)" }}>
              <span>Jeddah, Saudi Arabia</span>
              <span className="hidden print:inline" aria-hidden>·</span>
              <a href="mailto:majidkofia@hotmail.com" style={{ color: "var(--link)" }}>
                majidkofia@hotmail.com
              </a>
              <span className="hidden print:inline" aria-hidden>·</span>
              <a href="https://github.com/majidmoe" style={{ color: "var(--link)" }}>
                github.com/majidmoe
              </a>
              <span className="hidden print:inline" aria-hidden>·</span>
              <a href="https://www.linkedin.com/in/majid-m-kofia" style={{ color: "var(--link)" }}>
                linkedin.com/in/majid-m-kofia
              </a>
            </div>
          </header>

          {/* ── Objective ── */}
          <section className="mt-5 mb-6">
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              AI engineer with production experience building end-to-end intelligent systems — from WhatsApp chatbots to automated financial intelligence pipelines. Seeking to combine deep technical expertise with venture investing to evaluate and support the next generation of Saudi tech startups.
            </p>
          </section>

          <Hr />

          {/* ── Projects ── */}
          <Section title="Projects">
            <Project
              name="ClinicalBot"
              subtitle="Production WhatsApp AI Assistant"
              date="Feb 2026 –"
              bullets={[
                "Built a production WhatsApp chatbot for clinical report management using Gemini 2.5 Flash with function calling for zero-hard-coded intent detection",
                "Engineered RAG pipeline with pgvector and Supabase for semantic search across medical document chunks",
                "Designed multi-node n8n workflow handling message parsing, AI processing, and response routing — deployed as Dockerized microservices",
              ]}
              tags={["Gemini 2.5 Flash", "Function Calling", "RAG", "pgvector", "Supabase", "n8n", "Docker", "WhatsApp API"]}
            />
            <Project
              name="Automated Market Intelligence Newsletter"
              subtitle="AI-Powered Saudi Financial Brief"
              date="Feb 2026 –"
              bullets={[
                "Automated weekly newsletter scraping Saudi financial news from multiple sources, classifying articles by portfolio relevance using Gemini AI",
                "Built seasonal context awareness (Ramadan, Hajj, earnings seasons) to surface indirect market impacts",
                "Generates analyst-grade equity research summaries with live TASI index and Brent crude data in premium HTML email",
              ]}
              tags={["Gemini 2.5 Flash", "n8n", "RSS Scraping", "Gmail API", "HTML Email"]}
            />
            <Project
              name="PDF Rebrander"
              subtitle="Automated Document Processing Microservice"
              date="Feb – Mar 2026"
              bullets={[
                "Built Express microservice using Gemini Vision API to detect branding areas in PDFs and auto-overlay custom assets with pdf-lib",
                "Containerized with Docker, integrated into ClinicalBot pipeline for automated clinical report rebranding",
              ]}
              tags={["Gemini Vision API", "Express", "pdf-lib", "Docker"]}
            />
            <Project
              name="Football Analytics Platform"
              subtitle="Saudi AI League"
              date="Apr 2025"
              bullets={[
                "End-to-end analytics combining YOLOv8 for real-time player/ball detection with LLaMA 3 for tactical insights and automated match reports",
              ]}
              tags={["YOLOv8", "LLaMA 3", "Streamlit", "Python"]}
            />
            <Project
              name="Player Recommendation System"
              subtitle="Senior Capstone Project"
              date="2024 – 2025"
              bullets={[
                "Recommendation engine using cosine similarity on FIFA player attributes to deliver top-5 player suggestions with optimized preprocessing",
              ]}
              tags={["Python", "Cosine Similarity", "pandas"]}
            />
          </Section>

          <Hr />

          {/* ── Experience ── */}
          <Section title="Experience">
            <Experience
              company="Aramco"
              role="Data Intelligence Intern"
              date="Sep – Oct 2024"
              bullets={[
                "Automated resume processing by building a PDF-to-structured-CSV pipeline, reducing manual data entry time",
                "Engineered prompts for LLM-powered HR systems, improving response accuracy for candidate screening",
                "Developed unsupervised topic model to cluster and surface key themes from employee feedback data",
                "Optimized batch processing workflows with GPU parallelization for faster model inference",
              ]}
            />
            <Experience
              company="Microland Limited"
              role="IT Support Engineer"
              date="Jul – Aug 2024"
              bullets={[
                "Resolved IT support tickets across multiple departments, managing escalation workflows",
                "Configured and imaged PCs with secure enterprise setups; troubleshot network infrastructure including NOC-switch connections",
              ]}
            />
          </Section>

          <Hr />

          {/* ── Education ── */}
          <Section title="Education">
            <div className="mb-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
                  University of Jeddah
                </h3>
                <span className="text-xs shrink-0" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-geist-mono)" }}>
                  2020 – 2025
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                Bachelor of Science in Artificial Intelligence — GPA 3.8 / 5.0
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--ink-dim)" }}>
                Arabic (Native) · English (IELTS 6.5 / B2)
              </p>
            </div>
          </Section>

          <Hr />

          {/* ── Skills ── */}
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <SkillRow label="Languages" items="Python, TypeScript, JavaScript, SQL" />
              <SkillRow label="AI / ML" items="Gemini API, LLaMA, YOLOv8, TensorFlow, NLP, RAG, pgvector" />
              <SkillRow label="Backend" items="Node.js, Express, Next.js, REST APIs" />
              <SkillRow label="Data" items="PostgreSQL, Supabase, pandas" />
              <SkillRow label="Infrastructure" items="Docker, n8n, Vercel, Linux" />
              <SkillRow label="APIs" items="WhatsApp Business API, Gmail API" />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* Components                                                     */
/* ═══════════════════════════════════════════════════════════════ */

function Hr() {
  return <hr className="my-4 border-0 h-px" style={{ background: "var(--border)" }} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-2">
      <h2
        className="text-xs font-bold tracking-widest uppercase mb-3"
        style={{ color: "var(--ink-dim)", letterSpacing: "0.12em" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Project({
  name,
  subtitle,
  date,
  bullets,
  tags,
}: {
  name: string;
  subtitle: string;
  date: string;
  bullets: string[];
  tags: string[];
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm inline" style={{ color: "var(--ink)" }}>
            {name}
          </h3>
          <span className="text-sm ml-2" style={{ color: "var(--ink-dim)" }}>
            — {subtitle}
          </span>
        </div>
        <span className="text-xs shrink-0" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-geist-mono)" }}>
          {date}
        </span>
      </div>
      <ul className="mt-1.5 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm leading-snug flex gap-2" style={{ color: "var(--ink-muted)" }}>
            <span className="select-none mt-0.5" style={{ color: "var(--ink-dim)" }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[0.65rem] px-2 py-0.5 rounded-full"
            style={{
              background: "var(--bg-tag)",
              color: "var(--ink-dim)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience({
  company,
  role,
  date,
  bullets,
}: {
  company: string;
  role: string;
  date: string;
  bullets: string[];
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          {company}
        </h3>
        <span className="text-xs shrink-0" style={{ color: "var(--ink-dim)", fontFamily: "var(--font-geist-mono)" }}>
          {date}
        </span>
      </div>
      <p className="text-sm" style={{ color: "var(--ink-muted)" }}>{role}</p>
      <ul className="mt-1.5 space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm leading-snug flex gap-2" style={{ color: "var(--ink-muted)" }}>
            <span className="select-none mt-0.5" style={{ color: "var(--ink-dim)" }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillRow({ label, items }: { label: string; items: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium shrink-0 w-24" style={{ color: "var(--ink)" }}>
        {label}
      </span>
      <span style={{ color: "var(--ink-muted)" }}>{items}</span>
    </div>
  );
}
