# Reusable AI Swapping Prompt (V3 Airbnb/VRBO Batch-Optimized)

```markdown
Please enhance the following photo(s) to professional DSLR quality matching the Eden Estate Airbnb/VRBO-ready real estate aesthetic: LIST OF PHOTO FILENAMES will be provided in the chat.

### Context & Staging Guidelines:
1. **Preserve Real Architecture:** Perform image-to-image enhancement/upscaling. Do NOT change the physical room structure, furniture placement, windows, doors, ceiling lines, fireplace shape, pool shape, landscape layout, or major decor. Only improve quality, fix small imperfections, improve clarity, correct exposure/color, and enrich realistic texture.
2. **Airbnb/VRBO Output Size:** For high-value listing photos, final masters should be normalized to **2400x1600px, 3:2 landscape** when the composition supports it. In the image-generation prompt, ask for a **3:2 landscape composition/framing** so the image is created with the right visual crop. Do not rely on the image generator for exact pixel dimensions; use local post-processing afterward to make the final file exactly 2400x1600. Generate/export responsive versions after the 2400x1600 master is in place.
3. **Interior Lighting Default:** For rooms and covered patios, use a professional bright real estate photo look: natural daylight, beautiful sunlight entering through windows where plausible, airy but realistic exposure, clean neutral-to-warm white balance, crisp detail, and inviting warmth. Use photos **98, 101, and 31** as lighting/editing references: bright rooms, readable shadow detail, natural window light, polished surfaces, and warm but not orange color.
4. **Avoid Inconsistent Room Lighting:** Do not make interiors dark, moody, dramatic, overly contrasty, blue/cold, or heavily golden-hour unless the actual source photo clearly calls for that. Avoid fake sunbeams, blown-out windows, plastic-looking furniture, glowing walls, or unrealistically overlit rooms.
5. **Exterior Lighting:** For exterior twilight/night photos, warm golden hour, sunset, or soft twilight glow can be appropriate. For daytime exterior/pool/garden photos, keep the look bright, natural, clean, and realistic. Do not force twilight styling onto daytime interiors.
6. **Listing Accuracy:** The image should still look like the real property. Enhancement is allowed; redesigning the property is not.

### Recommended Simple Image Generation Prompt:

Best practice: keep the actual image-generation prompt concise and concrete. The prompt should tell the model what to preserve, what visual style to apply, what aspect ratio/framing to use, and what to avoid. Do not over-describe camera brands, lens specs, or long mood language unless the photo specifically needs it.

Use this as the default prompt and customize only the bracketed parts:

```text
Enhance the provided Eden Estate reference photo into a professional DSLR-quality Airbnb/VRBO real estate listing photo.

Preserve the real property exactly: architecture, room layout, furniture placement, windows, doors, ceiling lines, flooring, fireplace/pool/patio geometry, landscape layout, and major decor. Do not redesign the space or add/remove major objects.

Lighting/editing: [For interiors or covered patios, use bright natural daylight, soft realistic sunlight through windows/openings where plausible, clean neutral-to-warm white balance, airy professional real estate exposure, readable shadows, crisp textures, and polished but believable color. Match the bright natural look of Eden Estate photos 98, 101, and 31.]

[For exterior twilight/night photos, use tasteful warm estate lighting, balanced sky detail, and realistic professional architectural photography. For daytime exteriors, use bright natural daylight and realistic color.]

Create a clean 3:2 landscape composition suitable for a 2400x1600 final master after local resizing/cropping. No people, text, watermark, fake sun rays, blown highlights, distorted furniture, or visible AI artifacts.
```

Use short photo-specific additions when helpful, for example: "This is a gym," "This is a pool patio," "This is a winter hot tub scene," or "This is a grand living room with tall windows." Keep those additions factual.

### Exact Airbnb/VRBO-Ready Workflow Used For The 2400x1600 Batch:

The image generator may not output the exact requested pixel dimensions. Treat the generator prompt as an instruction for **aspect ratio, framing, composition, lighting, and image quality**, not as the final sizing step. If it returns a fixed-size image, use local post-processing to normalize the selected result to **2400x1600** before finalizing.

1. **Pick Batch Carefully:** Choose high-value listing photos first: wide interiors, exterior hero shots, pool/patio, hot tub, gym, bedrooms, and other photos where Airbnb/VRBO presentation matters most. Avoid processing a photo if its caption and source image appear mismatched.
2. **Prepare Reference PNGs:** Run:
   ```bash
   node scripts/enhance-photo.js --prepare [ID1] [ID2] [ID3] ...
   ```
   If the image was already archived from a prior enhancement, use the low-res archive source as the reference when appropriate.
3. **Inspect References:** Open/view the prepared references before generating so the prompt matches the real content.
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

### Automated Pipeline Steps (Fast Batch Mode):

To process large batches of photos efficiently, execute steps in parallel inside a single assistant turn.

> [!TIP]
> **Subagent Delegation (If Enabled):** If you feel it is needed, prior to beginning work, let me know if you think it's a good idea to use subagents for the work that needs to be done. If so, the primary agent (you) can spawn parallel subagents, delegating a smaller subset of photo IDs (e.g., 3 to 5 per subagent) to each. Subagents can run the `--prepare` and `generate_image` steps concurrently or do any other work you need them to do.

1. **Prepare Batch:** Run the orchestrator script to auto-generate reference PNGs and print customized prompts for each target image:
   ```bash
   node scripts/enhance-photo.js --prepare [ID1] [ID2] [ID3] ...
   ```
2. **Parallel Upscale:** Run the image generation tool in **parallel** when the environment supports it, using the generated prompts from step 1 plus the lighting/style guidance above.
3. **Normalize Before Finalize:** For Airbnb/VRBO-ready batches, normalize the selected generated outputs to **2400x1600, 3:2 landscape** before finalizing.
4. **Finalize & Rebuild:** Once all upscaled images are generated, run the finalizer script to auto-convert to AVIF, archive low-res files, clean up stale responsive formats, and automatically rebuild the main gallery JSON data and the interactive visual quality dashboard at `public/quality-audit.html` (which can be accessed locally at http://localhost:3000/quality-audit.html during development):
   ```bash
   node scripts/enhance-photo.js --finalize [ID1] [ID2] [ID3] ...
   ```
5. **Post-Verify Cleanup:** Only after verifying the new files, remove old responsive variants for those exact IDs if any remain outside the enhanced set. Keep archived originals in `public/gallery/lowres_archive/`.


```
