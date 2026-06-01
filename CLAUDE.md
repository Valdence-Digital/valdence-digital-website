# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available gstack skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/document-generate`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

## Commands

```bash
pnpm dev        # Start dev server (http://localhost:3000)
pnpm build      # Production build (outputs to .next/standalone)
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm test       # Run all Jest tests
pnpm test -- __tests__/contact-validation.test.ts  # Run a single test file
```

## Architecture

This is a **one-page marketing website** for Valdence Digital (Yannick Bernard, French freelance full-stack developer). The entire site renders from a single route at `src/app/page.tsx`, which composes all sections sequentially.

### Section order (as rendered)

`Navbar → Hero → Services → WhyUs → Portfolio → About → Reviews → Contact → Footer`

Each section has an HTML `id` used for scroll navigation: `#services`, `#why-us`, `#portfolio`, `#about`, `#reviews`, `#contact`.

### Component layers

- **`src/components/sections/`** — full-width page sections. Most are Server Components except `Navbar` and `Contact` which are `'use client'`.
- **`src/components/ui/`** — shared primitives: `Button`, `SectionWrapper`, `BackToTop`, `ReviewCard`, `SocialLinks`, logos.
- **`src/app/actions/contact.ts`** — Server Action (`'use server'`) that validates with Zod then sends via Nodemailer.
- **`src/lib/contact-validation.ts`** — Zod schema used by both the Client (`Contact.tsx` for inline field errors) and the Server Action. Pure, no side effects.
- **`src/lib/google-places.ts`** — fetches Google Places API with `revalidate: 86400` (ISR). Returns `{ ok: true, reviews }` or `{ ok: false, placeUrl }`.
- **`src/data/reviews.ts`** — static fallback reviews shown when the Google API is unavailable or not configured.

### Key design patterns

- **`SectionWrapper`** wraps every section with consistent `py-12 md:py-20 px-4 md:px-8` padding and a `max-w-6xl mx-auto` inner container.
- **Contact form dual validation**: Zod runs client-side on every keystroke (errors shown on blur) and again server-side in the action. The client imports `contactSchema` directly from `src/lib/contact-validation.ts`.
- **Honeypot spam protection**: a hidden `website` field; if non-empty, the server action silently returns `{ success: true }`.
- **Tech badges in About**: uses `simple-icons` npm package — each icon exports `{ path, hex }` for inline SVG rendering.

### Tailwind theme

Custom colors: `background` (#f5f7f6), `foreground` (#111827), `muted` (#6b7280), `teal` (#0d9488), `teal-dark` (#0f2a27). Custom fonts: `font-sora` (headings) and `font-dm-sans` (body), loaded via `next/font/google` in `layout.tsx`.

### Environment variables

Required for full functionality (see `.env.example`):

| Variable | Purpose |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TO` | OVH SMTP for contact form emails |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Google Places for dynamic reviews |
| `NEXT_PUBLIC_SITE_URL` | Base URL for OG metadata |

### Deployment

Built as `output: 'standalone'`. The Dockerfile uses a two-stage build (builder + runner) producing a minimal image. Deployed on Coolify/OVH. Run locally after build with `node .next/standalone/server.js`.

### Tests

Jest + ts-jest. Tests live in `__tests__/` and cover pure utility functions only:
- `contact-validation.test.ts` — Zod schema edge cases (phone formats, RGPD, honeypot)
- `google-places.test.ts` — `transformReview` mapping and optional field defaults

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
