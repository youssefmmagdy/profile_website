# Youssef Magdy — Portfolio

Personal portfolio site for **Youssef Magdy**, AI & machine learning engineer.
Server-rendered, bilingual (English / German), dark-first with a full light
theme, and animated throughout — with every animation disabled automatically
under `prefers-reduced-motion`.

## Stack

| | |
|---|---|
| Framework | [React Router 7](https://reactrouter.com/) (SSR) |
| UI | React 19 |
| Styling | Tailwind CSS 4 (`@theme inline` tokens) |
| Language | TypeScript |
| Bundler | Vite 7 |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

No animation library — the motion is hand-rolled with `IntersectionObserver`,
`requestAnimationFrame`, CSS transitions and a `<canvas>`, so it stays small and
pauses itself when off-screen or when the tab is hidden.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The site runs at `http://localhost:5173`.

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build into `build/` |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types, then run `tsc` |

## Project structure

```
app/
├─ root.tsx                 HTML shell, fonts, pre-paint theme script, error page
├─ app.css                  design tokens, component primitives, keyframes
├─ routes/home.tsx          the single page — composition + SEO meta
├─ data/content.ts          ALL content: profile, projects, skills, EN/DE copy
├─ hooks/usePortfolio.ts    theme, locale, reveal, scroll-spy, typewriter, count-up
├─ lib/ui.ts                stagger-delay helper
└─ components/
   ├─ Navbar.tsx            scroll-spy nav, theme/language toggles, mobile sheet
   ├─ Hero.tsx              headline, typewriter roles, stats, tech marquee
   ├─ NeuralField.tsx       animated neural-network canvas behind the hero
   ├─ CommandPalette.tsx    ⌘K / Ctrl+K palette
   ├─ Cursor.tsx            custom two-part pointer (desktop only)
   ├─ Section.tsx           shared section header (index, label, title, intro)
   ├─ Experience.tsx        timeline
   ├─ Skills.tsx            grouped skill chips
   ├─ Projects.tsx          category filters + live search + cards
   ├─ Education.tsx         degree card + résumé preview
   ├─ Highlight.tsx         YouTube playlist (title/thumbnail via oEmbed)
   ├─ Contact.tsx           contact details, copy-to-clipboard, socials
   ├─ Footer.tsx            back-to-top
   └─ Icons.tsx             inline SVG icon set

public/
├─ soora.jpg                portrait (also the favicon and OG image)
└─ image.png                résumé preview thumbnail
```

## Editing content

**`app/data/content.ts` is the single source of truth.** You should not need to
touch a component to change what the site says.

| Export | What it controls |
|---|---|
| `SITE_URL` | Public origin, used to build absolute OG/Twitter image URLs |
| `PROFILE` | Name, email, phone, location, social links, résumé URLs |
| `ROLES` | Rotating job titles in the hero typewriter |
| `SKILL_GROUPS` | Skills section, grouped and bilingual |
| `MARQUEE_TECH` | The scrolling tech strip under the hero |
| `PROJECTS` | Every project card |
| `translations` | All EN/DE copy, typed by `Dictionary` |

### Adding a project

```ts
{
  title: "My Project",
  description: "One paragraph. Long text is clamped on the card.",
  tools: ["PyTorch", "FastAPI"],   // first 6 shown, rest collapse into "+N"
  category: "ai",                   // "ai" | "web" | "cloud" | "systems"
  github: "https://github.com/…",   // optional
  download: "https://…",            // optional — adds a download button
  video: "https://…",               // optional — adds a play button
  featured: true,                   // optional — badge + sorted to the front
}
```

Six projects show by default; the rest appear behind **Show all projects**, and
searching reveals every match regardless. The filter counts derive from
`category`, so a new category value needs a matching entry in
`translations.<locale>.projects.filters` and in `FILTERS` in `Projects.tsx`.

### Translations

`Dictionary` is a strict type — adding a key to `en` makes TypeScript require it
in `de` too, so the two locales cannot drift. Language persists in
`localStorage` under `ym-locale`.

### Résumé PDFs

`Youssef_Magdy_Resume.pdf` (EN) and `Youssef_Magdy_Lebenslauf.pdf` (DE) live at
the repo root and are linked from `PROFILE.resume` via `raw.githubusercontent.com`.
**They are served straight from the `main` branch, so replacing a PDF only takes
effect once it is committed and pushed.** `public/image.png` is the preview
thumbnail and should be updated to match.

## Design system

Colours are CSS custom properties (`--c-*`) defined twice in `app/app.css` —
once on `:root` (dark) and once on `[data-theme="light"]` — then mapped into
Tailwind through `@theme inline`. Changing a single token restyles the whole
site in both themes.

```css
:root                 { --c-accent: #5b8cff; /* … */ }
[data-theme="light"]  { --c-accent: #2f5fe0; /* … */ }
```

That yields utilities such as `bg-bg`, `bg-raise`, `bg-surface`, `text-ink`,
`text-dim`, `text-mute`, `text-accent`, `text-cyan`, `text-violet`,
`border-line` and `border-line-strong`.

**Primitives** (also in `app.css`): `.panel`, `.spotlight`, `.btn` with
`.btn-primary` / `.btn-ghost`, `.icon-btn`, `.chip`, `.eyebrow`,
`.gradient-text`, `.accent-text`, `.bg-grid`, `.bg-noise`, `.aurora`.

**Theming** is applied by a small blocking script in `root.tsx` before first
paint, so a returning visitor never sees a flash of the wrong palette. It reads
`localStorage.ym-theme`, falling back to the OS `prefers-color-scheme`.

### Scroll reveals

Add `data-reveal` to any element and it fades up when it scrolls into view; use
`data-reveal="wipe"` for the clip-path reveal used on headings. Stagger siblings
with the `revealDelay(ms)` helper from `app/lib/ui.ts`:

```tsx
<article data-reveal style={revealDelay(index * 80)}>
```

## Accessibility & resilience

- **Reduced motion** — one media query in `app.css` disables every animation,
  transition and reveal; `NeuralField` and `Cursor` refuse to mount at all.
- **Works without JavaScript** — reveal styles are gated behind a `.js` class
  set pre-paint, so with JS off the page renders fully visible instead of blank.
- **Observer failsafe** — a scroll/timeout sweep reveals anything the
  `IntersectionObserver` misses (throttled background tabs, embedded webviews),
  so content can never stay permanently hidden.
- Skip link, focus-visible outlines, `aria-label`s on icon-only controls,
  keyboard-driven command palette, and a custom cursor that only appears for
  fine pointers.

## Deployment

### Vercel

`vercel.json` is already configured; connect the repo and it builds with
`npm run build`.

### Docker

```bash
docker build -t portfolio .
```

```bash
docker run -p 3000:3000 portfolio
```

### Anywhere else

`npm run build` emits a standard Node server; run it with `npm run start`.

```
build/
├─ client/    static assets
└─ server/    server-side code
```

> **Before going live:** set `SITE_URL` in `app/data/content.ts` to your real
> domain. It builds the absolute Open Graph and Twitter card image URLs, which
> social platforms cannot resolve from a relative path.
