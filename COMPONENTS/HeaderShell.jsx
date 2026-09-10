"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/COMPONENTS/ThemeToggle";

export default function HeaderShell({ logoText = "Jobbportalen", desktopNav, mobileNav }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close mobile menu on route change
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-white/[0.08] backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 transition-colors duration-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              {logoText?.trim()?.charAt(0) || "J"}
            </span>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-extrabold text-lg tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {logoText}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600 dark:text-emerald-400">
                Karriär & Rekrytering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <nav aria-label="Huvudmeny" className="flex items-center gap-1">
              {desktopNav || (
                <>
                  <Link
                    href="/"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === "/"
                        ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10 font-semibold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    Hem
                  </Link>
                  <Link
                    href="/jobs"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith("/jobs")
                        ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10 font-semibold"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    Lediga jobb
                  </Link>
                </>
              )}
            </nav>

            <div className="h-5 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

            {/* Dark / Light Mode Button */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={mobileOpen}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors"
            >
              <span className="sr-only">Meny</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded transition-transform duration-200 origin-center ${
                    mobileOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded transition-transform duration-200 origin-center ${
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 sm:top-20 z-30 transition-all duration-200 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-2 p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl">
          <nav aria-label="Mobilmeny" className="flex flex-col gap-1">
            {mobileNav || (
              <>
                <Link
                  href="/"
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === "/"
                      ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  Hem
                </Link>
                <Link
                  href="/jobs"
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    pathname.startsWith("/jobs")
                      ? "text-emerald-700 bg-emerald-50 dark:text-white dark:bg-white/10"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  Lediga jobb
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 top-16 z-20 bg-black/40 backdrop-blur-xs"
        />
      )}
    </>
  );
}
