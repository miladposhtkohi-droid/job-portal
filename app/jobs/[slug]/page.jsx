import { notFound } from "next/navigation";
import { StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getJob, getJobs, getDatasourceMap } from "@/lib/storyblok";
import JobPost from "@/COMPONENTS/JobPost";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: "Tjänsten hittades inte",
      description: "Den sökta jobbannonsen kunde inte hittas.",
    };
  }

  const content = job.content || {};
  return {
    title: content.title ? `${content.title} | Jobbportalen` : "Ledig tjänst | Jobbportalen",
    description: content.summary || "Läs mer om denna lediga tjänst och ansök idag.",
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;

  const [job, departmentMap] = await Promise.all([
    getJob(slug),
    getDatasourceMap("job-departments"),
  ]);

  if (!job || !job.content) {
    notFound();
  }

  const departmentRaw = job.content.department;
  const departmentLabel = departmentMap.get(departmentRaw) || departmentRaw;

  return (
    <main className="min-h-screen">
      <StoryblokLiveEditing story={job} />
      <JobPost blok={job.content} departmentLabel={departmentLabel} />
    </main>
  );
}
