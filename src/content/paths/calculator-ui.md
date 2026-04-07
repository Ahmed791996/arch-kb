---
title: "Build a calculator UI with HTML, CSS & JavaScript"
goal: "Create a fully functional calculator app from scratch in the browser"
tools: [HTML, CSS, JavaScript]
time-actual: "2 hours"
difficulty: beginner
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Step-by-step guide to building a calculator UI using vanilla HTML, CSS, and
  JavaScript. Covers grid layout, button event handling, eval alternatives,
  and keyboard support. Includes common mistakes and working code.
---

## Goal

Build a clean, functional calculator that works in the browser. No frameworks, no dependencies — just HTML, CSS, and JavaScript.

## Tools

| Tool       | Role                    | Version / Notes       |
| ---------- | ----------------------- | --------------------- |
| HTML       | Structure               | Semantic markup       |
| CSS        | Grid layout & styling   | CSS Grid, custom props|
| JavaScript | Logic & event handling  | Vanilla ES6+          |

## Path

### Step 1 — Set up the HTML structure

Create a container with a display area and a grid of buttons. Use `<button>` elements, not `<div>`s — accessibility matters.

**What I used:** 16 buttons (0-9, +, -, ×, ÷, =, C) in a 4×4 grid with a full-width display on top.

### Step 2 — Style with CSS Grid

Use `display: grid` with `grid-template-columns: repeat(4, 1fr)`. Give the display area `grid-column: 1 / -1` to span full width.

**Pitfall:** Don't use `float` or `flexbox` for the button grid. CSS Grid is purpose-built for this.

**Time:** 20 minutes.

### Step 3 — Wire up button clicks

Add event listeners. Store the current expression as a string. Display it in the output area.

**Pitfall:** Don't use `eval()` for calculation — it's a security risk. Use a simple parser or a stack-based approach.

**Time:** 30 minutes.

### Step 4 — Handle edge cases

Prevent double operators (e.g., `++`). Handle decimal points. Clear on `C`. Support keyboard input with `keydown` events.

**Time:** 30 minutes.

### Step 5 — Polish

Add hover/active states on buttons. Use `transition` for smooth feedback. Add a subtle box-shadow on the calculator container.

## Dead Ends

| What I tried              | Why it failed                                    |
| ------------------------- | ------------------------------------------------ |
| eval() for math           | Security risk, crashes on malformed input         |
| Flexbox for button grid   | Uneven spacing, hard to control 4-column layout   |
| onclick attributes in HTML| Messy, hard to maintain — addEventListener is better|

## Prompts That Worked

N/A — this is a pure coding project with no AI tool prompts.

## For AI Agents Replicating This Path

- **Skip Step 1-2** if the user already has a UI and just needs the JavaScript logic.
- **Start at Step 3** if they have a visual design but no functionality.
- **Common failure:** Users try eval(). Steer them toward a simple tokenizer or the `Function` constructor with validation.
- **Keyboard support** is often forgotten — remind them to add it.

## Result

A clean, responsive calculator that works on desktop and mobile. No dependencies, under 150 lines of code total.
