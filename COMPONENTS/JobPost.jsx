import { storyblokEditable } from "@storyblok/react";
import { renderRichText } from "@/lib/storyblok";

const JobPost = ({ blok }) => {
  if (!blok) return null;

  const { title, summary, location, department, publishedAt, content } = blok;
  const renderedContent = renderRichText(content);

  return (
    <article
      {...storyblokEditable(blok)}
      className="max-w-4xl mx-auto p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 my-8"
    >
      {/* Header section with Title and Metadata */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
        {title && (
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
            {title}
          </h1>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          {department && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {department}
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              📍 {location}
            </span>
          )}
          {publishedAt && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-zinc-500 dark:text-zinc-400">
              📅 {publishedAt}
            </span>
          )}
        </div>
      </header>

      {/* Summary section */}
      {summary && (
        <section className="mb-6">
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal italic border-l-4 border-blue-500 pl-4 py-2 bg-zinc-50 dark:bg-zinc-800/40 rounded-r">
            {summary}
          </p>
        </section>
      )}

      {/* RichText Content section */}
      {content && (
        <section
          className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      )}
    </article>
  );
};

export default JobPost;
