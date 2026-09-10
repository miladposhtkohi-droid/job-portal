import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import HeaderShell from "@/COMPONENTS/HeaderShell";

export default function Header({ blok }) {
  if (!blok) return <HeaderShell />;

  const navItems = blok.nav_items || [];

  const renderNav = (variant) =>
    navItems.map((item) => (
      <StoryblokServerComponent
        key={`${variant}-${item._uid}`}
        blok={item}
        variant={variant}
      />
    ));

  return (
    <div {...storyblokEditable(blok)} className="sticky top-0 z-40">
      <HeaderShell
        logoText={blok.logo_text || "Jobbportalen"}
        desktopNav={renderNav("desktop")}
        mobileNav={renderNav("mobile")}
      />
    </div>
  );
}
