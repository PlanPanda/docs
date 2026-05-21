# SolidPlan Docs — Code Wiki

This repository is a documentation website for SolidPlan (solidplan.ai). It is built as a static site using Astro + Starlight. Most content is written in Thai (MDX/Markdown).

## Quick Facts

- Site framework: Astro + Starlight ([package.json](file:///Users/apirak/workspace/solidplan/docs/package.json))
- Content format: MDX/Markdown under `src/content/docs/` ([src/content/docs](file:///Users/apirak/workspace/solidplan/docs/src/content/docs))
- Content collection wiring: Astro Content Collections + Starlight loader/schema ([content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts))
- Navigation: manual sidebar config in Starlight ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L76-L126))
- Theme overrides: Starlight CSS tokens override ([custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css))
- Canonical authoring source (per repo docs): `../smart/docs/` (outside this repo) ([README.md](file:///Users/apirak/workspace/solidplan/docs/README.md#L24-L30), [CLAUDE.md](file:///Users/apirak/workspace/solidplan/docs/CLAUDE.md#L9-L23))

## Repository Layout

```text
docs/
├── astro.config.mjs              # Astro + Starlight config (site + sidebar)
├── package.json                  # Dependencies + scripts
├── tsconfig.json                 # TS settings (extends Astro strict)
├── public/                       # Static assets (served as-is)
│   └── favicon/                  # Favicons + manifest referenced by astro.config.mjs
├── src/
│   ├── content.config.ts         # Astro content collections registration
│   ├── content/
│   │   └── docs/                 # MDX docs pages (file-based routes)
│   ├── assets/                   # Images processed by Astro build pipeline
│   └── styles/custom.css         # Starlight theme token overrides
└── ai-skill/
    └── to-document/SKILL.md      # Writing guidelines for SolidPlan docs tone/structure
```

## Architecture Overview

At build time, Astro reads configuration, loads the docs collection, and Starlight renders the documentation UI around those pages.

```mermaid
flowchart TD
  A["MDX/Markdown pages<br/>src/content/docs/**"] -->|Starlight docsLoader()| B["Astro Content Collections<br/>docs collection"]
  B -->|validated by docsSchema()| C["Starlight site renderer<br/>(navigation + layouts)"]
  D["astro.config.mjs<br/>Starlight config (sidebar/head/theme)"] --> C
  E["src/styles/custom.css<br/>CSS tokens overrides"] --> C
  C --> F["Astro build output<br/>dist/"]
```

### Runtime Model

- Dev: `astro dev` serves content locally and hot-reloads MDX and config changes.
- Build: `astro build` pre-renders the entire docs site to static HTML/CSS/JS in `dist/`.
- Preview: `astro preview` serves the already-built static output for verification.

## Major Modules and Responsibilities

### 1) Site Configuration: `astro.config.mjs`

File: [astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs)

Responsibilities:

- Integrates Starlight into Astro via `integrations: [starlight(...)]` ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L6-L128))
- Sets branding and metadata:
  - Title and logo ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L8-L13))
  - Favicons, web manifest, and Google Fonts in `head` ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L14-L67))
- Loads the theme override stylesheet via `customCss` ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L68))
- Defines global nav structure via an explicitly curated `sidebar` tree ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L76-L126))

Key functions (external APIs used here):

- `defineConfig(...)` (from `astro/config`): wraps the Astro config object ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L2-L6))
- `starlight({...})` (from `@astrojs/starlight`): Starlight integration factory; accepts UI + content navigation options ([astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L3-L9))

### 2) Content Collections Configuration: `src/content.config.ts`

File: [content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts)

Responsibilities:

- Registers a single Astro Content Collection named `docs`
- Delegates to Starlight’s content loader and schema:
  - `docsLoader()` loads Starlight-compatible docs content from `src/content/docs`
  - `docsSchema()` validates/normalizes frontmatter/metadata for Starlight

Key exports/functions:

- `collections` export (Astro reads this module at build time) ([content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts#L5-L7))
- `defineCollection({ loader, schema })` (from `astro:content`) ([content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts#L1-L7))
- `docsLoader()` (from `@astrojs/starlight/loaders`) ([content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts#L2-L6))
- `docsSchema()` (from `@astrojs/starlight/schema`) ([content.config.ts](file:///Users/apirak/workspace/solidplan/docs/src/content.config.ts#L3-L6))

### 3) Documentation Content: `src/content/docs/**`

Directory: [src/content/docs](file:///Users/apirak/workspace/solidplan/docs/src/content/docs)

Responsibilities:

- Holds the actual documentation pages (Thai), organized by SolidPlan feature areas:
  - Onboarding: [getting-started.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/getting-started.mdx)
  - Customer management: [src/content/docs/customer](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/customer)
  - Team: [src/content/docs/team](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/team)
  - Settings: [src/content/docs/settings](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/settings)
  - Release notes: [release-notes.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/release-notes.mdx)

Routing and navigation:

- Starlight routes are derived from file paths and/or configured slugs.
- Sidebar `slug` values in [astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L76-L126) should correspond to existing content routes.

Example of Starlight UI components used in MDX:

- The home page imports Starlight components `Card` and `CardGrid` ([index.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/index.mdx#L17-L40)).

### 4) Theme Overrides: `src/styles/custom.css`

File: [custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css)

Responsibilities:

- Overrides Starlight design tokens by setting CSS variables, per theme:
  - Light theme tokens on `html[data-theme="light"]:root` ([custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css#L4-L20))
  - Dark theme tokens on `html[data-theme="dark"]:root` ([custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css#L23-L34))
- Applies specific UI tweaks for sidebar active/hover states in dark mode ([custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css#L36-L49))

Related design references:

- Site design system notes: [DESIGN.md](file:///Users/apirak/workspace/solidplan/docs/DESIGN.md)
- Broader website design reference: [DESIGN-website.md](file:///Users/apirak/workspace/solidplan/docs/DESIGN-website.md)

### 5) Static and Processed Assets

- `public/`: served as-is at the site root. Favicons and manifest are referenced by `head` config ([public](file:///Users/apirak/workspace/solidplan/docs/public), [astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L14-L47)).
- `src/assets/`: images intended for Astro processing (optimization/transforms as supported by Astro). ([src/assets](file:///Users/apirak/workspace/solidplan/docs/src/assets))

### 6) Documentation Authoring System (AI Skill)

File: [SKILL.md](file:///Users/apirak/workspace/solidplan/docs/ai-skill/to-document/SKILL.md)

Responsibilities:

- Defines writing voice, structure, and quality checklist for the Thai docs.
- Referenced as the “full guide” for doc tone in [CLAUDE.md](file:///Users/apirak/workspace/solidplan/docs/CLAUDE.md#L59-L75).

## Key Dependencies and How They Relate

### Runtime/Build Dependencies

From [package.json](file:///Users/apirak/workspace/solidplan/docs/package.json#L12-L16):

- `astro`: core static-site framework (dev server, build, preview)
- `@astrojs/starlight`: documentation UI framework/integration on top of Astro
- `sharp`: native image processing used by Astro for certain image pipelines

### Configuration and Type System

- ESM modules enabled by `"type": "module"` ([package.json](file:///Users/apirak/workspace/solidplan/docs/package.json#L1-L4))
- TypeScript config extends Astro’s strict preset ([tsconfig.json](file:///Users/apirak/workspace/solidplan/docs/tsconfig.json#L1-L5))

## How to Run the Project

Prerequisites:

- Node.js installed (version not pinned in this repository)
- pnpm installed

Commands (run from `.../solidplan/docs`):

```bash
pnpm install
pnpm dev
```

- Dev server: http://localhost:4321 (as documented in [README.md](file:///Users/apirak/workspace/solidplan/docs/README.md#L43-L50))

Build and preview:

```bash
pnpm build
pnpm preview
```

Build output:

- `dist/` (as documented in [README.md](file:///Users/apirak/workspace/solidplan/docs/README.md#L49-L50))

## Contribution Guide (Common Changes)

### Add a New Documentation Page

1. Add a new `.mdx` (or `.md`) file under `src/content/docs/` following the desired section folder structure.
2. Ensure frontmatter at minimum includes `title` and `description` (examples: [getting-started.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/getting-started.mdx#L1-L4), [index.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/index.mdx#L1-L15)).
3. Add the page to the Starlight sidebar by updating `sidebar` in [astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L76-L126) with a matching `slug`.

### Add or Update Images

- Put “served as-is” assets in `public/` and reference them with `/...` absolute paths.
- Put images that should go through Astro’s pipeline in `src/assets/`.

### Change Theme / Styling

- Update CSS variables or overrides in [custom.css](file:///Users/apirak/workspace/solidplan/docs/src/styles/custom.css).
- Keep changes aligned with the design tokens and intent documented in [DESIGN.md](file:///Users/apirak/workspace/solidplan/docs/DESIGN.md).

## Notes / Known Constraints

- Sidebar is manually maintained; Starlight is not configured to auto-generate nav from the filesystem ([CLAUDE.md](file:///Users/apirak/workspace/solidplan/docs/CLAUDE.md#L40-L46)).
- Repo docs indicate canonical content lives outside this repo at `../smart/docs/`; if pages are missing or outdated, check the source material location ([README.md](file:///Users/apirak/workspace/solidplan/docs/README.md#L24-L30)).
