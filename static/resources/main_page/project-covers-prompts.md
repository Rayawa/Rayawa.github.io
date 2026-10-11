# 新项目配图生成记录

使用内置 image_gen 工具生成。图像为项目概念插画，不是应用截图；三语首页与项目介绍页共用。

最终文件：`elvacos.webp`、`loci.webp`、`complexsweeper.webp`。网页资源采用 1024px 宽 WebP；原始 PNG 保留在 Codex generated_images 中。

## elvacos

```text
Use case: stylized-concept.
Asset type: a production-ready landscape project-card cover illustration for a dark personal developer portfolio, 16:9 horizontal canvas, ideally 1536x864.
Style: refined minimalist editorial illustration, clean nearly-flat geometric forms with very restrained shallow isometric depth; crisp edges, matte surfaces, subtle soft light. A simple cohesive visual story, not a logo pasted next to a wordmark. Solid deep navy background (#0b172d to #13233a), a tiny amount of atmospheric light, abundant quiet negative space. Clear at thumbnail size.
Composition: one compact scene occupying roughly the middle 60% of the width, all main content comfortably within the central 70% of the height so a 2.1:1 card crop remains useful. Keep the upper-left corner clear for the website's category pill. Fill the canvas edge to edge with the background; no border or rounded frame.
Constraints: no project title, no marketing text, no UI screenshot, no device frame, no large lettermark, no watermark, no people, no photographic clutter, no elaborate particle effects, no photorealistic rendering.
Project: ElvaCos / 绮秀, an offline-first personal cosplay planner.
Subject: a delicate pale-pink cosplay garment on a simple hanger, accompanied by a compact preparation checklist card with three simple check marks and a small ribbon; these form one carefully arranged scene that reads as preparing a costume for an event. Use rose-pink and soft lavender accents with pale ivory details. Clean shapes and very few elements, stylish and understated, no anime character or mascot. No readable text or words anywhere.
```

## loci

```text
Use case: stylized-concept.
Asset type: a production-ready landscape project-card cover illustration for a dark personal developer portfolio, 16:9 horizontal canvas, ideally 1536x864.
Style: refined minimalist editorial illustration, clean nearly-flat geometric forms with very restrained shallow isometric depth; crisp edges, matte surfaces, subtle soft light. A simple cohesive visual story, not a logo pasted next to a wordmark. Solid deep navy background (#0b172d to #13233a), a tiny amount of atmospheric light, abundant quiet negative space. Clear at thumbnail size.
Composition: one compact scene occupying roughly the middle 60% of the width, all main content comfortably within the central 70% of the height so a 2.1:1 card crop remains useful. Keep the upper-left corner clear for the website's category pill. Fill the canvas edge to edge with the background; no border or rounded frame.
Constraints: no project title, no marketing text, no UI screenshot, no device frame, no large lettermark, no watermark, no people, no photographic clutter, no elaborate particle effects, no photorealistic rendering.
Project: Loci, a local app for places and memories from repeated visits.
Subject: a small folded map with sparse, elegant contour lines; a single mint-green location flag is the main focus, and a short dotted path connects two subtle visit dots and one small blank memory-note card. An intimate record of returning to a place, not a navigation dashboard. Use muted mint, jade and warm ivory accents. Simple, calm and balanced; only a few objects. No readable text or words anywhere.
```

## complexsweeper

```text
Use case: stylized-concept.
Asset type: a production-ready landscape project-card cover illustration for a dark personal developer portfolio, 16:9 horizontal canvas, ideally 1536x864.
Style: refined minimalist editorial illustration, clean nearly-flat geometric forms with very restrained shallow isometric depth; crisp edges, matte surfaces, subtle soft light. A simple cohesive visual story, not a logo pasted next to a wordmark. Solid deep navy background (#0b172d to #13233a), a tiny amount of atmospheric light, abundant quiet negative space. Clear at thumbnail size.
Composition: one compact scene occupying roughly the middle 60% of the width, all main content comfortably within the central 70% of the height so a 2.1:1 card crop remains useful. Keep the upper-left corner clear for the website's category pill. Fill the canvas edge to edge with the background; no border or rounded frame.
Constraints: no project title, no marketing text, no UI screenshot, no device frame, no large lettermark, no watermark, no people, no photographic clutter, no elaborate particle effects, no photorealistic rendering.
Project: ComplexSweeper, Minesweeper where nearby +1, −1, +i and −i mines sum as complex numbers.
Subject: one compact, beautifully clear 5-by-5 minesweeper board, slightly tilted in shallow isometric perspective, with most cells covered and a small cluster revealed. Four small flags in amber, coral, blue and purple give the four mine types. In the revealed cluster place just three crisp mathematical clues "1", "0", and "√2" on separate tiles; all other revealed tiles blank. No explosions, no realistic bombs, no giant text, no wordmark. Use icy blue board edges and subtle indigo accents, with very restrained four flag colors. Keep it sparse and immediately readable as a puzzle board. The only allowed text is the three small mathematical clues on board tiles.
```

## ElvaCos 最终精简指令

```text
Use case: precise-object-edit.
Edit target: the provided ElvaCos cosplay-planning cover.
Simplify the scene drastically while keeping the same dark navy background, warm rose/lavender palette, landscape canvas and softly lit illustration style. Keep ONLY TWO primary objects: a simplified pink cosplay dress on a simple hanger, and a clean small checklist clipboard bearing three check marks. Dress design should have one bow, simple broad fabric panels and very few folds, not intricate layers. Replace the decorative rack with one unobtrusive short horizontal hanging rail. The clipboard should have only three checkboxes, no flowers, bows or fan pictures.
Remove all flowers, petals, jewelry, accessory boxes, suitcases, ribbons strewn across the floor, and other small decorations. No additional objects. Generous negative space, compact balanced arrangement within the central 65% of the canvas, central 70% of height, large quiet area in the upper-left for a website category pill. Crisp and simple enough to read at 400x200 pixels. No text, wordmark, letters, watermark or border. Preserve the background color and image dimensions.
```
