import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Page({ blok, searchParams, department, q }) {
  if (!blok) return null;

  const body = blok.body || [];

  return (
    <div {...storyblokEditable(blok)} className="w-full">
      {body.map((nestedBlok) => (
        <StoryblokServerComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          searchParams={searchParams}
          department={department}
          q={q}
        />
      ))}
    </div>
  );
}
