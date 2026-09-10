import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import { formatStoryblokLink } from "@/lib/storyblok";

export default function Button({ blok }) {
  if (!blok) return null;

  const label = blok.submit || blok.label || blok.text || "Utforska";
  const url = formatStoryblokLink(blok.url, "/jobs");

  return (
    <div {...storyblokEditable(blok)} className="flex justify-center py-6">
      <Link href={url} className="btn-accent">
        {label}
      </Link>
    </div>
  );
}
