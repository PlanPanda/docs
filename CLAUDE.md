# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SolidPlan user documentation site — a Starlight (Astro) static site serving as the official user manual for the SolidPlan insurance agent application (solidplan.ai). All content is in Thai.

## Source Material

The actual usage guide content is authored and maintained at `../smart/docs/` (outside this repo). This Starlight site transforms that content into a publishable docs site.

The smart/docs structure maps to SolidPlan features:
- **getting-started.md** — onboarding walkthrough
- **login.md** — auth flow (signup, login, password reset)
- **dashboard.md** — yearly heatmap, radar chart, summary stats
- **calendar.md** — appointment planning
- **customer/** — customer management (list, detail, add, activities)
- **package/** — packages, payment (QR PromptPay), billing
- **team/** — friends, org hierarchy, agent profiles
- **settings/** — profile, receipt settings
- **adr/** — architecture decision records for SolidPlan backend

## Commands

```bash
pnpm dev       # Dev server at localhost:4321
pnpm build     # Production build to ./dist/
pnpm preview   # Preview production build locally
```

## Architecture

- **Framework:** Astro 6 + Starlight (docs-focused framework)
- **Content:** MDX/Markdown files in `src/content/docs/`
- **Content config:** `src/content.config.ts` — uses Starlight's `docsLoader` and `docsSchema`
- **Site config:** `astro.config.mjs` — Starlight integration, sidebar, social links
- **Package manager:** pnpm

## Key Conventions

- Starlight auto-routes based on file path: `src/content/docs/guides/example.md` → `/guides/example/`
- Sidebar is manually configured in `astro.config.mjs` (not auto-generated)
- Images go in `src/assets/` (processed by Astro) or `public/` (static)
- Content files use frontmatter: `title`, `description`, and optional `template`

## Brand Positioning

SolidPlan is NOT a CRM. It is a system that helps sales teams maintain customer relationships consistently over time. Core messages:

- ลูกค้าเก่าคือรายได้อนาคต
- relationship คือเงินจริง
- ทีมที่ดูแลลูกค้าได้สม่ำเสมอ จะปิดยอดได้มากกว่า
- ระบบที่ช่วยให้ sale ไม่ลืมลูกค้า
- การ follow-up ที่สม่ำเสมอ คือความได้เปรียบระยะยาว

Feel: supportive, disciplined, relationship-focused, long-term, team-oriented. NOT corporate CRM or enterprise software.

## Documentation Voice & Style

Full guide at `ai-skill/to-document/SKILL.md`. Key rules:

- Write as trustworthy companion, not corporate manual
- Friendly Thai pronouns: `คุณ`, `เรา`
- Simple, casual-professional Thai
- **Benefit before feature** — always start with how it helps the user
- Light emojis: 😊 💡 🚀 ✨ (support meaning, not clutter)
- One action per bullet when possible
- No long dragged vowels

### Guide structure

Every guide follows: **Inspirational intro** → **Clear numbered steps** → **เคล็ดลับเล็ก ๆ 💡** → **พร้อมลุยต่อ ✨** (encouragement + next step)

Prefer: "พื้นที่เก็บความใส่ใจ" style. Avoid: "ระบบจัดการข้อมูลลูกค้า (CRM)" style.
