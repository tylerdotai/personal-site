# Personal Site

Terminal-style personal website for Tyler Delano, built as a minimal portfolio and project index.

## Status

- Active personal site repo
- Live portfolio is public
- Current app is a lightweight Next.js frontend with a simple single-page layout

## About

This project powers a personal site with a stripped-down, terminal-inspired presentation. It highlights featured projects, contact links, and homelab context while keeping the structure intentionally minimal.

## Current Scope

- Hero section with personal bio and contact links
- Featured project links for Flume, Jarvis AI, and Titan AI
- Homelab inventory section
- Minimal App Router Next.js structure for quick edits and deployment

## Built With

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

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

## Development

```bash
npm run dev
```

Additional commands:

```bash
npm run build
npm run start
npm run lint
```

## Deployment

The site is published publicly as a lightweight personal portfolio.

- Live site: `https://tylerdotai.github.io/personal-site`
- Repository: `https://github.com/tylerdotai/personal-site`

## Current Limitations

- The repo does not document the exact deployment pipeline yet
- It is intentionally minimal and does not include a CMS or content system
- The current README had drifted into profile-style copy rather than repo documentation

## Roadmap

- Document the deployment flow clearly
- Add richer project case studies and screenshots
- Improve SEO and social metadata
- Expand the site beyond the current one-page layout

## License

No license has been added yet.
