import { notFound } from "next/navigation";
import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getPage } from "@/lib/storyblok";
import Toolbar from "@/COMPONENTS/Toolbar";
import JobsList from "@/COMPONENTS/JobsList";

export const metadata = {
  title: "Lediga tjänster | Jobbportalen",
  description: "Se alla våra aktuella lediga tjänster och sök direkt via portalen.",
};

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams;
  const department = sp?.department || "";
  const q = sp?.q || "";

  const page = await getPage("jobs");

  if (!page) {
    // Fallback if the jobs story doesn't exist yet in Storyblok
    return (
      <main className="min-h-screen">
        <Toolbar department={department} searchTerm={q} searchParams={sp} />
        <JobsList department={department} searchTerm={q} searchParams={sp} />
      </main>
    );
  }

  const body = page.content?.body || [];

  return (
    <main className="min-h-screen">
      <StoryblokLiveEditing story={page} />

      {body.length > 0 ? (
        body.map((blok) => (
          <StoryblokServerComponent
            key={blok._uid}
            blok={blok}
            department={department}
            searchTerm={q}
            q={q}
            searchParams={sp}
          />
        ))
      ) : (
        <>
          <Toolbar department={department} searchTerm={q} searchParams={sp} />
          <JobsList department={department} searchTerm={q} searchParams={sp} />
        </>
      )}
    </main>
  );
}
