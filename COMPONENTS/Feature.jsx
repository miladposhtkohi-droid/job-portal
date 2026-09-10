import { storyblokEditable } from "@storyblok/react/rsc";

export default function Feature({ blok }) {
  if (!blok) return null;

  return (
    <div
      {...storyblokEditable(blok)}
      className="portal-card p-6 text-center flex flex-col items-center justify-center hover:border-emerald-500/40 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{blok.name || "Feature"}</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 font-normal">
        Utforska möjligheter och moderna verktyg som hjälper dig växa i teamet.
      </p>
    </div>
  );
}
