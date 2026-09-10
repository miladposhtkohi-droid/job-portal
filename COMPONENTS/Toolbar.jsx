import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import { getDatasourceEntries } from "@/lib/storyblok";
import Link from "next/link";

export default async function Toolbar({ blok, department, searchTerm, searchParams }) {
  const currentQ = searchTerm ?? searchParams?.q ?? "";
  const currentDept = department ?? searchParams?.department ?? "";

  const nestedBlocks = blok?.blocks || [];
  const departments = nestedBlocks.length === 0 ? await getDatasourceEntries("job-departments") : [];
  const hasActiveFilters = Boolean(currentQ || currentDept);

  return (
    <div
      {...(blok ? storyblokEditable(blok) : {})}
      className="max-w-6xl mx-auto px-4 sm:px-6 my-8"
    >
      <div className="portal-card p-4 sm:p-6">
        {blok?.heading && (
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {blok.heading}
          </h2>
        )}

        {nestedBlocks.length > 0 ? (
          /* Render nested Storyblok blocks */
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 items-stretch sm:items-center">
              {nestedBlocks.map((nestedBlok) => (
                <StoryblokServerComponent
                  key={nestedBlok._uid}
                  blok={nestedBlok}
                  department={currentDept}
                  searchTerm={currentQ}
                  searchParams={searchParams}
                />
              ))}
            </div>

            {hasActiveFilters && (
              <Link
                href="/jobs"
                className="text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors self-end md:self-center px-2 py-1"
              >
                Rensa sökning
              </Link>
            )}
          </div>
        ) : (
          /* Standalone Toolbar form */
          <form
            action="/jobs"
            method="GET"
            className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <label htmlFor="toolbar-q" className="sr-only">
                Sök jobb
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 dark:text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                id="toolbar-q"
                name="q"
                defaultValue={currentQ}
                placeholder="Sök tjänst, roll eller nyckelord..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>

            {/* Department Select */}
            <div className="w-full md:w-64 relative">
              <label htmlFor="toolbar-dept" className="sr-only">
                Filtrera avdelning
              </label>
              <select
                id="toolbar-dept"
                name="department"
                defaultValue={currentDept}
                className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">
                  Alla avdelningar
                </option>
                {departments.map((dept) => (
                  <option
                    key={dept.value || dept.id}
                    value={dept.value}
                    className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white"
                  >
                    {dept.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600 dark:text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn-accent text-sm whitespace-nowrap"
            >
              Hitta jobb
            </button>

            {hasActiveFilters && (
              <Link
                href="/jobs"
                className="btn-secondary text-sm whitespace-nowrap"
              >
                Rensa
              </Link>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
