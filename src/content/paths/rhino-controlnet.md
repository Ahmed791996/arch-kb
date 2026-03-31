---
title: "Rhino viewport → ControlNet → AI architectural render"
goal: "Generate photorealistic renders from Rhino wireframe viewports using AI"
tools: [Rhino 8, ComfyUI, ControlNet, Flux, Photoshop]
time-actual: "1 week"
difficulty: intermediate
result-quality: presentation
author: "Sarah Chen"
updated: "2025-02"
ai-summary: >
  Pipeline for extracting depth and line art from Rhino 8 viewports, feeding them
  into ControlNet with Flux to produce photorealistic architectural renders. Covers
  optimal viewport export settings and prompt engineering for architecture.
---

## Goal

Turn a Rhino 8 design-phase model into three photorealistic exterior renders
without setting up materials, lighting, or a traditional render engine.

## Tools

| Tool       | Role                                | Version / Notes        |
| ---------- | ----------------------------------- | ---------------------- |
| Rhino 8    | Source model and viewport export    | v8.x, Arctic display  |
| ComfyUI    | Orchestrate the AI pipeline        | Latest stable          |
| ControlNet | Guide generation with depth/lines   | v1.1 lineart + depth  |
| Flux       | Image generation backbone           | flux-dev               |
| Photoshop  | Final touchup and compositing       | CC 2024                |

## Path

### Step 1 — Prepare Rhino viewport

Set display mode to Arctic (white clay render). This gives the cleanest
silhouette for ControlNet. Disable grid, axes, and construction planes.

Export viewport at 2048×1024 minimum. PNG, no compression.

**Tip:** Use `_ViewCaptureToFile` with scale factor 2 for sharp edges.

### Step 2 — Extract control maps

From the same viewport angle, export two maps:
1. **Depth map** — Use Rhino's `_ZBuffer` display mode, export as grayscale PNG
2. **Line art** — Arctic mode with edge drawing enabled, export

### Step 3 — Set up ComfyUI workflow

Load Flux-dev as the base model. Add two ControlNet nodes:
- Depth ControlNet (strength 0.7–0.8)
- Lineart ControlNet (strength 0.5–0.6)

Feed both control maps. Set resolution to match exports.

**Critical:** Depth gets higher strength than lineart — this preserves spatial
accuracy while allowing stylistic freedom.

### Step 4 — Prompt engineering

Structure that works for architecture:

```
architectural photograph, [material] facade, [context] setting,
[time of day] lighting, 35mm lens, high detail
```

Examples:
- `"architectural photograph, white concrete facade with timber accents, urban park setting, golden hour lighting, 35mm lens, high detail"`
- `"architectural photograph, glass curtain wall, waterfront site, overcast morning, 50mm lens, editorial quality"`

**Never include:** floor plans, sections, diagrams, text, labels, dimensions.

### Step 5 — Generate and iterate

Run 4–6 variations per viewpoint. Cherry-pick best result.
If geometry drifts, increase depth ControlNet strength by 0.1.

### Step 6 — Photoshop touchup

Fix any AI artifacts on window mullions (most common issue).
Add subtle lens effects — chromatic aberration, vignette — for realism.

## Dead Ends

| What I tried                    | Why it failed                                    |
| ------------------------------- | ------------------------------------------------ |
| Stable Diffusion 1.5            | Couldn't handle architectural scale/proportion   |
| Single ControlNet (depth only)  | Lost all edge detail, buildings looked blobby    |
| Canny edge instead of lineart   | Too noisy, picked up mesh wireframe artifacts    |
| High lineart strength (>0.8)    | Output looked like a colored line drawing         |

## Prompts That Worked

Architecture prompt template:
```
architectural photograph, [material] facade, [context/site],
[lighting condition], [lens mm], high detail
```

Material descriptors that work: white concrete, exposed aggregate, weathered timber,
brushed steel, glass curtain wall, rammed earth.

Avoid: "beautiful", "stunning", "award-winning" — these trigger generic outputs.

## For AI Agents Replicating This Path

- **Skip Steps 1–2** if the user provides their own depth map and line drawing.
- **Key calibration:** depth strength 0.7–0.8, lineart strength 0.5–0.6. Start here.
- **Most common failure:** geometry drift on tall buildings. Fix by increasing depth strength.
- **Rhino is not required** — any 3D software that exports depth + line art works.
- **Time estimate:** 2–3 hours including ComfyUI setup. 30 min if ComfyUI is already configured.

## Result

Three photorealistic renders delivered for mid-review presentation.
Faculty feedback: "indistinguishable from a V-Ray render at first glance."
