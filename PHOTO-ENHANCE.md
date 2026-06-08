# PHOTO ENHANCE PROMPT 

```markdown
Please enhance the following photo(s) to professional DSLR quality: LIST OF PHOTO FILENAMES will be provided in the chat.

1. **Airbnb/VRBO Output Size:** For high-value listing photos, final masters should be normalized to **2400x1600px, 3:2 landscape** when the composition supports it. In the image-generation prompt, ask for a **3:2 landscape composition/framing** so the image is created with the right visual crop. Do not rely on the image generator for exact pixel dimensions; use local post-processing afterward to make the final file exactly 2400x1600. Generate/export responsive versions after the 2400x1600 master is in place.

### Exact Airbnb/VRBO-Ready Workflow Used For The 2400x1600 Batch:

The image generator may not output the exact requested pixel dimensions. Treat the generator prompt as an instruction for **aspect ratio, framing, composition, lighting, and image quality**, not as the final sizing step. If it returns a fixed-size image, use local post-processing to normalize the selected result to **2400x1600** before finalizing.

1. **Prepare Reference PNGs:** Run:
   ```bash
   node scripts/enhance-photo.js --prepare [ID1] [ID2] [ID3] ...
   ```
   If the image was already archived from a prior enhancement, use the low-res archive source as the reference when appropriate.
3. **Inspect References:** Open/view the prepared reference(s) before generating so the prompt matches the real content.
4. **Generate Each Enhancement:** Use the prompt style above with the image generation tool, one photo at a time or in parallel when available.
5. **Normalize To 2400x1600:** If the generated file is not exactly 2400x1600, use Sharp/local image processing to resize/crop/pad as appropriate while preserving the composition. Save the normalized PNG using a filename the finalizer can detect, for example:
   ```text
   enhanced_68_codex_2400.png
   ```
6. **Finalize Selected IDs:** Run:
   ```bash
   node scripts/enhance-photo.js --finalize [ID1] [ID2] [ID3] ...
   ```
7. **Regenerate Responsive Variants:** Remove stale enhanced responsive WebPs for those IDs if needed, then rebuild:
   ```bash
   node scripts/generate-gallery-data.js
   node scripts/rebuild-quality-audit.js
   ```
8. **Verify Dimensions:** Confirm each final enhanced master is **2400x1600** and each responsive set exists:
   ```text
   400w, 800w, 1200w, 1600w, 2000w, 2400w
   ```
9. **Clean Old Photo Variants Safely:** After the new enhanced master and responsive variants are verified, remove obsolete/stale responsive variants for the same photo ID so the gallery does not keep serving older versions. Do not permanently delete the original source image; let the finalizer archive it into `public/gallery/lowres_archive/` for rollback/audit. Do not delete anything for unrelated photo IDs.
10. **Clean Temporary Files:** Remove temporary reference PNGs/contact sheets/staging PNGs after final assets are verified. Keep `public/gallery/lowres_archive/` for rollback/audit.

I will give you the changes I want in the chat or what i'm looking for regarding the specific image(s).

---

## IMPORTANT: Cache purge after re-enhancing a reused filename

Gallery images are served with long-lived, immutable caching (`public/_headers` → `/gallery/*`). This makes the site fast, but it means browsers and Cloudflare keep their copy of a file for up to a year and will NOT re-check for changes.

Consequence: if you re-enhance a photo and keep the **same filename**, visitors (and Cloudflare's edge) may keep showing the OLD version.

After deploying re-enhanced photos that reuse filenames, do ONE of the following:

1. **Purge in Cloudflare (recommended):** Cloudflare Dashboard → your site → Caching → Configuration → "Purge Cache" → purge the specific image URLs (or "Purge Everything"). This refreshes the edge; individual visitors' browsers refresh as they revisit.
2. **Or bump the filename** (e.g. `103.avif` → `103-v2.avif`) so it's treated as a brand-new file and no purge is needed.

If a photo gets a NEW filename, no purge is necessary.