# Eden Estate Stowe — Developer & Deployment Guide

This guide is curated for future AI assistants (Antigravity) and developers to ensure smooth development, troubleshooting, and deployments for Eden Estate Stowe.

---

## 🌎 Production Deployment Workflow

The application is a **Next.js Static Export (SSG)** deployed to **Cloudflare Pages** under the project name **`eden-preview`** (which serves the production domains `lemelsonestate.com` and `www.lemelsonestate.com`). 

> [!IMPORTANT]
> This project is configured with **`Git Provider: No`** in Cloudflare. 
> Pushing changes to the GitHub repository is excellent for source control but **will not trigger an automatic deployment to production**. You must deploy manually using the Wrangler CLI.

### Step-by-Step Deployment:

1. **Commit your changes**:
   Make sure all your local changes are committed and pushed to GitHub for version control:
   ```bash
   git add .
   git commit -m "feat/fix: descriptive message"
   git push origin main
   ```

2. **Generate the Production Build**:
   Run the Next.js production build command:
   ```bash
   npm run build
   ```
   > [!NOTE]
   > The build compiles all gallery data, optimizes images, and outputs the static assets. Due to the custom production configuration in `next.config.ts`, the compiled output directory is **`.next-prod/`** (not the default `out/` or `.next/`).

3. **Deploy to Cloudflare Pages via Wrangler**:
   Deploy the compiled `.next-prod/` directory directly to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy .next-prod --project-name=eden-preview --branch=main
   ```

---

## 🔒 Security & Content Security Policy (CSP)

### Static Headers configuration:
Next.js custom headers in `next.config.ts` do not apply when using `output: "export"`. Instead, all custom HTTP headers (such as HSTS, X-Frame-Options, and Content-Security-Policy) are configured in [public/_headers](file:///Users/emmanuel/eden2/public/_headers) and parsed directly by Cloudflare Pages.

### Common Gotchas & Troubleshooting:
* **External Connections (CORS & CSP)**: If you integrate any new external service, make external API calls, or submit forms (e.g., Formspree), you **must** update the `connect-src` and/or `form-action` directives in [public/_headers](file:///Users/emmanuel/eden2/public/_headers).
* **Formspree Integration**: The contact form in [InquiryForm.tsx](file:///Users/emmanuel/eden2/src/components/InquiryForm.tsx) submits directly to `https://formspree.io/f/mlgvzjrj`. 
  To ensure submissions are not blocked by browser CSP protections, both `connect-src` and `form-action` in the CSP must allow `https://formspree.io`:
  ```http
  connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io;
  ```

---

## 🖼️ Gallery & Media Pipeline

The project features a high-performance, optimized gallery with customized image rendering and Airbnb/VRBO-ready DSLR aesthetics.

* **Asset Sizing**: Original master images are enhanced/upscaled and normalized to **2400x1600px, 3:2 landscape** aspect ratios.
* **Auto-generation script**: Running `npm run generate-data` runs the `scripts/generate-gallery-data.js` script to scan assets, compute dimensions, generate responsive variants (400w, 800w, 1200w, 1600w, 2000w, 2400w WebPs), and build `src/data/gallery.json`.
* **Swapping Flow**: Refer to [REUSABLE_SWAPPING_PROMPT.md](file:///Users/emmanuel/eden2/REUSABLE_SWAPPING_PROMPT.md) for the batch-optimized image-swapping workflow guidelines.
