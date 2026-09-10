import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Hero({ blok }) {
  if (!blok) return null;

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative px-4 sm:px-6 py-20 md:py-28 max-w-5xl mx-auto text-center"
    >
      <div className="portal-card p-8 sm:p-14 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          {blok.eyebrow && (
            <div className="inline-block mb-4">
              <span className="portal-pill py-1 px-3 text-xs tracking-wider uppercase">
                {blok.eyebrow}
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {blok.title || "Hitta din nästa karriärmöjlighet"}
          </h1>

          {blok.subtitle && (
            <p className="text-base sm:text-xl text-slate-900 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
              {blok.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={blok.button_url || "/jobs"}
              className="btn-accent text-base px-7 py-3"
            >
              {blok.button_text || "Utforska lediga jobb"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
