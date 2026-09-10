import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Teaser({ blok }) {
  if (!blok) return null;

  return (
    <section
      {...storyblokEditable(blok)}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center"
    >
      <div className="portal-card p-8 sm:p-14 relative overflow-hidden">
        <div className="inline-block mb-4">
          <span className="portal-pill py-1 px-3.5 text-xs font-semibold tracking-wider uppercase">
            Välkommen till portalen
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 gradient-heading">
          {blok.headline || "Hitta ditt drömjobb hos oss"}
        </h1>
        <p className="text-base sm:text-xl text-slate-900 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
          Vi söker ständigt engagerade talanger inom utveckling, design och marknadsföring. Upptäck våra öppna roller och ta nästa steg i din karriär!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/jobs" className="btn-accent text-base px-7 py-3">
            Se alla lediga jobb
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
