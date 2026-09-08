import { useState } from "react";
import type { Route } from "./+types/home";
import CommandPalette from "../components/CommandPalette";
import Contact from "../components/Contact";
import { Cursor } from "../components/Cursor";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Highlight from "../components/Highlight";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import { SITE_URL, translations } from "../data/content";
import { useLocale, useReveal, useTheme } from "../hooks/usePortfolio";

export function meta({}: Route.MetaArgs) {
  const title = "Youssef Magdy — AI & Machine Learning Engineer";
  const description =
    "Portfolio of Youssef Magdy: AI and machine learning engineer building Transformers from scratch, RAG systems, computer vision and cloud-native full-stack platforms.";
  const image = `${SITE_URL}/soora.jpg`;

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: "#08090c" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const t = translations[locale];

  // Sections rendered outside Projects reveal from here; Projects re-arms its
  // own observer when its visible set changes.
  useReveal([locale]);

  return (
    <>
      <Cursor />

      <Navbar
        t={t}
        locale={locale}
        theme={theme}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <CommandPalette
        t={t}
        locale={locale}
        theme={theme}
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero t={t} locale={locale} theme={theme} />
        <Experience t={t} />
        <Skills t={t} locale={locale} />
        <Projects t={t} />
        <Education t={t} locale={locale} />
        <Highlight t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
    </>
  );
}
