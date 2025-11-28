// //app/routes/articles/route.jsx
// // -----------------------------------------------------------------------------
// // IMPORTS
// // -----------------------------------------------------------------------------  

// import { json } from '@remix-run/cloudflare';
// import { Outlet, useLoaderData } from '@remix-run/react';
// import { MDXProvider } from '@mdx-js/react';
// import { Post, postMarkdown } from '~/layouts/post';
// import { baseMeta } from '~/utils/meta';
// import config from '~/config.json';
// import { formatTimecode, readingTime } from '~/utils/timecode';

// export async function loader({ request }) {
//   const slug = request.url.split('/').at(-1);
//   const module = await import(`../articles.${slug}.mdx`);
//   const text = await import(`../articles.${slug}.mdx?raw`);
//   const readTime = readingTime(text.default);
//   const ogImage = `${config.url}/static/${slug}-og.jpg`;

//   return json({
//     ogImage,
//     frontmatter: module.frontmatter,
//     timecode: formatTimecode(readTime),
//   });
// }

// export function meta({ data }) {
//   const { title, abstract } = data.frontmatter;
//   return baseMeta({ title, description: abstract, prefix: '', ogImage: data.ogImage });
// }

// export default function Articles() {
//   const { frontmatter, timecode } = useLoaderData();

//   return (
//     <MDXProvider components={postMarkdown}>
//       <Post {...frontmatter} timecode={timecode}>
//         <Outlet />
//       </Post>
//     </MDXProvider>
//   );
// }

// app/routes/articles/route.jsx
// Personalized loader + route for Ibrahim Shaik
// - safer imports (404 if MDX missing)
// - ensures author is present in frontmatter (uses config.name)
// - returns ogImage + reading time formatted

import { json } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';
import { formatTimecode, readingTime } from '~/utils/timecode';

/**
 * Loader:
 * - dynamic import of ../articles.<slug>.mdx
 * - if missing -> 404 response
 * - computes readingTime and ogImage
 */
export async function loader({ request }) {
  // Pull the slug from the URL safely
  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const slug = parts.at(-1) || 'index';

  try {
    // dynamic import of the mdx module and raw source for reading time
    const module = await import(`../articles.${slug}.mdx`);
    const text = await import(`../articles.${slug}.mdx?raw`);

    const readTime = readingTime(text.default || '');
    const timecode = formatTimecode(readTime);

    // create og image + canonical
    const ogImage = `${config.url.replace(/\/$/, '')}/static/${slug}-og.jpg`;
    const canonical = `${config.url.replace(/\/$/, '')}/articles/${slug}`;

    // ensure author present in frontmatter
    const frontmatter = {
      ...(module.frontmatter || {}),
      author: (module.frontmatter && module.frontmatter.author) || config.name,
    };

    return json(
      {
        frontmatter,
        timecode,
        ogImage,
        canonical,
      },
      { status: 200 }
    );
  } catch (err) {
    // MDX file not found or other import error -> 404
    // Log server-side (Cloudflare logs) if needed, but return clean 404 to client
    console.error(`Article loader error for slug="${slug}":`, err?.message || err);
    return json(
      {
        message: 'Article not found',
        slug,
      },
      { status: 404 }
    );
  }
}

/**
 * meta() builds page metadata for SEO / social cards.
 * If loader returned 404, gracefully fallback.
 */
export function meta({ data }) {
  if (!data || data?.status === 404) {
    return baseMeta({
      title: 'Article not found',
      description: 'The article you requested could not be found.',
    });
  }

  const { frontmatter, ogImage, canonical } = data;
  const title = frontmatter?.title || `${config.name} — Article`;
  const description = frontmatter?.abstract || frontmatter?.description || '';

  return baseMeta({
    title,
    description,
    prefix: '',
    ogImage,
    canonical,
  });
}

/**
 * Default export renders the MDX Post layout and nested content.
 * Exposes frontmatter + timecode via loader data to the Post component.
 */
export default function ArticlesRoute() {
  const { frontmatter, timecode } = useLoaderData();

  // If 404, show nothing here — the Remix error boundary / response status will handle it.
  if (!frontmatter) {
    return null;
  }

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Outlet />
      </Post>
    </MDXProvider>
  );
}

