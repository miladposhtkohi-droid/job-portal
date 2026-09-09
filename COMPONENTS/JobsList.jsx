import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
import { getStoryblokApi } from "@/lib/storyblok";

export default async function JobsList({ blok, searchParams }) {
  const storyblokApi = getStoryblokApi();
  let jobs = [];

  const q = searchParams?.q || "";
  const department = searchParams?.department || "";

  // Bygg API-parametrar för Storyblok
  const apiOptions = {
    version: "draft",
    starts_with: "jobs/",
    content_type: "job-post",
    is_startpage: false,
  };

  // Om sökterm finns, skicka med search_term
  if (q) {
    apiOptions.search_term = q;
  }

  // Om avdelning finns, skicka med filter_query
  if (department) {
    apiOptions.filter_query = {
      department: {
        in: department,
      },
    };
  }

  try {
    const response = await storyblokApi.get("cdn/stories", apiOptions);
    jobs = response.data?.stories || [];
  } catch (error) {
    console.error("Fel vid hämtning av jobb i JobsList:", error);
  }

  return (
    <section
      {...(blok ? storyblokEditable(blok) : {})}
      className="max-w-6xl mx-auto p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="col-span-full text-center text-zinc-600 dark:text-zinc-400 py-8">
            Inga lediga jobb hittades som matchar dina sökkriterier.
          </p>
        ) : (
          jobs.map((job) => {
            const { title, summary, department: jobDepartment, location } = job.content || {};
            const jobTitle = title || job.name;
            const slug = job.slug;

            return (
              <div
                key={job.uuid || job.id || slug}
                className="flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-shadow hover:shadow-lg"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {jobDepartment && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {jobDepartment}
                      </span>
                    )}
                    {location && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        📍 {location}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    {jobTitle}
                  </h2>

                  {summary && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                      {summary}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                  <Link
                    href={`/jobs/${slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Läs mer &rarr;
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
