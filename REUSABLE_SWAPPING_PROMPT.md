# Reusable AI Swapping Prompt

```markdown
Please enhance the following photo(s) to professional DSLR quality matching the Eden Estate "Pro Grade" aesthetic: LIST OF PHOTO FILENAMES: 

### Context & Staging Guidelines:
1. **Preserve Real Architecture:** Perform image-to-image upscaling. Do NOT change the physical room structure, furniture placement, or layout of the real photos.
2. **Align Visual Vibe:** Match the warm golden hour sunset, soft pink/purple twilight glows, crisp textures, and professional staging of existing Pro Grade photos (if appropriate for the photo and its description)
3. **Captions Helper:** Refer to `src/data/captions.json` to extract the exact lighting, season, and contents for each target photo to build the upscaling prompts.

### Reusable Pipeline Steps:
1. **Convert to PNG:** Convert `public/gallery/Eden-Site Photos/[ID].avif` to a temporary reference PNG.
2. **Upscale Image:** Run `generate_image` passing the reference PNG in `ImagePaths` to generate a high-res upscaled asset.
3. **Move to Enhanced Folder:** Save the new upscaled file in `public/gallery/enhanced/[ID].avif`.
4. **Archive Original:** Move the original low-res file to `public/gallery/lowres_archive/[ID].avif` and delete any stale responsive variants matching `[ID]@*` in `Eden-Site Photos/`.
5. **Rebuild Assets:** Run `node scripts/generate-gallery-data.js` and rebuild `public/quality-audit.html` (V2).
6. **Spotless Cleanup:** Delete all temporary draft files or input PNGs created during the run.
```
