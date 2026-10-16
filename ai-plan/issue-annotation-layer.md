# Issue: URL-driven annotation layer (`?anno=1`) — draw arrows on any screen for guided links

> เก็บสำเนาไว้ที่ docs repo: `ai-plan/issue-annotation-layer.md`
> ใช้สร้าง issue ใน repo `smart` (PlanPanda/smart)

---

## Title

**Guided links: URL-driven arrow annotations (`?anno=1&arrow1target=...`) so docs/support can point users at the right UI**

## Summary

SolidPlan needs a way to link users *into* the app with visual guidance — e.g. the user manual (solidplan.ai docs) says "press **เพิ่มผู้มุ่งหวัง**" and links to the customers screen with an arrow already drawn on that button. We also reuse this internally to produce annotated screenshots for the manual (71 capture slots).

Proposal: a small, self-contained **annotation overlay** that reads its instructions from URL query parameters and draws arrows/labels on top of the current screen. No backend, no persistence, no network calls — pure rendering.

## Problem

- Docs and support articles can only describe UI in words; new agents get lost between similar screens.
- Screenshot production for the manual currently requires ad-hoc DOM injection by a capture tool; a first-class, in-app annotation mode makes captures deterministic and lets humans hand-craft annotated links.
- The same mechanism serves support ("open this link and press the highlighted button"), onboarding hints, and bug reports.

## Proposed API (URL parameters)

Activation requires `anno=1` — **no annotations are ever rendered without it**.

| Parameter | Example | Meaning |
|---|---|---|
| `anno` | `anno=1` | Master switch. Layer stays dormant otherwise. |
| `arrowNtarget` | `arrow1target=[data-testid=add-prospect]` | Point at a DOM element (CSS selector). App resolves it and anchors the arrow to the element's box (nearest edge to the tail, or box center if no tail). **Preferred mode — survives layout shifts.** |
| `arrowNhead` / `arrowNtail` | `arrow1head=820,412&arrow1tail=300,600` | Freeform arrow: tail (start) → head (tip). Coordinates in `px` or `%` of viewport (e.g. `50%,30%`). Use for empty areas / directional hints. |
| `arrowNlabel` | `arrow2label=1` or `arrow2label=กดที่นี่` | Optional badge: a single digit/circle number or short text (cap ~24 chars) placed at the head. |

Rules:

- `N` starts at 1, contiguous (`arrow1…`, `arrow2…`). Cap at **5 arrows**; ignore extras.
- Commas separate x/y (not `x` — avoids ambiguity with decimals).
- Selector mode and coordinate mode can be mixed freely.
- If a selector matches nothing, **skip that arrow silently** (no error, no broken page).
- Keep total query length reasonable (~2 KB); document that labels should stay short.

Example:

```
https://app.solidplan.ai/customers?anno=1&arrow1target=%5Bdata-testid%3Dadd-prospect%5D&arrow1label=1
```

## Behavior

- Single `AnnotationLayer` component mounted once at the app root. On mount (and whenever the query string changes), parse params and render **one fixed SVG overlay**: `position: fixed; inset: 0; pointer-events: none;` with the highest practical `z-index`.
- Selector targets: resolve with `querySelector`, compute the box via `getBoundingClientRect()`, and recompute on `resize` (and orientation change — the app is iPad-first). Arrow drawn from tail (or a default offset outside the box) to the box edge.
- Styling: SolidPlan B&W language — 3–4px black stroke with a thin white casing (invert to `#f5f5f7` stroke / dark casing in dark mode), clear arrowhead, circular white badge with black number for labels.
- SPA navigation: annotations belong to the URL. When the route changes and the new URL lacks `anno=1`, the layer unmounts/clears.
- Everything is text-rendered: **labels must be rendered as plain text, never as HTML/JSX injection.**

## Security & trust (production on purpose)

The layer is opt-in (`anno=1`) and read-only by construction, so shipping it to production is acceptable:

- No network calls, no storage, no telemetry — instructions come only from the URL and affect only visuals.
- `pointer-events: none` — it can never intercept or fake clicks.
- Labels are plain text with length caps; arrow count capped — worst case, a crafted link draws confusing arrows on the *genuine* app on the *genuine* domain, same trust level as a screenshot someone sends. No escalation path.
- Do not add selectors that *reveal* data (e.g. no param that un-hides private UI). A future `annoBlur=<selectors>` (hide/redact fields for shared screenshots) is allowed — it only hides.

## Non-goals

- No in-app arrow *editor* UI (links are authored by hand/docs tooling for now).
- No persistence, sharing server-side, or analytics of annotations.
- No step-by-step tour/coach-mark sequencing (single-screen arrows only, for now).

## Acceptance criteria

- [ ] `?anno=1&arrow1target=…&arrow1label=1` renders an arrow pointing at the element on load, in light **and** dark mode.
- [ ] Without `anno=1`, nothing renders (test with arrow params present).
- [ ] Overlay does not intercept clicks/touches (pass-through verified).
- [ ] Selector arrow follows the element after window resize and orientation change.
- [ ] Nonexistent selector → arrow skipped, no console error, page normal.
- [ ] Coordinate mode supports px and `%`; mixed modes work together; >5 arrows ignored.
- [ ] Works on iPad Safari and desktop Chrome (touch + mouse).
- [ ] Param parser unit-tested; one e2e test covers a guided link end-to-end.
- [ ] Documented in `docs/adr/` (decision: URL-driven annotation in production, trust model above).

## Reuse note (docs repo)

The docs capture prompt (`PlanPanda/docs` → `ai-plan/screenshot-capture-prompt.md`) already references this API: once shipped, the manual's 71 screenshot slots should be captured by navigating to the app with `arrowNtarget` URLs instead of injecting overlays.
