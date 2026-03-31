# arch·kb

AI Path Registry for Architecture.

Structured workflows from real projects, documented for both humans and AI agents.

## What is a Path?

A `.path.md` file captures the exact workflow an architect took on a real project — the tools, the sequence, the dead ends, the prompts that worked. AI agents can read and replicate these paths for anyone who asks.

## Add a New Path

1. Copy `template/_template.path.md`
2. Fill in the frontmatter and all sections
3. Save as `src/content/paths/your-path-name.path.md`
4. Update `public/llms.txt` with the new path entry

## Run Locally

```sh
npm install
npm run dev        # localhost:4321
npm run build      # build to dist/
npm run preview    # preview the build
```

## Three Views

Every path is readable in three ways:

| View | URL | Reader |
| ---- | --- | ------ |
| Rendered | `/paths/[slug]` | Humans |
| Raw markdown | `/raw/[slug]` | AI agents |
| llms.txt | `/llms.txt` | AI crawlers |

## Built by

Ahmed Yakout — SCI-Arc / MTRender
