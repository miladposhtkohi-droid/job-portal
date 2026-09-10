import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { getConfig } from "@/lib/storyblok";
import Header from "@/COMPONENTS/Header";
import Footer from "@/COMPONENTS/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jobbportalen | Hitta din nästa karriärmöjlighet",
    template: "%s | Jobbportalen",
  },
  description: "Utforska lediga tjänster inom utveckling, design och marknadsföring hos Jobbportalen.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();
  const globalBloks: any[] = [
    ...(config?.content?.body || []),
    ...(config?.content?.header || []),
    ...(config?.content?.footer || []),
  ];

  const headerBlok = globalBloks.find((blok) => blok.component === "header");
  const footerBlok = globalBloks.find((blok) => blok.component === "footer");

  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var saved = localStorage.getItem('job-portal-theme');
                if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (saved === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        {headerBlok ? (
          <StoryblokServerComponent blok={headerBlok} />
        ) : (
          <Header blok={undefined} />
        )}

        <div className="flex-1 w-full">{children}</div>

        {footerBlok ? (
          <StoryblokServerComponent blok={footerBlok} />
        ) : (
          <Footer blok={undefined} />
        )}
      </body>
    </html>
  );
}
