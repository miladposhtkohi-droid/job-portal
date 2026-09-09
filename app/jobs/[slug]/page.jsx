import { notFound } from "next/navigation";
import { getStoryblokApi } from "@/lib/storyblok";
import JobPost from "@/COMPONENTS/JobPost";

export default async function JobPage({ params }) {
  const { slug } = await params;
  const storyblokApi = getStoryblokApi();

  let story = null;

  try {
    const response = await storyblokApi.get(`cdn/stories/jobs/${slug}`, {
      version: "draft",
    });
    story = response.data?.story;
  } catch (error) {
    console.error(`Fel vid hämtning av jobbet '${slug}':`, error);
    notFound();
  }

  if (!story || !story.content) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-zinc-50 dark:bg-black">
      <JobPost blok={story.content} />
    </main>
  );
}
