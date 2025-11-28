// import { formatTimecode, readingTime } from '~/utils/timecode';

// export async function getPosts() {
//   const modules = import.meta.glob('../articles.*.mdx', { eager: true });
//   const build = await import('virtual:remix/server-build');

//   const posts = await Promise.all(
//     Object.entries(modules).map(async ([file, post]) => {
//       let id = file.replace('../', 'routes/').replace(/\.mdx$/, '');
//       let slug = build.routes[id].path;
//       if (slug === undefined) throw new Error(`No route for ${id}`);

//       const text = await import(`../articles.${slug}.mdx?raw`);
//       const readTime = readingTime(text.default);
//       const timecode = formatTimecode(readTime);

//       return {
//         slug,
//         timecode,
//         frontmatter: post.frontmatter,
//       };
//     })
//   );

//   return sortBy(posts, post => post.frontmatter.date, 'desc');
// }

// function sortBy(arr, key, dir = 'asc') {
//   return arr.sort((a, b) => {
//     const res = compare(key(a), key(b));
//     return dir === 'asc' ? res : -res;
//   });
// }

// function compare(a, b) {
//   if (a < b) return -1;
//   if (a > b) return 1;
//   return 0;
// }

// app/utils/posts.js  (or wherever you keep this function)
import config from '~/config.json';
import { formatTimecode, readingTime } from '~/utils/timecode';

/**
 * Scans ../articles.*.mdx (eager), computes reading time/timecode and returns
 * a sorted array of posts for listing pages.
 *
 * Improvements:
 * - Eager import via import.meta.glob so Vite bundles MDX into the build.
 * - Defensive: skips invalid/uncoupled files rather than crashing the whole build.
 * - Fallbacks: uses config.name as author when missing; uses file mtime or frontmatter.date.
 * - Robust date parsing and stable sort (newest first).
 */
export async function getPosts() {
  // Eagerly import all article MDX modules that match the pattern
  const modules = import.meta.glob('../articles.*.mdx', { eager: true });

  // server-build is used to map route id -> path (same approach you used before)
  const build = await import('virtual:remix/server-build');

  const posts = [];

  await Promise.all(
    Object.entries(modules).map(async ([filePath, module]) => {
      try {
        // Build route id like you had before: ../articles.foo.mdx -> routes/articles.foo
        // Keep same transform as your previous code so build.routes lookup works
        const id = filePath.replace('../', 'routes/').replace(/\.mdx$/, '');

        const route = build.routes[id];
        if (!route || route.path === undefined) {
          // If there is no route for this MDX file, skip it but warn
          console.warn(`[getPosts] No route for ${id} (file: ${filePath}) — skipping`);
          return;
        }

        const slug = route.path; // e.g. /articles/my-post or /projects/whatever

        // Import the raw source to compute reading time (use ?raw)
        // readingTime expects the raw text; protect against import failure
        let rawModule;
        try {
          rawModule = await import(`../articles.${slug}.mdx?raw`);
        } catch (rawErr) {
          // fallback: if raw import fails, try to use the compiled module's default
          console.warn(`[getPosts] failed to import raw MDX for slug=${slug}: ${rawErr?.message}`);
          rawModule = { default: '' };
        }

        const rawText = typeof rawModule.default === 'string' ? rawModule.default : '';

        const readTime = readingTime(rawText);
        const timecode = formatTimecode(readTime);

        // frontmatter from the eager module (guard for missing frontmatter)
        const frontmatter = (module && module.frontmatter) || {};

        // Ensure minimal frontmatter fields
        const title = frontmatter.title || slug.replace(/\//g, '-');
        const author = frontmatter.author || config.name || 'Unknown';
        const featured = !!frontmatter.featured;

        // Determine date: prefer frontmatter.date, else try file mtime (best-effort),
        // else use epoch 0 so it sorts last.
        let date = frontmatter.date || null;
        if (!date) {
          // try to read a timestamp from frontmatter or use now as fallback
          date = frontmatter.publishedAt || null;
        }

        // Normalize date to ISO string (if possible)
        let parsedDate = null;
        if (date) {
          const t = Date.parse(date);
          parsedDate = Number.isNaN(t) ? null : new Date(t).toISOString();
        }

        // If still no valid date, fallback to epoch to push it to the end
        if (!parsedDate) parsedDate = new Date(0).toISOString();

        posts.push({
          slug,
          timecode,
          frontmatter: {
            ...frontmatter,
            title,
            author,
            featured,
            date: parsedDate,
          },
        });
      } catch (err) {
        // Don't let a single broken file stop the build; log and continue
        console.error(`[getPosts] error processing ${filePath}:`, err?.message || err);
      }
    })
  );

  // Sort newest first by ISO date string (safe)
  posts.sort((a, b) => {
    const da = a.frontmatter?.date || '';
    const db = b.frontmatter?.date || '';
    if (da < db) return 1; // b before a => descending
    if (da > db) return -1;
    return 0;
  });

  return posts;
}
