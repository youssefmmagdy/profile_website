import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/soora.jpg", type: "image/jpeg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
];

/**
 * Runs before first paint: marks the document as JS-capable (which arms the
 * scroll-reveal styles — without it every section renders visible) and applies
 * the stored theme so a returning visitor never sees the wrong palette.
 */
const THEME_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{var s=localStorage.getItem("ym-theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches;d.dataset.theme=(s==="light"||s==="dark")?s:(m?"light":"dark");}catch(e){d.dataset.theme="dark";}})();`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="aurora left-1/2 top-1/3 h-96 w-96 -translate-x-1/2"
        style={{ background: "var(--c-accent)", opacity: 0.16 }}
      />

      <div className="panel w-full max-w-lg p-8 text-center">
        <p className="eyebrow">{message}</p>
        <h1 className="gradient-text mt-3 text-3xl font-semibold">{details}</h1>
        <a href="/" className="btn btn-primary mt-7">
          Back to portfolio
        </a>
        {stack && (
          <pre className="mt-6 max-h-64 overflow-auto rounded-lg border border-line bg-raise p-4 text-left font-mono text-xs text-dim">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
