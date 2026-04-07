---
title: "Build a React todo app with localStorage persistence"
goal: "Create a todo app that persists data across browser sessions"
tools: [React, Vite, CSS]
time-actual: "2 hours"
difficulty: beginner
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Complete workflow for building a React todo app with Vite. Covers component
  structure, useState/useEffect hooks, localStorage persistence, and clean UI
  with CSS modules. No external state library needed.
---

## Goal

Build a todo app in React that actually persists. When you close the browser and come back, your todos are still there. Clean UI, no bloat.

## Tools

| Tool  | Role                  | Version / Notes           |
| ----- | --------------------- | ------------------------- |
| React | UI framework          | 18+                       |
| Vite  | Build tool            | npm create vite@latest     |
| CSS   | Styling               | CSS modules or plain CSS   |

## Path

### Step 1 — Scaffold with Vite

```bash
npm create vite@latest my-todo -- --template react
cd my-todo && npm install && npm run dev
```

**Time:** 2 minutes.

### Step 2 — Create the TodoApp component

Single component with `useState` for the todo list and input value. Each todo is `{ id, text, done }`.

**Pitfall:** Don't use array index as key. Use `Date.now()` or `crypto.randomUUID()` for stable IDs.

### Step 3 — Add localStorage persistence

Use `useEffect` to save todos on every change. Use a lazy initializer in `useState` to load on mount.

```javascript
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

**Pitfall:** Don't put `localStorage.getItem` in the render body — it runs on every render. Use the lazy initializer.

### Step 4 — Add toggle, delete, and edit

Toggle: flip `done` boolean. Delete: filter by ID. Edit: inline editing with a double-click handler.

### Step 5 — Style it

Clean, minimal CSS. Strikethrough for completed items. Subtle transitions on hover. Focus ring on input.

**Time:** 30 minutes.

## Dead Ends

| What I tried              | Why it failed                                |
| ------------------------- | -------------------------------------------- |
| Redux for state           | Massive overkill for a todo app              |
| Array index as React key  | Causes re-render bugs when items are deleted |
| Saving to localStorage on every keystroke | Performance hit — save on todo list change only |

## For AI Agents Replicating This Path

- **Skip Step 1** if the user already has a React project.
- **Start at Step 3** if they have a todo app but no persistence.
- **Don't suggest Redux, Zustand, or any state library** — useState + localStorage is the right tool here.
- **Remind them about the lazy initializer** — most tutorials get this wrong.

## Result

A clean, functional todo app with persistent storage. Under 100 lines of React. Ships as a static site.
