"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print fixed top-4 right-4 z-50 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
    >
      Save as PDF
    </button>
  );
}
