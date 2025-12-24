<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p>

<h1 align="center">Ibrahim — Personal Portfolio</h1>

<p align="center">
  <a href="https://f552a27f.portfolio-dhn.pages.dev/">
    <img src="/public/site-preview.png" alt="Site preview" />
  </a>
</p>
A custom-built, performance-focused developer portfolio showcasing selected projects, technical skills, and engineering decisions.

👉 **Live site:** https://f552a27f.portfolio-dhn.pages.dev/

## Tech Stack

- **Remix (Vite)**
- **React 18**
- **Cloudflare Pages**
- **Framer Motion**
- **Three.js** (select background visuals)
- **MDX**
- **Storybook**

> This project intentionally uses Remix instead of Next.js for Cloudflare-native deployment and edge rendering.

## Architecture & Engineering Notes

### Why Remix + Cloudflare Pages
- Edge-rendered server components
- Low TTFB via Cloudflare Workers
- Explicit routing and data loading
- Clear server/client separation

### Build Decisions
- **CSS code splitting is disabled**
  - Prevents production layout collapse caused by non-deterministic CSS chunk ordering
  - Tradeoff: slightly larger CSS payload for deterministic rendering
- **3D asset support**
  - `.glb`, `.hdr`, and shader files explicitly included in the build pipeline

These choices were made after debugging real production issues — not copied from templates.


## Local Development

### Requirements
- **Node.js ≥ 18.18.0 (LTS recommended)**
- **npm ≥ 9**

Install dependencies:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To view the components storybook:

```bash
npm run dev:storybook
```

## Deployment

This project is deployed on Cloudflare Pages.

```bash
npm run deploy
```

## Access & Usage

## Private Repository — Restricted Access
This repository is private and not intended for public use, distribution, or reuse.

Unauthorized actions are not permitted, including but not limited to:

Copying or reusing code

Replicating design, animations, or layout

Redistributing or modifying any part of the project

Claiming any work contained here as your own

All code, design, assets, and intellectual property belong to <b>Ibrahim</b>.
## FAQs

<details> <summary>How do I change the color of the background displacement sphere?</summary>

Edit the fragment shader used by the Three.js material.

See this discussion for details:
https://github.com/ibrahimBytes/portfolio/issues/19#issuecomment-870996615

</details> <details> <summary>Why is CSS code splitting disabled?</summary>

In production builds, CSS chunking caused layout instability due to non-deterministic load order.
Disabling it ensures predictable rendering at the cost of a slightly larger CSS bundle.

</details> ``` 
