### Cloudflare Pages Deployment Guide (Eden)

#### Prerequisites
- Logged in to Cloudflare CLI:

```bash
wrangler whoami
```

#### Build
```bash
npm run build
```
This runs the gallery data generator and builds a static export into `out/`.

#### Deploy to Production (eden-preview project, main branch)
```bash
wrangler pages deploy out --project-name=eden-preview --branch=main
```
This publishes to the Production environment and serves your custom domains.

#### Deploy to Preview (non-production branch)
```bash
wrangler pages deploy out --project-name=eden-preview --branch=preview
```
Or use any branch name (e.g., `feature-xyz`, `staging`). Creates a preview deployment with a unique URL (`*.eden-preview.pages.dev`) that doesn't affect production domains.

#### Verify Deployment
```bash
wrangler pages deployment list --project-name=eden-preview
```
Look for the latest entry with Environment: Production and Branch: main.

#### Notes
- Primary domains: `https://lemelsonestate.com` and `https://www.lemelsonestate.com`
- Preview URL is auto-generated per deployment (`*.eden-preview.pages.dev`) for testing.
- If Wrangler warns about uncommitted changes, you can deploy anyway:

```bash
wrangler pages deploy out --project-name=eden-preview --branch=main --commit-dirty=true
```

#### Troubleshooting
- Not authenticated: `wrangler login` or re-run `wrangler whoami`.
- DNS/custom domains: Ensure both apex and `www` are added in Pages → Custom domains and DNS has proxied CNAMEs to `eden-preview.pages.dev`.


