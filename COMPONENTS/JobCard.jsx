import Link from "next/link";

export default function JobCard({ story, departmentLabel }) {
  const content = story.content || {};
  const { title, summary, location, department, publishedAt } = content;
  const jobTitle = title || story.name;
  const slug = story.slug;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="portal-card portal-card-hover group flex flex-col justify-between p-6">
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          {department && (
            <span className="portal-pill">
              {departmentLabel || department}
            </span>
          )}
          {location && (
            <span className="portal-pill-secondary">
              <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          )}
          {formattedDate && (
            <span className="text-xs text-slate-600 dark:text-slate-400 ml-auto hidden sm:inline font-medium">
              {formattedDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2.5">
          <Link href={`/jobs/${slug}`} className="focus:outline-none focus:underline">
            {jobTitle}
          </Link>
        </h3>

        {/* Summary */}
        {summary && (
          <p className="text-sm text-slate-900 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4 font-medium">
            {summary}
          </p>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-700 dark:text-slate-400 font-semibold">Heltid / Tillsvidare</span>
        <Link
          href={`/jobs/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
        >
          Visa roll
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
