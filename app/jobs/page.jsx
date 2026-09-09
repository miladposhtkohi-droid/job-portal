import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@/lib/storyblok";
import { notFound } from "next/navigation";

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const department = params?.department || "";
  const q = params?.q || "";

  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const response = await storyblokApi.get("cdn/stories/jobs", {
      version: "draft",
    });
    story = response.data?.story;
  } catch (error) {
    console.error("Kunde inte hämta index-storyn för /jobs:", error);
    notFound();
  }

  if (!story || !story.content) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <StoryblokComponent
        blok={story.content}
        searchParams={params}
        department={department}
        q={q}
      />
    </main>
  );
}
