import React from "react";

/**
 * HandDrawnUnderline:
 * Subtle organic curved single-line underline for headings
 */
export function HandDrawnUnderline({ className = "text-ember w-32 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 13.5C24.3 6.8 58.1 3.2 88.5 4.8C114.9 6.2 143.2 10.9 158 11.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14.8C42.5 9.2 92.4 8.5 142 12.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
}

/**
 * EmberFlourish:
 * Delicate hand-sketched botanic/ember flourish used beside section headers
 */
export function EmberFlourish({ className = "text-gold w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 2.5C16.8 7.2 19.5 10.4 23.5 12C18.8 13.5 16.5 17.5 16 22.5C15.2 17.5 12.5 13.5 8.2 12C12.8 10.4 15.2 7.2 16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="12" r="1.2" fill="currentColor" />
      <path
        d="M4 12C9 12 12 12 12 12M20 12C20 12 23 12 28 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

/**
 * OakLeafSprig:
 * Minimal hand-drawn sprig motif for chapter breaks
 */
export function OakLeafSprig({ className = "text-ember/70 w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 34C14 28 22 20 28 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 22C17 18 19 14 24 15C25 19 23 22 19 22Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M14 27C11 25 10 21 14 19C17 21 17 25 14 27Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M26 12C28 9 32 9 33 13C30 15 27 15 26 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * PrintedDottedDivider:
 * Vintage menu style divider with centered diamond
 */
export function PrintedDottedDivider({ className = "text-border-theme my-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 w-full max-w-xs mx-auto ${className}`}>
      <div className="h-px flex-1 border-b border-dashed border-current opacity-40" />
      <div className="w-2 h-2 rotate-45 border border-current opacity-60" />
      <div className="h-px flex-1 border-b border-dashed border-current opacity-40" />
    </div>
  );
}
