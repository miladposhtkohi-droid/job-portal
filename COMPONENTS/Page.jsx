import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Page = ({ blok, searchParams, department, q }) => {
  if (!blok) return null;

  return (
    <main {...storyblokEditable(blok)} className="min-h-screen">
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          searchParams={searchParams}
          department={department}
          q={q}
        />
      ))}
    </main>
  );
};

export default Page;
