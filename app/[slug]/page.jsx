import { notFound } from "next/navigation";
import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getPage, getPageSlugs } from "@/lib/storyblok";

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: "Sidan hittades inte",
    };
  }

  return {
    title: page.name || "Sida",
    description: page.content?.meta_description || "Information på Jobbportalen.",
  };
}

export default async function DynamicPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = await getPage(slug);

  if (!page || !page.content) {
    notFound();
  }

  const body = page.content?.body || [];

  return (
    <main className="min-h-screen py-8">
      <StoryblokLiveEditing story={page} />
      {body.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} searchParams={sp} />
      ))}
    </main>
  );
}
