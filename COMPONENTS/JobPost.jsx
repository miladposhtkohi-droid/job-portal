import Link from "next/link";
import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import ShareButton from "@/COMPONENTS/ShareButton";

export default function JobPost({ blok, departmentLabel }) {
  if (!blok) return null;

  const { title, summary, location, department, publishedAt, content } = blok;
  const renderedContent = content ? renderRichText(content) : "";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      {...storyblokEditable(blok)}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12"
    >
      {/* Back button */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Tillbaka till alla tjänster
      </Link>

      {/* Main Job Card */}
      <div className="portal-card p-6 sm:p-10 mb-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          {department && (
            <span className="portal-pill text-sm py-1 px-3">
              {departmentLabel || department}
            </span>
          )}
          {location && (
            <span className="portal-pill-secondary text-sm py-1 px-3">
              <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          )}
          {formattedDate && (
            <span className="text-xs text-slate-700 dark:text-slate-400 flex items-center gap-1.5 ml-auto font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Publicerad {formattedDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-6">
          {title}
        </h1>

        {/* Summary */}
        {summary && (
          <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-slate-900/80 border-l-4 border-emerald-500 border-y border-r border-slate-200 dark:border-white/5 mb-8">
            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-200 leading-relaxed italic font-medium">
              {summary}
            </p>
          </div>
        )}

        {/* Actions in header */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
          <a
            href="#apply"
            className="btn-accent"
          >
            Ansök nu
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <ShareButton />
        </div>
      </div>

      {/* Description / Richtext content */}
      {renderedContent && (
        <div className="portal-card p-6 sm:p-10 mb-8 prose-portal">
          <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
        </div>
      )}

      {/* Apply Section */}
      <div id="apply" className="portal-card p-8 sm:p-10 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">
            Låter detta som din nästa utmaning?
          </h2>
          <p className="text-slate-800 dark:text-slate-300 text-sm mb-6 leading-relaxed">
            Vi ser fram emot att höra från dig. Klicka på knappen nedan för att skicka in din ansökan med CV och personligt brev.
          </p>
          <a
            href="mailto:jobb@example.com?subject=Ansökan:%20"
            className="btn-accent text-base px-8 py-3"
          >
            Skicka din ansökan
          </a>
        </div>
      </div>
    </article>
  );
}
