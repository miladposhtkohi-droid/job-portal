import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";

export default async function Toolbar({ blok, searchParams }) {
  const storyblokApi = getStoryblokApi();
  let departments = [];

  try {
    const response = await storyblokApi.get("cdn/datasource_entries", {
      datasource: "job-departments",
    });
    departments = response.data?.datasource_entries || [];
  } catch (error) {
    console.error("Kunde inte hämta datasource 'job-departments' från Storyblok:", error);
  }

  const currentQ = searchParams?.q || "";
  const currentDepartment = searchParams?.department || "";

  // Hitta dolda parametrar (om det finns andra sökparametrar än q och department)
  const extraParams = Object.entries(searchParams || {}).filter(
    ([key]) => key !== "q" && key !== "department"
  );

  return (
    <div
      {...(blok ? storyblokEditable(blok) : {})}
      className="max-w-6xl mx-auto p-4 md:p-6 my-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800"
    >
      <form action="/jobs" method="GET" className="flex flex-col md:flex-row gap-4 items-center">
        {/* Spara övriga dolda filter parametrar */}
        {extraParams.map(([key, val]) => (
          <input key={key} type="hidden" name={key} value={val || ""} />
        ))}

        {/* Sökfält för sökterm */}
        <div className="flex-1 w-full">
          <label htmlFor="q" className="sr-only">
            Sök jobb
          </label>
          <input
            type="text"
            id="q"
            name="q"
            defaultValue={currentQ}
            placeholder="Sök jobb, titel eller nyckelord..."
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown för avdelningar hämtad från Storyblok Datasource */}
        <div className="w-full md:w-64">
          <label htmlFor="department" className="sr-only">
            Välj avdelning
          </label>
          <select
            id="department"
            name="department"
            defaultValue={currentDepartment}
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Alla avdelningar</option>
            {departments.map((dept) => (
              <option key={dept.id || dept.value} value={dept.value}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Knapp för att skicka formuläret */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sök / Filtrera
        </button>
      </form>
    </div>
  );
}
