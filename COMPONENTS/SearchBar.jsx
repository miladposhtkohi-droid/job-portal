import { storyblokEditable } from "@storyblok/react/rsc";

export default function SearchBar({ blok, department, searchTerm, searchParams }) {
  const currentQ = searchTerm ?? searchParams?.q ?? "";
  const currentDept = department ?? searchParams?.department ?? "";

  const labelText = blok?.label || "Sök jobb";
  const placeholderText = blok?.placeholder || "Sök jobb, titel eller nyckelord...";
  const buttonText = blok?.button_text || "Sök";

  return (
    <div {...(blok ? storyblokEditable(blok) : {})} className="flex-1 w-full">
      <form
        method="GET"
        action="/jobs"
        className="flex flex-col sm:flex-row gap-2.5 items-center w-full"
      >
        {currentDept && <input type="hidden" name="department" value={currentDept} />}

        <div className="relative flex-1 w-full">
          <label htmlFor="q" className="sr-only">
            {labelText}
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700 dark:text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            id="q"
            name="q"
            defaultValue={currentQ}
            placeholder={placeholderText}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white placeholder-slate-600 dark:placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
