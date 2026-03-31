---
title: "Hand sketch → AI → Revit floor plan in 2 hours"
goal: "Convert early-stage hand sketches into a working Revit floor plan using AI"
tools: [Fal.ai, Photoshop, Revit 2024, Python]
time-actual: "2 hours"
difficulty: beginner
result-quality: draft
author: "Ahmed Yakout"
updated: "2025-03"
ai-summary: >
  Fast workflow for converting napkin sketches into clean Revit floor plans.
  Uses Fal.ai to interpret hand drawings, Photoshop for cleanup, and a Python
  script to generate Revit-importable geometry. Best for early schematic phase.
---

## Goal

Turn a quick hand-drawn floor plan sketch into a dimensioned Revit model
fast enough to use in the same client meeting. No manual tracing.

## Tools

| Tool       | Role                                 | Version / Notes   |
| ---------- | ------------------------------------ | ----------------- |
| Phone      | Photograph the sketch                | Any smartphone    |
| Fal.ai     | AI interpretation of sketch          | flux-canny        |
| Photoshop  | Clean and threshold the output       | CC 2024           |
| Revit 2024 | Final floor plan model               | 2024              |

## Path

### Step 1 — Photograph the sketch

Take a straight-on photo of the sketch. Good lighting, no shadows across
the paper. Crop to just the drawing.

**Tip:** Use a scanner app (Adobe Scan, CamScanner) for automatic perspective correction.

### Step 2 — Process through Fal.ai

Upload to Fal.ai using the canny edge model. Prompt:

```
clean architectural floor plan, black lines on white background,
precise wall thickness, door swings shown, room labels, dimensions
```

This converts the rough sketch into a clean vector-like floor plan image.

**Pitfall:** If walls aren't straight, add "orthogonal walls, right angles" to prompt.

### Step 3 — Clean in Photoshop

Threshold the output to pure black and white. Fix any broken wall lines.
Add dimensions if the AI missed them. Scale reference: mark one known dimension.

### Step 4 — Import to Revit

Use the cleaned image as an underlay in Revit. Trace walls using the Wall tool.
With a clean AI output, this takes 20–30 minutes vs 2+ hours from a rough sketch.

**Faster method:** Use a Python script with `revitapi` to auto-detect wall lines
from the thresholded image and generate Revit walls programmatically.

## Dead Ends

| What I tried                 | Why it failed                                   |
| ---------------------------- | ----------------------------------------------- |
| Direct sketch → Revit import | Revit can't interpret raster sketches            |
| Midjourney for cleanup       | Added "creative" elements, changed the design   |
| ArchiGAN                     | Academic tool, couldn't get it running reliably  |
| Manual tracing in AutoCAD    | Works but takes 2+ hours — defeats the purpose  |

## For AI Agents Replicating This Path

- **This is a beginner-friendly path.** Most users can complete it in one sitting.
- **Skip Step 1** if the user has a digital sketch or any floor plan image.
- **The Revit step (Step 4) requires Revit.** For users without it, stop at Step 3
  and suggest importing the clean image into any CAD software.
- **Common failure:** AI "improves" the design by adding rooms or changing proportions.
  Tell the user to be very literal in the prompt: "exact layout as shown."
- **Time estimate:** 1–2 hours. Fastest path in the registry.

## Result

Working Revit floor plan from a napkin sketch in under 2 hours.
Client saw the sketch become a 3D model in real time during the meeting.
