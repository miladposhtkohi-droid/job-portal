import Link from "next/link";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Footer({ blok }) {
  const links = blok?.links || [];

  return (
    <footer
      {...(blok ? storyblokEditable(blok) : {})}
      className="mt-auto border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-950/90 py-10 transition-colors"
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-6 ${
          blok?.copyright ? "justify-between" : "justify-center"
        }`}
      >
        {blok?.copyright && (
          <p className="text-sm text-slate-700 dark:text-slate-400">
            {blok.copyright}
          </p>
        )}

        {links.length > 0 ? (
          <nav aria-label="Sidfotsmeny" className="flex flex-wrap items-center gap-6">
            {links.map((item) => (
              <StoryblokServerComponent key={item._uid} blok={item} />
            ))}
          </nav>
        ) : (
          <nav aria-label="Sidfotsmeny" className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">
              Hem
            </Link>
            <Link href="/jobs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Lediga tjänster
            </Link>
            <a
              href="https://www.storyblok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Storyblok
            </a>
          </nav>
        )}
      </div>
    </footer>
  );
}
