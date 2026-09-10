import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { getJobs, getDatasourceMap } from "@/lib/storyblok";
import JobCard from "@/COMPONENTS/JobCard";

export default async function JobsList({ blok, department, searchTerm, searchParams }) {
  const activeDept = department || searchParams?.department || "";
  const activeQuery = searchTerm || searchParams?.q || "";

  const [jobs, departmentMap] = await Promise.all([
    getJobs({ department: activeDept, searchTerm: activeQuery }),
    getDatasourceMap("job-departments"),
  ]);

  const hasFilters = Boolean(activeDept || activeQuery);

  return (
    <section
      {...(blok ? storyblokEditable(blok) : {})}
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
    >
      {/* Header if defined on blok */}
      {(blok?.heading || blok?.eyebrow || blok?.intro) && (
        <div className="mb-8 text-center md:text-left">
          {blok?.eyebrow && (
            <p className="text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
              {blok.eyebrow}
            </p>
          )}
          {blok?.heading && (
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-3">
              {blok.heading}
            </h2>
          )}
          {blok?.intro && (
            <p className="text-slate-900 dark:text-slate-300 max-w-2xl text-base font-medium">{blok.intro}</p>
          )}
        </div>
      )}

      {/* Results stats */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-900 dark:text-slate-400 font-semibold">
          Visar <span className="text-slate-950 dark:text-white font-bold">{jobs.length}</span>{" "}
          {jobs.length === 1 ? "ledig tjänst" : "lediga tjänster"}
          {hasFilters && " för din sökning"}
        </p>

        {hasFilters && (
          <Link
            href="/jobs"
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Återställ filter
          </Link>
        )}
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="portal-card p-12 text-center my-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
            {blok?.empty_text || "Inga lediga tjänster matchade din sökning"}
          </h3>
          <p className="text-sm text-slate-900 dark:text-slate-400 max-w-md mx-auto mb-6 font-medium">
            Prova att justera dina sökord eller välj en annan avdelning för att se fler resultat.
          </p>
          {hasFilters && (
            <Link href="/jobs" className="btn-secondary">
              Rensa alla filter
            </Link>
          )}
        </div>
      ) : (
        /* Jobs Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.uuid || job.id || job.slug}
              story={job}
              departmentLabel={departmentMap.get(job.content?.department)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
