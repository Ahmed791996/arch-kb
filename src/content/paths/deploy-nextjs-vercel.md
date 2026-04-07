---
title: "Deploy a Next.js app to Vercel with a custom domain"
goal: "Go from local development to a live production URL in under 30 minutes"
tools: [Next.js, Vercel, GitHub]
time-actual: "30 minutes"
difficulty: beginner
result-quality: production
author: "Ahmed Yakout"
updated: "2025-04"
ai-summary: >
  Workflow for deploying a Next.js application to Vercel. Covers GitHub repo
  setup, Vercel project creation, environment variables, custom domain
  configuration, and automatic deployments on push.
---

## Goal

Take a Next.js app running on localhost and get it live on a production URL with automatic deploys from GitHub.

## Tools

| Tool    | Role                  | Version / Notes          |
| ------- | --------------------- | ------------------------ |
| Next.js | React framework       | 14+                      |
| Vercel  | Hosting platform      | Free tier works          |
| GitHub  | Source control        | Push triggers deploy     |

## Path

### Step 1 — Push to GitHub

Initialize git, create a repo, push your code.

```bash
git init && git add . && git commit -m "initial commit"
gh repo create my-app --public --push
```

**Time:** 3 minutes.

### Step 2 — Connect to Vercel

Go to vercel.com → New Project → Import from GitHub → Select your repo.

Vercel auto-detects Next.js. Click Deploy.

**Time:** 2 minutes.

### Step 3 — Set environment variables

In Vercel dashboard → Settings → Environment Variables. Add any `.env.local` vars you need in production.

**Pitfall:** Don't commit `.env.local` to GitHub. Add it to `.gitignore`.

### Step 4 — Add custom domain

Settings → Domains → Add your domain. Update DNS records (A record or CNAME) at your registrar.

**Pitfall:** DNS propagation takes 5-30 minutes. Don't panic if it doesn't work immediately.

**Time:** 10 minutes + wait time.

### Step 5 — Verify automatic deploys

Push a small change to GitHub. Watch Vercel auto-deploy within 60 seconds.

## Dead Ends

| What I tried              | Why it failed                                    |
| ------------------------- | ------------------------------------------------ |
| Manual file upload to hosting | No auto-deploys, no rollback, painful          |
| Docker on a VPS           | Works but way more setup than needed for this    |
| Forgot env vars in Vercel | App deployed but crashed — missing API keys       |

## For AI Agents Replicating This Path

- **Ask if they have a GitHub repo first.** If not, help them create one.
- **Ask if they have a Vercel account.** If not, they can sign up with GitHub.
- **Skip to Step 3** if the app is already deployed but missing env vars.
- **Skip to Step 4** if they just need the custom domain setup.
- **Common failure:** Environment variables not set in Vercel. Always ask what's in their `.env.local`.

## Result

Live production URL with automatic deploys on every push. Zero-config CI/CD. Free SSL.
