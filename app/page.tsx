import { StoryblokServerComponent, StoryblokLiveEditing } from "@storyblok/react/rsc";
import { getPage } from "@/lib/storyblok";
import Hero from "@/COMPONENTS/Hero";

export const metadata = {
  title: "Hem | Jobbportalen",
  description: "Välkommen till Jobbportalen - din plattform för spännande karriärmöjligheter.",
};

export default async function HomePage() {
  const page = await getPage("home");

  if (!page) {
    // If no home story exists in Storyblok yet, render a default Hero
    return (
      <main className="min-h-[75vh] flex items-center justify-center">
        <Hero
          blok={{
            eyebrow: "Välkommen till Jobbportalen",
            title: "Hitta din nästa utmaning och forma framtiden",
            subtitle: "Vi kopplar samman passionerade utvecklare, kreativa designers och drivna marknadsförare med framstående organisationer.",
            button_text: "Utforska lediga tjänster",
            button_url: "/jobs",
          }}
        />
      </main>
    );
  }

  const body = page.content?.body || [];

  return (
    <main className="flex-1">
      {/* Enables Visual Editor live preview inside Storyblok */}
      <StoryblokLiveEditing story={page} />

      {body.length > 0 ? (
        body.map((blok: any) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))
      ) : (
        <Hero
          blok={{
            eyebrow: "Välkommen",
            title: "Utforska lediga tjänster",
            subtitle: "Hitta ditt drömjobb bland våra aktuella annonser.",
            button_text: "Se alla jobb",
            button_url: "/jobs",
          }}
        />
      )}
    </main>
  );
}
