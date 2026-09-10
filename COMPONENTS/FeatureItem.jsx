import { storyblokEditable } from "@storyblok/react/rsc";

export default function FeatureItem({ blok }) {
  if (!blok) return null;

  return (
    <div {...storyblokEditable(blok)} className="portal-card p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{blok.title}</h3>
      {blok.text && <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">{blok.text}</p>}
    </div>
  );
}
