import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function FeatureGrid({ blok }) {
  if (!blok) return null;

  return (
    <section {...storyblokEditable(blok)} className="py-12 md:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {(blok.heading || blok.subheading) && (
        <div className="text-center mb-10">
          {blok.heading && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-3">
              {blok.heading}
            </h2>
          )}
          {blok.subheading && (
            <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-normal">{blok.subheading}</p>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blok.items?.map((item) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
}
