# Issue: Manual screenshots pilot (PlanPanda/docs#1)

> สร้างเป็น GitHub issue แล้วที่: https://github.com/PlanPanda/docs/issues/1
> เนื้อหาด้านล่างคือสำเนาตรงตาม issue — capture จาก dev.solidplan.ai แล้วเก็บรูปใน repo นี้

## Title

**Manual screenshots pilot: capture customers-list figures (5 slots) from dev.solidplan.ai, then roll out menu-by-menu**

## Summary

This manual has **71 empty screenshot slots** (see [`SCREENSHOTS.md`](./SCREENSHOTS.md)). Each slot renders as a placeholder in the docs until a PNG appears at `public/images/manual/<name>.png` — handled by `src/components/Screenshot.astro`.

The app now supports **guided links** (URL-drawn arrows, shipped in `PlanPanda/smart`: `docs/guided-links.md`, ADR-0041), so every figure can be captured from **https://dev.solidplan.ai** by opening an annotated URL and screenshotting the real UI.

Before mass-capturing all menus, run a **one-page pilot** — the customers list (5 slots) — to validate the whole loop: annotated URLs → capture → crop → self-review → human review on the docs page. If it passes, roll out the remaining slots menu-by-menu.

## Pilot scope: customers list — 5 slots only

| Target file | State to prepare on dev | Arrows should point at |
|---|---|---|
| `customers/list-overview` | Several prospects **and** customers; type chips visible with live counts (ทั้งหมด / ผู้มุ่งหวัง / ลูกค้า) | type chips, [+ เพิ่มผู้มุ่งหวัง] (`add-prospect`) |
| `customers/list-search` | A query typed in the search box; list narrowed to matches; clear (X) button visible | search box, X button |
| `customers/list-filters` | Filter panel open showing every filter group (insurance need, tags, income range, closeness, birthday, note search) in one frame | filter icon, panel |
| `customers/list-sort` | Sort menu open showing all 3 sort options and direction toggle | sort control, menu |
| `customers/list-card` | One fully-populated customer card: VIP badge, tags, birthday, green "already bought" framing, edit icon | the card itself |

Exact Thai alt/spec text is the source of truth: `src/content/docs/customers/list.mdx` (`<Screenshot>` calls).

## Data readiness on dev.solidplan.ai (precondition)

Verify a dev login has: both customer types with non-zero counts, a uniquely searchable name, one fully-populated card (VIP + tags + birthday + green framing), and notes for note-search. If anything is missing, list it and coordinate seeding via `PlanPanda/smart` — **no real customer data, ever; synthetic Thai names only.**

## Pipeline

1. **Log in to https://dev.solidplan.ai** and set the capture standard: viewport **1280×720, deviceScaleFactor 2, light theme**. (Pilot deliverable: confirm or change this as the manual standard — 820×1180 iPad portrait is the alternative per `guided-links.md`. Record the decision for later menus.)
2. **Author one annotated URL per figure** per `guided-links.md`: `anno=1` + `arrowNtarget` selectors (≤5 arrows; labels ≤2 chars render as numbered badges; pill floats ~56px outside the target; target must be in view at load).
3. **Missing `data-testid`?** Never point at coordinates for a control — file a small issue in `PlanPanda/smart` to add the testid first (this repo cannot fix selectors). Known-good today: `add-prospect`, `customers-list`, `customer-side-panel`, `customer-expanded-panel`. The search box and sort control likely need new testids.
4. **Capture:** navigate to the annotated URL, wait ~0.5s (fonts + badge fade-in), screenshot the viewport, then **crop with ≥40px margin** keeping full screen context — arrows and badges must stay fully inside the frame.
5. **Save as PNG** to `public/images/manual/customers/<exact-target-file>.png` (create the `customers/` folder) and commit here.
6. **Self-review every PNG:** arrow tips touch the right control, state matches the spec, no dev chrome / stray cursors / notifications, Thai text crisp at 2×, filenames exact.
7. **Human review gate:** `pnpm build` and open `/customers/list/` — the 5 placeholders must be replaced by the real figures, and each arrow must match the manual sentence it illustrates.

## What "good" means (pilot pass criteria)

- All 5 figures present with exact filenames; docs page renders them.
- Every arrow points at the control the manual text describes.
- Consistent framing: same viewport, same crop-margin language, no half-cut badges.
- Synthetic-looking data only; nothing resembling a real person.
- Reproducible: the annotated URL for each figure is listed in the PR description, so captures stay in sync with manual links.

## Rollout after the pilot passes

One PR per menu group (same review loop): 1. `start/` → 2. `daily/` → 3. remaining `customers/` → 4. `ai/` → 5. `package/` → 6. `sales/` → 7. `team/` → 8. `settings/` → 9. `import-export`

Exclusions:

- Slots on the 7 pages still awaiting knowledge files (quick-start, workflow-after-call, PDPA, metrics-and-privacy, FAQ, 5-steps) are out of scope entirely.
- Slots needing a real AI response or hard-to-trigger error states: capture only if reachable on dev; otherwise list as skipped with reasons — do not fake states.

## Deliverables (pilot PR)

- 5 PNGs in `public/images/manual/customers/` (exact names above)
- Annotated-URL list per figure + confirmed viewport/theme standard
- Missing-data / missing-testid notes filed where they belong (`PlanPanda/smart`)
- Skipped-slot list with reasons (should be empty for this page)

## References

- `PlanPanda/smart` → `docs/guided-links.md` (parameter reference, encoding, capture workflow)
- `PlanPanda/smart` → `docs/adr/0041-url-driven-annotation-overlay.md`
- `SCREENSHOTS.md` (all 71 slots) · `src/components/Screenshot.astro` (placeholder mechanism)
