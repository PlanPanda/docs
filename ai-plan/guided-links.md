# Guided links — annotating app screens via URL

> Copy kept in the docs repo at `ai-plan/guided-links.md`; canonical/original at
> `PlanPanda/smart` → `docs/guided-links.md` (decision record there:
> `docs/adr/0041-url-driven-annotation-overlay.md`). Capture-time gotchas live in
> [manual-screenshots.md](manual-screenshots.md).

A guide for agents (and humans) that author user-manual pages and capture annotated
screenshots of SolidPlan. Any app URL can carry annotation parameters; the app draws
numbered pills with short stub arrows on top of the genuine UI — **no dimming, no
click interception, no persistence**. Decision record: ADR-0041 (smart repo).

```
┌──────────────────────────────────────────────┐
│  ลูกค้า      [ค้นหาชื่อ… ]      [+ เพิ่มผู้มุ่งหวัง]◄──( 1 )│
│  (the real screen, fully visible)            │
└──────────────────────────────────────────────┘
```

## Quick start

```
https://app.solidplan.ai/customers?anno=1&arrow1target=%5Bdata-testid%3Dadd-prospect%5D&arrow1label=1
```

This opens the customers screen with a badge reading **1** and a stub arrow pointing
at the [+] เพิ่มผู้มุ่งหวัง button. Nothing is drawn without `anno=1` — test by removing it.

## Parameter reference

| Parameter | Example | Meaning |
|---|---|---|
| `anno` | `anno=1` | Master switch. **Nothing renders without it.** |
| `arrowNtarget` | `arrow1target=[data-testid=add-prospect]` | Point at a DOM element (CSS selector). Preferred — survives layout shifts. |
| `arrowNhead` | `arrow1head=70%,30%` | Tip of a freeform arrow (empty areas / directional hints). |
| `arrowNtail` | `arrow1tail=40%,12%` | Start of the arrow; optional (defaults toward the nearest screen edge). |
| `arrowNlabel` | `arrow2label=1` or `arrow2label=กดที่นี่` | Badge text, capped at 24 characters. |

Rules the renderer enforces:

- `N` is contiguous from 1 (`arrow1…`, `arrow2…`); the first gap ends the list. Maximum
  **5 arrows** — extras in the URL are ignored.
- Coordinates are `x,y` (comma-separated) in `px` or `%` of the viewport; mixed units
  are fine (`50%,412`).
- A selector that matches nothing — or a hidden element — is **skipped silently**: no
  error anywhere, that arrow just doesn't appear. Later arrows still render.
- When both `arrowNtarget` and `arrowNhead` are given, the target wins.
- Labels are plain text (never markup). A ≤2-character label replaces the number inside
  the circle (`arrow2label=1` → a badge reading **1**, useful for out-of-order steps);
  longer labels render beside the numbered circle.
- Keep the whole query under ~2 KB.

## How placement works (so you can predict the screenshot)

- Selector arrows: the pill floats ~56px outside the target box on the side that has
  room, with the stub arrow touching the box edge. Elements hugging a screen edge
  (top-bar buttons, full-height panels) automatically get their arrow from a side that
  fits — never a zero-length stub.
- Freeform arrows: the pill sits 44px behind the head, pointing at it.
- Geometry re-measures on resize, rotation **and scrolling**, so the arrow follows its
  target — author links for the state the reader will see (scroll position matters:
  the target must be in view when the page loads).

## Authoring recipes

**1. Point at a control (the manual's bread and butter):**

```
/customers?anno=1&arrow1target=[data-testid=add-prospect]&arrow1label=1
```

**2. A numbered step sequence (labels may be in any order):**

```
/customers?anno=1&arrow1target=[data-testid=add-prospect]&arrow1label=2
  &arrow2target=[data-testid=customers-list]&arrow2label=1
```
(reads: look at the list `1`, then press the button `2`)

**3. Freeform arrow into an empty area:**

```
/customers?anno=1&arrow1head=70%25,30%25&arrow1tail=42%25,12%25&arrow1label=พื้นที่แสดงรายการ
```

**4. Text hint instead of a number:**

```
/customers?anno=1&arrow1target=[data-testid=add-prospect]&arrow1label=กดที่นี่
```

## Finding targets

Every pointable control needs a `data-testid`. Verified on the real screens today:

| Page | Verified targets |
|---|---|
| `/customers` | `add-prospect` (ปุ่ม + เพิ่มผู้มุ่งหวัง), `customers-list`, `customer-side-panel`, `customer-expanded-panel` |
| `/customers/:id` detail | `policy-detail-header`, `policy-detail-nav` |
| Elsewhere | `add-customer` (หน้าเพิ่มลูกค้าแบบเต็ม), `calendar-main` |

Interactive elements without a testid — e.g. the customers search box or the
รายชื่อ/แผนที่ switch — cannot be targeted yet. The authoritative, never-rotting
source is the code:

```
grep -rhoE 'data-testid="[^"]+"' resources/js --include='*.tsx' | sort -u
```

If the element you need has no testid, don't point at a coordinate instead — file an
issue asking for one (that keeps manual links stable across redesigns).

## Encoding

Encode selector values with `encodeURIComponent` — `[` → `%5B`, `]` → `%5D`, `=` → `%3D`,
Thai text → its UTF-8 percent form; `%` in coordinates → `%25`:

```
arrow1target=%5Bdata-testid%3Dadd-prospect%5D
arrow1head=70%25,30%25
arrow1label=%E0%B8%81%E0%B8%94%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%99%E0%B8%B5%E0%B9%88
```

Raw commas and hyphens may stay unencoded. Any standard `URLSearchParams` builder
produces correct output.

## Capture workflow (screenshots for the manual)

1. Decide the viewport the manual page targets (e.g. 1280×720 desktop, 820×1180 iPad
   portrait) and the theme — light is the default; dark is worth one verification shot
   per manual section. Arrows re-anchor per viewport automatically.
2. Navigate to the annotated URL and wait ~0.5s after load (fonts/layout settle; the
   badge fades in over 150ms).
3. Screenshot. The overlay never intercepts input, so if your capture tool needs to
   open a menu or dialog first, annotations keep working — targets inside overlays are
   only visible while the overlay is open, which is exactly what you want for
   "press this button in the dialog" shots.
4. If an arrow is missing: the selector matched nothing (silent by design). Re-check
   with `document.querySelector('<your selector>')` in the console on that exact page,
   and confirm the element is rendered (not behind a closed dialog/tab).
5. Screenshot slots should reuse one annotated URL per manual figure — the link in the
   manual text and the capture stay in sync by construction.

## Limitations (by design)

- Single-screen arrows only — no multi-step tours, no persistence, no editor. Links are
  authored by hand or by tooling like this guide.
- The layer is visual-only (`pointer-events: none`, `aria-hidden`) — it can never block
  or fake clicks, and screen-reader users are unaffected.
- Trust model: a crafted link can only draw arrows on the genuine app at the genuine
  domain — the same trust level as a screenshot someone sends. Details in
  [ADR-0041](adr/0041-url-driven-annotation-overlay.md).
