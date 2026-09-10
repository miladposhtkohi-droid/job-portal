import { storyblokEditable } from "@storyblok/react/rsc";
import { getDatasourceEntries } from "@/lib/storyblok";

export default async function DepartmentFilter({
  blok,
  department,
  searchTerm,
  searchParams,
}) {
  const currentQ = searchTerm ?? searchParams?.q ?? "";
  const currentDept = department ?? searchParams?.department ?? "";

  const datasourceSlug = blok?.datasource || "job-departments";
  const departments = await getDatasourceEntries(datasourceSlug);

  const labelText = blok?.label || "Välj avdelning";
  const allLabel = blok?.all_label || "Alla avdelningar";
  const buttonText = blok?.button_text || "Filtrera";

  return (
    <div {...(blok ? storyblokEditable(blok) : {})} className="w-full sm:w-auto">
      <form
        method="GET"
        action="/jobs"
        className="flex flex-col sm:flex-row gap-2.5 items-center"
      >
        {currentQ && <input type="hidden" name="q" value={currentQ} />}

        <div className="w-full sm:w-60 relative">
          <label htmlFor="department" className="sr-only">
            {labelText}
          </label>
          <select
            id="department"
            name="department"
            defaultValue={currentDept}
            className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              {allLabel}
            </option>
            {departments.map((entry) => (
              <option
                key={entry.value || entry.id}
                value={entry.value}
                className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white"
              >
                {entry.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700 dark:text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-sm font-semibold border border-slate-300 dark:border-white/10 transition-colors shrink-0"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
