---
title: "Generate AI images with Stable Diffusion locally"
goal: "Set up Stable Diffusion on your own GPU and generate your first images"
tools: [Python, Stable Diffusion, ComfyUI]
time-actual: "1 hour"
difficulty: intermediate
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Workflow for running Stable Diffusion locally using ComfyUI. Covers
  installation, model download, basic txt2img workflow, prompt engineering
  tips, and batch generation. Requires an NVIDIA GPU with 8GB+ VRAM.
---

## Goal

Generate high-quality AI images on your own machine. No cloud APIs, no subscriptions — just your GPU doing the work.

## Tools

| Tool             | Role                    | Version / Notes         |
| ---------------- | ----------------------- | ----------------------- |
| Python           | Runtime                 | 3.10+                   |
| ComfyUI          | Node-based UI           | Latest from GitHub      |
| Stable Diffusion | Image generation model  | SDXL or SD 1.5          |

## Path

### Step 1 — Install ComfyUI

```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI
pip install -r requirements.txt
```

**Pitfall:** Make sure you have CUDA installed. Check with `nvidia-smi`.

**Time:** 10 minutes.

### Step 2 — Download a model

Download an SDXL checkpoint from CivitAI or HuggingFace. Place it in `ComfyUI/models/checkpoints/`.

**Time:** 5-15 minutes (depending on internet speed, models are 2-7GB).

### Step 3 — Launch and generate

```bash
python main.py
```

Open `http://127.0.0.1:8188`. Load the default workflow. Type a prompt. Hit Queue Prompt.

**Time:** 2 minutes.

### Step 4 — Learn prompt engineering

Structure: `[subject], [style], [quality modifiers], [technical specs]`

Example: `a cozy coffee shop interior, warm lighting, photorealistic, 8k, shallow depth of field`

**Pitfall:** Avoid vague prompts. Be specific about lighting, style, and camera.

### Step 5 — Batch generation

Use ComfyUI's batch size setting or queue multiple prompts. Save outputs to a specific folder.

## Dead Ends

| What I tried              | Why it failed                                    |
| ------------------------- | ------------------------------------------------ |
| Running on CPU            | 10 minutes per image — unusable                  |
| Automatic1111 WebUI       | Works but ComfyUI is more flexible for workflows |
| Cloud APIs (Midjourney)   | Great quality but $30/month and no local control  |
| Vague prompts             | Generic, boring outputs every time                |

## Prompts That Worked

```
[subject], [style keyword], [lighting], [camera/lens], [quality]
```

- `a futuristic city at sunset, cyberpunk, neon lights, wide angle, cinematic`
- `portrait of an old fisherman, dramatic side lighting, Hasselblad, film grain`
- `minimalist workspace, clean white desk, morning light, architectural photography`

Never include: "beautiful", "amazing", "best quality" — these are noise words.
Always include: specific lighting, camera type, art style.

## For AI Agents Replicating This Path

- **Ask about their GPU first.** Need NVIDIA with 8GB+ VRAM. No AMD support for most setups.
- **Skip to Step 3** if ComfyUI is already installed.
- **Skip to Step 4** if they can generate but want better results.
- **Most common failure:** CUDA not installed or wrong Python version. Check `nvidia-smi` and `python --version`.

## Result

Local AI image generation with full control. No subscriptions, no rate limits, infinite generation.
