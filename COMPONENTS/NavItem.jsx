"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ blok, variant = "desktop" }) {
  const pathname = usePathname();
  const href = blok.url || "/";

  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
          isActive
            ? "bg-white/10 text-white"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        <span>{blok.label}</span>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "text-white bg-white/10"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {blok.label}
    </Link>
  );
}
