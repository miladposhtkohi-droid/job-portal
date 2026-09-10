import { StoryblokServerRichText, storyblokEditable } from "@storyblok/react/rsc";

export default function TextSection({ blok }) {
  if (!blok) return null;

  return (
    <section {...storyblokEditable(blok)} className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="portal-card p-6 sm:p-10">
        {blok.heading && (
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-6">
            {blok.heading}
          </h2>
        )}
        {blok.content && (
          <div className="prose-portal">
            <StoryblokServerRichText document={blok.content} />
          </div>
        )}
      </div>
    </section>
  );
}
