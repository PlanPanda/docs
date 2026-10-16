# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SolidPlan user documentation site — a Starlight (Astro) static site serving as the official user manual for the SolidPlan insurance agent application (solidplan.ai). All content is in Thai.

## Source Material

The actual usage guide content is authored and maintained at `../smart/knowledge-for-manual/` (outside this repo). This Starlight site syncs that content into a publishable docs site — the knowledge folder is the source of truth for every product page.

The knowledge-for-manual structure maps to the docs IA:

- **getting-started.md, login.md** — `src/content/docs/start/`
- **report.md, calendar.md** — `src/content/docs/daily/` (รายงาน, ปฏิทิน)
- **customer/** — `src/content/docs/customers/` (overview, add, list, detail, activities, policies, documents)
- **ai/** — `src/content/docs/ai/` (assistant, search, birthday-card, policy-from-file, add-customer)
- **package/** — `src/content/docs/package/` (overview, payment, billing)
- **sales/** — `src/content/docs/sales/sales-records.mdx`
- **team/** — `src/content/docs/team/`
- **settings/** — `src/content/docs/settings/`
- **import_export/** — `src/content/docs/import-export.mdx`, `import-ai.mdx`, `export-ai.mdx`

Terminology standard: `GLOSSARY.md` at repo root. Every page must use these exact terms (ผู้มุ่งหวัง vs ลูกค้า, พอยต์, ทีมโค้ด, การ์ดยืนยัน ฯลฯ).

## Commands

```bash
pnpm dev       # Dev server at localhost:4321
pnpm build     # Production build to ./dist/
pnpm preview   # Preview production build locally
```

## Architecture

- **Framework:** Astro 6 + Starlight (docs-focused framework)
- **Content:** MDX/Markdown files in `src/content/docs/`
- **Site config:** `astro.config.mjs` — Starlight integration, sidebar, fonts (Sarabun), logo
- **Theme:** `src/styles/custom.css` — black & white design system aligned with the home site; see `DESIGN.md`
- **Icons:** Lucide via `astro-icon` — use `<Icon name="lucide:<kebab-name>" />` (import `{ Icon }` from `astro-icon/components`). Verify names exist in `@iconify-json/lucide` before use.
- **Package manager:** pnpm

## Screenshots workflow

Pages embed screenshots through `src/components/Screenshot.astro`:

```mdx
import Screenshot from '../../../components/Screenshot.astro'; // 3 levels up from subfolder pages
<Screenshot name="customers/list-search" alt="สิ่งที่ต้อง capture" spec="สถานะหน้าจอที่ต้องเตรียม (ถ้ามี)" />
```

- At build time, if `public/images/manual/<name>.png` (or `.jpg`/`.webp`) exists it is rendered; otherwise a placeholder shows the target filename and capture spec.
- To fulfill a slot, drop the capture into `public/images/manual/` with exactly that filename. Current open slots: run `grep -r "Screenshot name=" src/content/docs` or see the capture list maintained in the repo.
- Import depth: subfolder pages (`daily/`, `customers/`, `ai/`, `team/`, `sales/`, `settings/`, `start/`, `help/`, `package/`) use `../../../components/...`; root-level pages (`import-export.mdx` ฯลฯ) use `../../components/...`.

## Key Conventions

- Starlight auto-routes based on file path: `src/content/docs/guides/example.md` → `/guides/example/`
- Sidebar is manually configured in `astro.config.mjs` (not auto-generated); when adding/renaming pages, update it in the same commit
- Internal content links are absolute with trailing slash: `[เติมเงิน](/package/payment/)`
- Callouts use Starlight asides: `:::note[หัวข้อ]` / `:::tip[เคล็ดลับ]`
- Content files use frontmatter: `title`, `description`

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
