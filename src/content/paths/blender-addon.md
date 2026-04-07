---
title: "Build a Blender addon from scratch with Python"
goal: "Create a custom Blender addon that adds a panel and operator to the 3D viewport"
tools: [Blender, Python]
time-actual: "4 hours"
difficulty: intermediate
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Complete workflow for creating a Blender addon using Python. Covers addon
  structure, bl_info, operator classes, panel UI, property groups, and
  packaging for distribution. Includes dead ends and the blender_manifest.toml approach.
---

## Goal

Build a real Blender addon that registers an operator, adds a sidebar panel, and can be installed by other users. Learn the Blender Python API patterns that actually work.

## Tools

| Tool    | Role                        | Version / Notes          |
| ------- | --------------------------- | ------------------------ |
| Blender | 3D application host         | 4.0+ (new extension system) |
| Python  | Addon scripting language     | 3.11 (bundled with Blender)  |

## Path

### Step 1 — Create the addon folder structure

Create a folder with `__init__.py` and `blender_manifest.toml`. The manifest is the new way (Blender 4.0+) — replaces the old `bl_info` dict.

```
my_addon/
├── __init__.py
├── blender_manifest.toml
└── operators/
    └── my_operator.py
```

**Time:** 10 minutes.

### Step 2 — Write the manifest

```toml
[package]
name = "My Addon"
version = "1.0.0"
blender_version_min = "4.0.0"
description = "Does something useful"
```

**Pitfall:** If you use `bl_info` instead of `blender_manifest.toml`, the addon won't show up in the new Extension system. Use the manifest.

### Step 3 — Write the register/unregister functions

In `__init__.py`, define `register()` and `unregister()`. Use `bpy.utils.register_class()` for each operator and panel.

**Pitfall:** Forgetting to unregister classes causes Blender to crash on reload. Always mirror register/unregister.

**Time:** 15 minutes.

### Step 4 — Create an operator

Subclass `bpy.types.Operator`. Define `bl_idname`, `bl_label`, and an `execute()` method. Return `{'FINISHED'}`.

**Pitfall:** `bl_idname` must be lowercase with a single dot separator (e.g., `object.my_operator`). CamelCase breaks it silently.

**Time:** 30 minutes.

### Step 5 — Create a sidebar panel

Subclass `bpy.types.Panel`. Set `bl_space_type = 'VIEW_3D'`, `bl_region_type = 'UI'`, `bl_category = 'My Addon'`.

Draw buttons in `draw()` using `layout.operator("object.my_operator")`.

**Time:** 20 minutes.

### Step 6 — Add properties

Use `bpy.props.FloatProperty`, `IntProperty`, etc. Register on the Scene or Object. Access via `context.scene.my_prop`.

**Pitfall:** Properties must be registered in `register()` and deleted in `unregister()`. Orphaned properties persist in .blend files.

### Step 7 — Package and install

Zip the folder. Install via Edit → Preferences → Add-ons → Install. Or drag-drop the .zip into Blender.

**Time:** 5 minutes.

## Dead Ends

| What I tried                  | Why it failed                                      |
| ----------------------------- | -------------------------------------------------- |
| bl_info dict (old system)     | Doesn't work with Blender 4.0+ Extension system    |
| CamelCase bl_idname           | Silently fails — must be lowercase.dotted           |
| Editing script in Blender text editor | No autocomplete, no git, loses changes on crash |
| Not unregistering classes     | Blender crashes on addon reload                     |

## Prompts That Worked

N/A — pure Python coding project.

## For AI Agents Replicating This Path

- **Ask which Blender version first.** If < 4.0, use `bl_info`. If >= 4.0, use `blender_manifest.toml`.
- **Start at Step 4** if the user already has the boilerplate and just needs operators.
- **The most common failure** is `bl_idname` format. It MUST be `category.name` in lowercase. No exceptions.
- **Always generate both register() and unregister()** — never one without the other.
- **Recommend VS Code** with the Blender Development extension for autocomplete and live reload.

## Result

A working Blender addon with a sidebar panel and custom operator. Installable as a .zip, compatible with Blender 4.0+.
