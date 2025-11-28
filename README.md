<p align="center">
  <img src="/public/favicon.svg" width="50" alt="Logo" />
</p>

<h1 align="center">Ibrahim — Personal Portfolio</h1>

[![Site preview](/public/site-preview.png)](https://YOUR-DOMAIN-HERE)

A custom-built, high-performance developer portfolio created to showcase my personal projects, skills, and engineering capabilities.  
Built using **Next.js**, **React**, **Framer Motion**, and optional **Three.js** for visual effects.

👉 **Live site:** https://YOUR-DOMAIN-HERE
## Install & run

Make sure you have nodejs `19.9.0` or higher and npm `9.6.3` or higher installed. Install dependencies with:

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

I've set up the site using Cloudflare zfor hosting. Deploy the site to Cloudflare Pages:

```bash
npm run deploy
```

## Permissions / License (Closed-Source)

This project is NOT open source.

❌ You may NOT copy this project

❌ You may NOT reuse any significant part of the code

❌ You may NOT redistribute, modify, or adapt the design

❌ You may NOT claim any project inside this portfolio as your own

❌ You may NOT clone, replicate, or fork this portfolio

All code, design, images, animations, and components are private intellectual property of Ibrahim.

If you want to build your own portfolio, you must create your own original design.

You are allowed to view the code only for recruitment and verification purposes.
## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

<details>
  <summary>How do I get the contact form to work?</summary>
  
  To get the contact form working create an AWS account and set up SES (Simple Email service). Then plug in your details into `.dev.vars.example` and rename it to `.dev.vars`. You'll also need to add these as enviroment variables in the Cloudflare dashboard for it to work in production. Or if you don't mind sending through gmail use [nodemailer](https://nodemailer.com/) instead.
</details>
