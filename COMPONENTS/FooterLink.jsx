import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { formatStoryblokLink } from "@/lib/storyblok";

export default function FooterLink({ blok }) {
  if (!blok) return null;

  return (
    <Link
      {...storyblokEditable(blok)}
      href={formatStoryblokLink(blok.url, "/")}
      className="text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
    >
      {blok.label}
    </Link>
  );
}
