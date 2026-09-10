import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Grid({ blok }) {
  if (!blok) return null;

  const columns = blok.columns || [];

  return (
    <section
      {...storyblokEditable(blok)}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((nestedBlok) => (
          <StoryblokServerComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
      </div>
    </section>
  );
}
