# Issue: Manual screenshot pilot — capture one page end-to-end (customers list), then roll out menu-by-menu

> เก็บสำเนาไว้ที่ docs repo: `ai-plan/issue-screen-capture-pilot.md`
> ใช้สร้าง issue ใน repo `smart` (PlanPanda/smart)

---

## Title

**Manual screenshots pilot: capture the customers-list page (5 slots) with guided links, then roll out menu-by-menu**

## Summary

The SolidPlan manual (PlanPanda/docs) has **71 empty screenshot slots**, each rendered as a placeholder that names its exact target file (`docs/public/images/manual/<name>.png` — see `SCREENSHOTS.md` in the docs repo). Guided links (ADR-0041, `docs/guided-links.md`) are shipped, so captures can now be authored as annotated URLs.

Before mass-capturing all menus, run a **one-page pilot** to validate the whole pipeline — demo data, URL authoring, capture, crop, arrow accuracy, review loop. If the pilot passes review, roll out the remaining slots **menu by menu**, one PR per menu group.

## Pilot scope: `/customers` list page — 5 slots only

| Target file | State to prepare | Arrows should point at |
|---|---|---|
| `customers/list-overview` | Customers screen with several prospects **and** customers; type chips visible with live counts (ทั้งหมด / ผู้มุ่งหวัง / ลูกค้า) | type chips, [+ เพิ่มผู้มุ่งหวัง] (`add-prospect`) |
| `customers/list-search` | A query typed in the search box; list narrowed to matches; clear (X) button visible | search box, X button |
| `customers/list-filters` | Filter panel open showing every filter group (insurance need, tags, income range, closeness, birthday, note search) in one frame | filter icon, panel |
| `customers/list-sort` | Sort menu open showing all 3 sort options and direction toggle | sort control, menu |
| `customers/list-card` | One fully-populated customer card: VIP badge, tags, birthday, green "already bought" framing, edit icon | the card itself |

Exact Thai alt/spec text lives in `PlanPanda/docs/src/content/docs/customers/list.mdx` (`<Screenshot>` calls) — treat it as the source of truth for what each figure must show.

## Pipeline

1. **Demo data (no real customer data, ever).** Seed enough synthetic Thai-named customers to cover: both types with non-zero chip counts, a searchable unique name, one fully-populated card (VIP + tags + birthday + green framing), and notes for note-search. Reuse/extend the existing seeders; keep any temporary seed file listed in the PR.
2. **Run the app in dev, log in, set the capture standard:** viewport **1280×720, deviceScaleFactor 2, light theme**. (Pilot deliverable: confirm or change this as the manual standard — 820×1180 iPad portrait is the alternative per `guided-links.md`. Record the decision for all later menus.)
3. **Author one annotated URL per figure** per `docs/guided-links.md`: `anno=1` + `arrowNtarget` selectors, ≤5 arrows, labels ≤2 chars render as numbered badges. Remember: pill floats ~56px outside the target; the target must be in view at load (scroll position matters).
4. **Missing `data-testid`?** Never point at coordinates for a control — add the testid in a small separate PR first (testids keep manual links stable across redesigns, per `guided-links.md` → "Finding targets"). Enumerate existing ones with:
   `grep -rhoE 'data-testid="[^"]+"' resources/js --include='*.tsx' | sort -u`
   Known-good today: `add-prospect`, `customers-list`, `customer-side-panel`, `customer-expanded-panel`. The search box and sort control likely need new testids.
5. **Capture:** navigate to the annotated URL, wait ~0.5s for fonts + badge fade-in, screenshot the viewport, then **crop with ≥40px margin** keeping the full screen context — arrows and badges must stay fully inside the frame. Save as PNG to
   `../docs/public/images/manual/customers/<exact-target-file>.png` (create `public/images/manual/customers/` in the docs repo if needed).
6. **Self-review every PNG:** arrow tips touch the right control, state matches the spec above, no dev chrome / stray cursors / notifications, Thai text crisp at 2×, filenames exact.
7. **Human review gate:** rebuild the docs site (`pnpm build` in PlanPanda/docs) and view `/customers/list/` — placeholders for these 5 files must be replaced by the real figures, and each arrow must match the sentence it illustrates in the manual text.

## What "good" means (pilot pass criteria)

- All 5 figures present with exact filenames; docs page renders them.
- Every arrow points at the control the manual text describes (checked against the Thai sentences).
- Consistent framing: same viewport, same crop margin language, no half-cut badges.
- Realistic but synthetic data; nothing resembling a real person.
- Pipeline reproducible: the annotated URLs for each figure are listed in the PR description so captures stay in sync with the manual links.

## Rollout after the pilot passes

One PR per menu group, in this order (each batch reviewed the same way):

1. `start/` (login, system overview) → 2. `daily/` (รายงาน, ปฏิทิน) → 3. remaining `customers/` → 4. `ai/` → 5. `package/` → 6. `sales/` → 7. `team/` → 8. `settings/` → 9. `import-export`

Exclusions:

- Slots on the 7 pages still awaiting knowledge files (quick-start, workflow-after-call, PDPA, metrics-and-privacy, FAQ, 5-steps) are out of scope entirely.
- Slots requiring a real AI response or hard-to-trigger error states: capture only if the state is reachable with seeded data; otherwise list them as skipped with reasons — do not fake states.

## Deliverables (pilot PR)

- 5 PNGs in `PlanPanda/docs/public/images/manual/customers/` (exact names above)
- Any new `data-testid`s (separate small PRs)
- Seed changes (if any) listed
- Annotated-URL list per figure + the confirmed viewport/theme standard
- Skipped-slot list with reasons (should be empty for this page)
