"use client";

export default function PrintButton() {
  return (
    <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
      <a
        href="/Majid_Kofia_CV.pdf"
        download="Majid_Kofia_CV.pdf"
        className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download PDF
      </a>
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-neutral-700 text-white text-sm rounded-lg hover:bg-neutral-600 transition-colors cursor-pointer"
      >
        Print
      </button>
    </div>
  );
}
