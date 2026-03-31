---
title: "ComfyUI batch pipeline for architectural concept renders"
goal: "Generate 50+ consistent concept renders from a single massing model"
tools: [ComfyUI, Flux, ControlNet, Blender, Python]
time-actual: "4 days"
difficulty: advanced
result-quality: presentation
author: "Lina Park"
updated: "2025-03"
ai-summary: >
  Automated ComfyUI pipeline that takes Blender viewport renders of a massing model
  and batch-generates consistent architectural concept renders. Uses Flux + ControlNet
  with a Python script for prompt variation and queue management.
---

## Goal

Generate a large set of consistent concept renders for a housing competition.
50+ images across 5 viewpoints × 10 material/atmosphere variations.
Manual rendering would take days. AI batch pipeline did it in hours.

## Tools

| Tool       | Role                                  | Version / Notes      |
| ---------- | ------------------------------------- | -------------------- |
| Blender    | Massing model + viewport renders      | 4.0+, EEVEE          |
| ComfyUI    | AI generation pipeline                | Latest + Manager     |
| Flux       | Generation backbone                   | flux-dev             |
| ControlNet | Depth-guided generation               | v1.1 depth           |
| Python     | Batch queue script + prompt templating| 3.10+                |

## Path

### Step 1 — Prepare massing model in Blender

Simple box massing only. No materials, no textures. White or clay shader.
Set up 5 camera angles: 2 eye-level, 2 aerial, 1 worm's-eye.

Export depth pass from each camera using Blender compositor:
```
Render Layers → Normalize → File Output (OpenEXR → PNG conversion)
```

### Step 2 — Build ComfyUI base workflow

Single workflow that takes:
- Input: depth map PNG
- Input: text prompt (from variable)
- Output: generated image

Use Flux-dev + ControlNet depth. Strength 0.75.
Resolution: 1536×1024 (landscape) or 1024×1536 (portrait).

Save workflow as `base_workflow.json`.

### Step 3 — Create prompt template system

Python script that generates prompt variations:

```python
materials = ["white concrete", "timber and glass", "dark brick",
             "weathered corten steel", "rammed earth"]
atmospheres = ["morning fog", "harsh midday sun", "golden hour",
               "blue twilight", "overcast diffuse"]
contexts = ["dense urban", "suburban park edge", "waterfront",
            "hillside with vegetation", "industrial conversion"]

# Generate all combinations
for m in materials:
    for a in atmospheres:
        for c in contexts:
            prompt = f"architectural photograph, {m} facade, {c}, {a} lighting, 35mm, high detail"
```

### Step 4 — Batch queue with ComfyUI API

```python
import requests
import json

def queue_prompt(workflow, prompt_text, depth_image_path):
    workflow["6"]["inputs"]["text"] = prompt_text
    workflow["12"]["inputs"]["image"] = depth_image_path
    requests.post("http://127.0.0.1:8188/prompt",
                  json={"prompt": workflow})
```

Queue all 50+ combinations. ComfyUI processes them sequentially.

**Time:** ~2 min per image on RTX 3080. 50 images ≈ 100 minutes.

### Step 5 — Curate and organize

Output lands in numbered folders. Review all outputs.
Delete obvious failures (typically 10–15% have artifacts).
Organize by viewpoint → material → atmosphere.

## Dead Ends

| What I tried                     | Why it failed                                     |
| -------------------------------- | ------------------------------------------------- |
| Midjourney batch via Discord bot | Rate limited, inconsistent style across batches   |
| Stable Diffusion XL              | Couldn't maintain architectural scale consistently|
| No ControlNet (prompt only)      | Every image had different building geometry        |
| Canny edge instead of depth      | Too rigid, outputs looked traced rather than real  |

## For AI Agents Replicating This Path

- **The user needs ComfyUI installed and running.** This is the biggest setup barrier.
- **Skip Steps 1** if the user has depth maps from any source (Rhino, SketchUp, etc.).
- **The Python scripting (Steps 3–4) is optional** — the user can manually queue prompts.
  But for 50+ images, scripting saves hours.
- **Key parameter:** ControlNet depth strength 0.75. Lower = more creative, higher = more accurate.
- **Common failure:** inconsistent style across batch. Fix by adding a style suffix to every prompt
  (e.g., "editorial architecture photography style, Dezeen").
- **Minimum GPU:** RTX 3060 12GB for Flux. 8GB cards need quantized model.

## Result

62 concept renders generated in 3 hours. 48 usable after curation.
Presented as a material/atmosphere matrix. Competition jury praised the
"systematic exploration of materiality."
