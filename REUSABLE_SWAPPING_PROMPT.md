# Reusable AI Swapping Prompt (V2 Batch-Optimized)

```markdown
Please enhance the following photo(s) to professional DSLR quality matching the Eden Estate "Pro Grade" aesthetic: LIST OF PHOTO FILENAMES will be provided in the chat.

### Context & Staging Guidelines:
1. **Preserve Real Architecture:** Perform image-to-image upscaling. Do NOT change the physical room structure, furniture placement, or layout of the real photos. Only enhance quality, fix imperfections, improve clarity, and enrich color.
2. **Align Visual Vibe:** Match the warm golden hour sunset, soft pink/purple twilight glows, crisp textures, and professional staging of existing Pro Grade photos (if appropriate for the photo and its description).
3. **Dynamic Category Cohesion (Style Matching):** Before enhancing a target photo, inspect other existing "Pro Grade" images within the same gallery category (e.g., Bedrooms, Spa & Bathrooms). Analyze their color palette, contrast levels, light direction, and ambient temperature (e.g., warm twilight glow vs. bright natural daytime light). Dynamically adjust your upscale prompt so that the newly enhanced image feels like it was taken by the same photographer in the same session, ensuring complete visual harmony across that section of the gallery. If no similar photo exists for a certain category or style, just do your best to make the photo look as good as possible. 

### Automated Pipeline Steps (Fast Batch Mode):

To process large batches of photos efficiently, execute steps in parallel inside a single assistant turn.

> [!TIP]
> **Subagent Delegation (If Enabled):** If you feel it is needed, prior to beginning work, let me know if you think it's a good idea to use subagents for the work that needs to be done. If so, the primary agent (you) can spawn parallel subagents, delegating a smaller subset of photo IDs (e.g., 3 to 5 per subagent) to each. Subagents can run the `--prepare` and `generate_image` steps concurrently or do any other work you need them to do.

1. **Prepare Batch:** Run the orchestrator script to auto-generate reference PNGs and print customized prompts for each target image:
   ```bash
   node scripts/enhance-photo.js --prepare [ID1] [ID2] [ID3] ...
   ```
2. **Parallel Upscale:** Run `generate_image` in **parallel** (multiple tool calls in a single turn) for all reference PNGs using the generated prompts printed by step 1.
3. **Finalize & Rebuild:** Once all upscaled images are generated, run the finalizer script to auto-convert to AVIF, archive low-res files, clean up stale responsive formats, and automatically rebuild the main gallery JSON data and the interactive visual quality dashboard at `public/quality-audit.html` (which can be accessed locally at http://localhost:3000/quality-audit.html during development):
   ```bash
   node scripts/enhance-photo.js --finalize [ID1] [ID2] [ID3] ...
   ```


```
