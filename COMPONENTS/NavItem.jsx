"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { storyblokEditable } from "@storyblok/react/rsc";
import { formatStoryblokLink } from "@/lib/storyblok";

export default function NavItem({ blok, variant = "desktop" }) {
  const pathname = usePathname();
  if (!blok) return null;

  const href = formatStoryblokLink(blok.url, "/");

  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (variant === "mobile") {
    return (
      <Link
        {...storyblokEditable(blok)}
        href={href}
        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
          isActive
            ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
        }`}
      >
        <span>{blok.label}</span>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        )}
      </Link>
    );
  }

  return (
    <Link
      {...storyblokEditable(blok)}
      href={href}
      className={`px-3.5 py-2 text-sm rounded-lg transition-colors ${
        isActive
          ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10 font-semibold"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
      }`}
    >
      {blok.label}
    </Link>
  );
}
