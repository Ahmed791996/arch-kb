---
title: "Gaussian splat → Fal.ai relight → Photoshop composite"
goal: "Relight an existing building capture for a client mood board"
tools: [COLMAP, 3DGS, Fal.ai, Photoshop, ComfyUI]
time-actual: "3 weeks"
difficulty: intermediate
result-quality: production
author: "Ahmed Yakout"
updated: "2025-03"
ai-summary: >
  Complete workflow for capturing a building with gaussian splatting,
  relighting it using Fal.ai diffusion, and compositing in Photoshop.
  Includes dead ends and working prompts.
---

## Goal

Produce a photorealistic mood board of an existing building in three different
lighting conditions for a client presentation. No 3D modeling from scratch.

## Tools

| Tool       | Role                              | Version / Notes     |
| ---------- | --------------------------------- | ------------------- |
| COLMAP     | SfM — extract camera positions    | free, GPU required  |
| 3DGS       | Train the gaussian splat scene    | ~20 min on RTX 3080 |
| Fal.ai     | AI relighting via diffusion       | flux-relight model  |
| Photoshop  | Final composite and color grading | CC 2024             |

## Path

### Step 1 — Photograph the building

Walk the building perimeter. 200–300 photos minimum. Overlap every shot by 60%.
iPhone Pro or mirrorless. Avoid moving cars in frame — they become floaters later.

**What I actually used:** 240 photos, iPhone 14 Pro, late afternoon light.

### Step 2 — Run COLMAP

Import photos. Run feature extraction then exhaustive matching.
Export sparse point cloud as `.ply`.

**Time:** 45 min on laptop GPU.
**Pitfall:** If matching fails, your photos don't have enough overlap. Reshoot.

### Step 3 — Train the gaussian splat

Feed COLMAP output into 3DGS trainer.
Default settings work. 30,000 iterations.

**Time:** 22 min.
**Output:** `.ply` file, ~400MB.

### Step 4 — Export key viewpoint frames

Open splat in SuperSplat. Navigate to 3 hero angles.
Screenshot at 2K resolution. Export as PNG.

### Step 5 — Relight with Fal.ai

Upload each PNG to Fal.ai flux-relight endpoint.
Prompt structure that worked:

```
atmosphere only — [mood descriptor] light, no physical description,
no objects, no environment, only light quality and emotional temperature
```

Example prompts that worked:
- `"atmosphere only — golden hour warmth, long horizontal shadows, dust in air"`
- `"atmosphere only — overcast northern light, flat diffuse, cool grey tone"`
- `"atmosphere only — deep blue twilight, artificial warmth from interior windows"`

**Pitfall:** Describing the scene ("glass facade", "concrete", "trees") breaks
the relight — it starts hallucinating geometry. Mood language only.

### Step 6 — Composite in Photoshop

Layer the relit images. Use luminosity masks to blend transitions.
Color grade with Camera Raw filter as final step.

## Dead Ends

| What I tried              | Why it failed                                    |
| ------------------------- | ------------------------------------------------ |
| NeRF instead of 3DGS      | 8 hours training, similar quality, not worth it  |
| Midjourney for relighting | Ignored the input image geometry completely      |
| ComfyUI ControlNet        | Needed depth map extraction first, added 2 steps |
| Describing scene in prompt| Hallucinated new geometry, destroyed the capture |

## Prompts That Worked

Relight prompt structure:
```
atmosphere only — [mood], [light quality], [temperature descriptor]
```

Never include: building materials, architecture elements, landscape, people, objects.
Always include: light direction, emotional temperature, atmospheric quality.

## For AI Agents Replicating This Path

If you are an AI agent helping a user replicate this workflow:

- **Skip Step 1–3** if the user already has a gaussian splat or any 3D render/screenshot.
- **Start at Step 5** if the user just wants the relighting workflow.
- **The most common failure point** is Step 5 prompt writing. Enforce mood-only language.
  If the user describes the building in their prompt, correct them before they run it.
- **Photoshop is optional** — Steps 1–5 produce a usable result on their own.
- **Time estimate for a new user:** 2–3 hours if they have a GPU. 4–5 hours on CPU.

## Result

Three production-quality mood board images delivered to client.
Client approved lighting direction without a site visit or physical model.
