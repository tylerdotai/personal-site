# Personal Site

Terminal-style personal website for Tyler Delano, built as a minimal portfolio and project index.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](#)

## Live Demo

- Live site: `https://tylerdotai.github.io/personal-site`
- Repository: `https://github.com/tylerdotai/personal-site`

## About

This repo powers Tyler Delano's interactive terminal portfolio. Type commands or use the visible shortcuts to explore current projects and contact information.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Hosting | GitHub Pages |

## Features

### Site Content
- Skippable terminal boot sequence, command history, autocomplete, and shortcuts
- Featured links to Agent Builders Club, Agent Loop System, and Worst Captcha Challenge
- `cat homelab`, `cat stack`, and terminal Easter eggs

### Developer Experience
- Minimal App Router structure for fast edits
- Standard Next.js scripts for local development and builds

## Project Structure

```text
src/app/page.tsx      Terminal entry point
src/components/Terminal.tsx  Terminal commands and content
src/app/layout.tsx    Root layout and metadata
src/app/globals.css   Global styles
tests/terminal.e2e.mjs  Browser regression contract
package.json          Scripts and dependencies
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/tylerdotai/personal-site.git
cd personal-site
npm ci
```

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`: install, build the static export in `out/`, and publish that artifact to GitHub Pages. The Pages URL uses the `/personal-site/` base path from `next.config.ts`. The existing `tylerdotai.com` website is a separate project and is not changed by this workflow.

- Live site: `https://tylerdotai.github.io/personal-site`
- Repository: `https://github.com/tylerdotai/personal-site`

## Usage

```bash
npm run dev
```

Additional commands:

```bash
npm run build
npm run lint
npx tsc --noEmit
```

Browser checks require Playwright available to Node and a Chrome binary. From this workspace, start `npm run dev -- --port 8138`, then run `node --test --test-reporter=spec tests/terminal.e2e.mjs`. Set `SITE_URL` to exercise a published Pages URL instead. Screenshots and a test log can be saved under `artifacts/e2e/` (ignored by git); for example: `mkdir -p artifacts/e2e && node --test --test-reporter=spec tests/terminal.e2e.mjs > artifacts/e2e/results.txt 2>&1`.

## Current Limitations

- Intentionally static; project descriptions are edited in `src/components/Terminal.tsx`.

## Roadmap

- Keep featured links current and working.

## License

No license has been added yet.
