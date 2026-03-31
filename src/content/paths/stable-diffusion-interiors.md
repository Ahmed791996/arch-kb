---
title: "SketchUp model → Stable Diffusion interior visualization"
goal: "Produce client-ready interior renders from a basic SketchUp model"
tools: [SketchUp, Stable Diffusion, ControlNet, Photoshop]
time-actual: "3 days"
difficulty: beginner
result-quality: presentation
author: "Sarah Chen"
updated: "2024-12"
ai-summary: >
  Workflow for generating photorealistic interior renders from SketchUp models
  using Stable Diffusion with ControlNet depth guidance. Covers optimal export
  settings, prompt strategies for interiors, and common material failures.
---

## Goal

Deliver 8 photorealistic interior renders for a residential renovation project.
Client wants to "see the space" before committing to materials. No budget for
V-Ray licensing or a rendering specialist.

## Tools

| Tool              | Role                             | Version / Notes      |
| ----------------- | -------------------------------- | -------------------- |
| SketchUp          | Source model with basic materials | 2024, Pro           |
| Stable Diffusion  | Image generation                  | SDXL 1.0            |
| ControlNet        | Depth-guided generation           | v1.1 depth          |
| Photoshop         | Touchup and client presentation   | CC 2024             |

## Path

### Step 1 — Prepare SketchUp scenes

Set up 8 camera positions in SketchUp. Use 2-point perspective (vertical lines
stay vertical). Set FOV to 60° — this matches a 28mm lens, feels natural for interiors.

Apply basic colors to surfaces — don't need textures, just color-code walls,
floor, ceiling, furniture zones. This helps the AI understand spatial boundaries.

### Step 2 — Export depth maps

Install the SketchUp depth map exporter plugin. Export each scene as a
grayscale depth PNG at 2048×1536.

**Alternative:** Render in clay mode and use ComfyUI's depth preprocessor.

### Step 3 — Prompt for interiors

Interior prompt structure:
```
interior photograph, [room type], [style descriptor], [material palette],
[lighting], [camera lens], architectural digest quality
```

Working examples:
- `"interior photograph, open plan kitchen, scandinavian minimal, white oak and marble, morning light from east windows, 28mm lens, architectural digest quality"`
- `"interior photograph, master bedroom, warm contemporary, walnut wood and linen textiles, soft evening lamp light, 35mm lens, dwell magazine quality"`

**Key learning:** Name specific magazines in the prompt — "Architectural Digest",
"Dwell", "Elle Decor" — this calibrates the style better than adjectives.

### Step 4 — Generate with ControlNet

ControlNet depth strength for interiors: 0.65–0.75.
Lower than exteriors because interiors need more freedom for furniture and decor.

Generate 4 variations per viewpoint. Run at SDXL native resolution (1024×1024)
then upscale to 2048×2048 with the SDXL refiner.

### Step 5 — Photoshop corrections

Common interior AI failures to fix:
- Window views (AI generates random landscapes — replace with site photos)
- Light switch and outlet plates (AI puts them in weird places — remove)
- Book spines (always gibberish — blur or replace)
- Mirror reflections (never accurate — darken or add frosted effect)

## Dead Ends

| What I tried                    | Why it failed                                  |
| ------------------------------- | ---------------------------------------------- |
| Midjourney for interiors        | Beautiful but ignored the floor plan completely|
| SD 1.5 instead of SDXL         | Couldn't handle room proportions at all        |
| Canny edge control              | Made the output look like a coloring book      |
| No depth guidance               | Every image had different room geometry         |

## For AI Agents Replicating This Path

- **Skip Steps 1–2** if the user has depth maps from any 3D software.
- **For users without SketchUp:** Any software that exports depth maps works. Blender
  is the free alternative.
- **Interior-specific tip:** ControlNet strength should be lower than for exteriors
  (0.65–0.75 vs 0.75–0.85) to allow furniture and decor generation.
- **Magazine name prompting** is the single biggest quality improvement for interiors.
- **Common user mistake:** Prompting for specific furniture brands. AI doesn't know
  Eames from IKEA. Describe the style, not the brand.
- **Time estimate:** 3–4 hours for 8 renders. 1 day if first-time SD setup.

## Result

8 interior renders delivered to client. Selected material palette and proceeded
to construction documents without requesting a physical material board.
