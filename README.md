# Personal Site

Terminal-style personal website for Tyler Delano, built as a minimal portfolio and project index.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](#)

## Live Demo

- Live site: `https://tylerdotai.github.io/personal-site`
- Repository: `https://github.com/tylerdotai/personal-site`

## About

This repo powers a stripped-down, terminal-inspired personal website. It highlights featured projects, contact links, and homelab context while keeping the layout intentionally lightweight and easy to update.

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
- Hero section with personal bio and contact links
- Featured project links for Flume, Jarvis AI, and Titan AI
- Homelab inventory section

### Developer Experience
- Minimal App Router structure for fast edits
- Standard Next.js scripts for local development and builds

## Project Structure

```text
src/app/page.tsx      Main site content
src/app/layout.tsx    Root layout and metadata
src/app/globals.css   Global styles
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
npm install
```

## Deployment

The site is published publicly as a lightweight personal portfolio.

- Live site: `https://tylerdotai.github.io/personal-site`
- Repository: `https://github.com/tylerdotai/personal-site`

## Usage

```bash
npm run dev
```

Additional commands:

```bash
npm run build
npm run start
npm run lint
```

## Current Limitations

- The repo does not document the exact deployment pipeline yet
- It is intentionally minimal and does not include a CMS or content system
- The earlier README read more like a profile page than repo documentation

## Roadmap

- Document the deployment flow clearly
- Add richer project case studies and screenshots
- Improve SEO and social metadata
- Expand the site beyond the current one-page layout

## License

No license has been added yet.
