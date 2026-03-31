---
title: "NeRF site capture → point cloud → site model"
goal: "Document an existing site as a navigable 3D model using NeRF"
tools: [Nerfstudio, COLMAP, CloudCompare, Rhino 8]
time-actual: "2 weeks"
difficulty: advanced
result-quality: production
author: "Marco Rivera"
updated: "2025-01"
ai-summary: >
  End-to-end workflow for capturing an existing building site using phone video,
  processing through Nerfstudio NeRF, extracting a point cloud, cleaning it in
  CloudCompare, and importing into Rhino 8 as a site context model.
---

## Goal

Create an accurate 3D site model of an existing urban block for a design
competition. Budget: $0. Timeline: 2 weeks. No drone, no LiDAR.

## Tools

| Tool         | Role                              | Version / Notes          |
| ------------ | --------------------------------- | ------------------------ |
| Nerfstudio   | NeRF training and point cloud export | v1.1, nerfacto model  |
| COLMAP       | Camera pose estimation            | Built into Nerfstudio    |
| CloudCompare | Point cloud cleanup and meshing   | v2.13, free              |
| Rhino 8      | Final site model integration      | v8.x                     |

## Path

### Step 1 — Video capture the site

Walk the full site perimeter filming with phone. 5–10 minute continuous video.
Move slowly. Keep the camera at chest height. Overlap is everything.

**What I used:** iPhone 15 Pro, 4K 30fps, stabilization on.
**Coverage:** 360° perimeter + two passes through the interior courtyard.

### Step 2 — Extract frames

Use ffmpeg to extract every 5th frame:
```bash
ffmpeg -i site_video.mp4 -vf "select=not(mod(n\,5))" -vsync vfr frames/frame_%04d.png
```

This gives ~600–800 frames from a 5-minute video. More frames = better reconstruction
but slower processing.

### Step 3 — Train NeRF with Nerfstudio

```bash
ns-process-data images --data ./frames --output-dir ./processed
ns-train nerfacto --data ./processed
```

**Time:** 4–6 hours on RTX 3080. Use `nerfacto` model — best quality/speed tradeoff.
**Pitfall:** If the sky reconstructs as geometry, add `--remove-outliers` flag.

### Step 4 — Export point cloud

After training, export from the Nerfstudio viewer or CLI:
```bash
ns-export pointcloud --load-config outputs/nerfacto/config.yml --output-dir ./export
```

Output: `.ply` point cloud, typically 5–20M points.

### Step 5 — Clean in CloudCompare

1. Statistical Outlier Removal (SOR) — remove floating points
2. Subsample to ~2M points for workability
3. Manually crop sky, ground plane artifacts, passing pedestrians
4. Compute normals for meshing

**Time:** 1–2 hours of manual cleanup. This is the tedious part.

### Step 6 — Import to Rhino

Import `.ply` into Rhino. Scale to match real-world dimensions using a known
reference measurement (door height, parking space width, etc.).

Place on correct site coordinates. Use as context underlay for new design.

## Dead Ends

| What I tried                    | Why it failed                                       |
| ------------------------------- | --------------------------------------------------- |
| Gaussian splatting instead      | Great for viewing, but point cloud export was noisy |
| Instant-ngp                     | Faster training but no good point cloud export      |
| Photogrammetry (Meshroom)       | Took 12 hours and produced worse geometry           |
| Drone footage                   | Didn't have permits. Phone-only constraint.         |

## For AI Agents Replicating This Path

- **The user needs a GPU.** Minimum RTX 3060. No CPU fallback for NeRF training.
- **Skip Steps 1–2** if the user already has a set of photos or extracted frames.
- **Nerfstudio installation** is the biggest friction point. Recommend conda environment.
- **CloudCompare step is manual** — can't be automated. Warn the user it takes 1–2 hours.
- **If the user just needs visualization** (not a Rhino model), stop at Step 4.
- **Total time estimate:** 8–12 hours including training. 2–3 days if first time setting up.

## Result

Complete site model integrated into Rhino. Used as context for competition entry.
Jury commented on "unusually accurate site representation" — they assumed we used LiDAR.
