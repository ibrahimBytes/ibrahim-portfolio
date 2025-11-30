// app/root.jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';

import { createCookieSessionStorage, json } from '@remix-run/cloudflare';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';

import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';

import { useEffect } from 'react';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';

import config from '~/config.json';

import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';


// ===================================================================
// ✅ META TAGS (LinkedIn, WhatsApp, Instagram, Twitter, Slack, etc.)
// ===================================================================
export const meta = () => ([
  { title: "Ibrahim Shaik — Systems & Low-Level Engineering" },

  {
    name: "description",
    content:
      "Portfolio of Ibrahim Shaik — C++ internals, OS design, memory systems, networking, and distributed systems."
  },

  // --- OpenGraph ---
  { property: "og:title", content: "Ibrahim Shaik — Systems & Low-Level Engineering" },
  {
    property: "og:description",
    content:
      "Low-level engineering, C++, OS fundamentals, memory models, networking, and distributed systems."
  },
  { property: "og:type", content: "website" },
  { property: "og:url", content: config.url },
  {
    property: "og:image",
    content: `${config.url}/social-image.png`
  },

  // --- Twitter / LinkedIn fallback ---
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Ibrahim Shaik — Systems & Low-Level Engineering" },
  {
    name: "twitter:description",
    content:
      "C++, OS internals, memory & concurrency, networking, distributed systems."
  },
  {
    name: "twitter:image",
    content: `${config.url}/social-image.png`
  },
]);


// ===================================================================
// LINK TAGS (fonts, icons, manifest)
// ===================================================================
export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];


// ===================================================================
// LOADER — builds canonical URL & stores theme
// ===================================================================
export const loader = async ({ request, context }) => {
  const url = new URL(request.url);

  const canonicalUrl =
    `${config.url}${url.pathname.replace(/\/$/, "") || "/"}`;

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 604_800,
      path: "/",
      sameSite: "lax",
      secrets: [context.cloudflare.env.SESSION_SECRET || " "],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get("Cookie"));
  const theme = session.get("theme") || "dark";

  return json(
    { canonicalUrl, theme },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
};


// ===================================================================
// APP COMPONENT
// ===================================================================
export default function App() {
  let { canonicalUrl, theme } = useLoaderData();
  const fetcher = useFetcher();
  const { state } = useNavigation();

  if (fetcher.formData?.has("theme")) {
    theme = fetcher.formData.get("theme");
  }

  function toggleTheme(newTheme) {
    fetcher.submit(
      { theme: newTheme ?? (theme === "dark" ? "light" : "dark") },
      { action: "/api/set-theme", method: "post" }
    );
  }

  useEffect(() => {
    console.info(
      `${config.ascii}\n`,
      `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
    );
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content={theme === "dark" ? "#111" : "#F2F2F2"} />
        <meta name="color-scheme" content={theme === "light" ? "light dark" : "dark light"} />

        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />

        <Meta />
        <Links />

        <link rel="canonical" href={canonicalUrl} />
      </head>

      <body data-theme={theme}>
        <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
          <Progress />

          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
            Skip to main content
          </VisuallyHidden>

          <Navbar />

          <main
            id="main-content"
            className={styles.container}
            tabIndex={-1}
            data-loading={state === "loading"}
          >
            <Outlet />
          </main>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


// ===================================================================
// ERROR BOUNDARY
// ===================================================================
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
      </head>

      <body data-theme="dark">
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
} 