import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import "./cv.css";

export const metadata: Metadata = {
  title: "Majid Kofia — CV",
};

export default function CVPage() {
  return (
    <div className="cv-page">
      <PrintButton />
      <div className="cv-paper">

        {/* ── Header ── */}
        <div className="cv-header">
          <div className="cv-header-left">
            <h1>Majid Kofia</h1>
            <div className="cv-title">AI Engineer</div>
          </div>
          <div className="cv-header-right">
            majidkofia@hotmail.com<br />
            +966-505-697420<br />
            Jeddah, Saudi Arabia<br />
            <a href="https://github.com/majidmoe">github.com/majidmoe</a><br />
            <a href="https://www.linkedin.com/in/majid-m-kofia">linkedin.com/in/majid-m-kofia</a>
          </div>
        </div>

        {/* ── Summary ── */}
        <div className="cv-section">
          <div className="cv-section-title">Summary</div>
          <p className="cv-summary">
            AI engineer who designs and ships production-ready intelligent systems — LLMs, RAG pipelines, computer vision, API integrations, and containerized deployment.
          </p>
        </div>

        {/* ── Technical Skills ── */}
        <div className="cv-section">
          <div className="cv-section-title">Technical Skills</div>
          <div className="cv-skills-grid">
            <span className="cv-label">Languages</span>
            <span className="cv-value">Python, TypeScript, JavaScript, SQL</span>
            <span className="cv-label">AI / ML</span>
            <span className="cv-value">Gemini API, LLaMA, YOLOv8, TensorFlow, NLP, RAG, pgvector</span>
            <span className="cv-label">Backend</span>
            <span className="cv-value">Node.js, Express, Next.js (App Router), REST APIs</span>
            <span className="cv-label">Data</span>
            <span className="cv-value">PostgreSQL, Supabase, pandas, data pipelines</span>
            <span className="cv-label">Infrastructure</span>
            <span className="cv-value">Docker, n8n workflow automation, Vercel, Linux</span>
            <span className="cv-label">APIs</span>
            <span className="cv-value">WhatsApp Business API, Gmail API, OpenAI-compatible endpoints</span>
          </div>
        </div>

        {/* ── Projects ── */}
        <div className="cv-section">
          <div className="cv-section-title">Projects</div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <h3>ClinicalBot — WhatsApp AI Assistant</h3>
              <span className="cv-date">FEB 2026 –</span>
            </div>
            <div className="cv-entry-tech">Gemini 2.5 Flash · Function Calling · RAG · pgvector · Supabase · n8n · Docker · WhatsApp API</div>
            <ul>
              <li>Built a production WhatsApp chatbot for clinical report management using Gemini 2.5 Flash with function calling for zero-hard-coded intent detection</li>
              <li>Implemented a RAG pipeline with pgvector and Supabase for semantic search across medical document chunks</li>
              <li>Designed multi-node n8n workflow for message parsing, AI processing, and response routing; deployed as Dockerized microservices</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <h3>Automated Market Intelligence Newsletter</h3>
              <span className="cv-date">FEB 2026 –</span>
            </div>
            <div className="cv-entry-tech">Gemini 2.5 Flash · n8n · RSS/Web Scraping · Gmail API · HTML Email</div>
            <ul>
              <li>Built an automated weekly newsletter that scrapes Saudi financial news, classifies articles by portfolio relevance using Gemini AI, and generates analyst-grade equity research summaries</li>
              <li>AI-driven news classification with seasonal context awareness (Ramadan, Hajj, earnings seasons) to surface indirect market impacts</li>
              <li>Premium mobile-ready HTML email with live TASI index and Brent crude data; scheduled n8n workflow for end-to-end delivery</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <h3>PDF Rebrander — Automated Document Processing</h3>
              <span className="cv-date">FEB – MAR 2026</span>
            </div>
            <div className="cv-entry-tech">Gemini Vision API · Express · pdf-lib · Docker</div>
            <ul>
              <li>Express microservice using Gemini Vision API to detect branding areas in PDFs and automate overlay generation with pdf-lib</li>
              <li>Containerized with Docker; integrated into ClinicalBot pipeline for end-to-end document automation</li>
            </ul>
          </div>

          <div className="cv-two-col">
            <div className="cv-entry">
              <div className="cv-entry-header">
                <h3>Football Analytics Platform</h3>
                <span className="cv-date">APR 2025</span>
              </div>
              <div className="cv-entry-role">Saudi AI League</div>
              <div className="cv-entry-tech">YOLOv8 · LLaMA 3 · Streamlit · Python</div>
              <ul>
                <li>End-to-end analytics combining YOLOv8 for real-time player/ball detection with LLaMA 3 for tactical insights and automated match reports</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <h3>Player Recommendation System</h3>
                <span className="cv-date">2024 – 2025</span>
              </div>
              <div className="cv-entry-role">Senior Project</div>
              <div className="cv-entry-tech">Python · Cosine Similarity · pandas</div>
              <ul>
                <li>Recommendation engine using cosine similarity on FIFA player attributes to deliver top-5 suggestions with optimized preprocessing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Experience ── */}
        <div className="cv-section">
          <div className="cv-section-title">Professional Experience</div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <h3>Aramco</h3>
              <span className="cv-date">SEP – OCT 2024</span>
            </div>
            <div className="cv-entry-role">Data Intelligence Intern</div>
            <ul>
              <li>Automated resume processing by building a PDF-to-structured-CSV pipeline, reducing manual data entry time</li>
              <li>Engineered prompts for LLM-powered HR systems, improving response accuracy for candidate screening</li>
              <li>Developed unsupervised topic model to cluster and surface key themes from employee feedback data</li>
              <li>Optimized batch processing workflows with GPU parallelization for faster model inference</li>
            </ul>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <h3>Microland Limited</h3>
              <span className="cv-date">JUL – AUG 2024</span>
            </div>
            <div className="cv-entry-role">IT Support Engineer</div>
            <ul>
              <li>Resolved IT support tickets across multiple departments, managing escalation workflows</li>
              <li>Configured and imaged PCs with secure enterprise setups; troubleshot network infrastructure including NOC-switch connections</li>
            </ul>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="cv-section">
          <div className="cv-section-title">Education</div>
          <div className="cv-edu-row">
            <div>
              <strong>BSc Artificial Intelligence</strong> — University of Jeddah · Arabic (Native) · English (IELTS 6.5)
            </div>
            <span className="cv-gpa">2020 – 2025 · GPA 3.8/5</span>
          </div>
        </div>

        <div className="cv-footer-bar" />
      </div>
    </div>
  );
}
