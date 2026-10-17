# Manual Screenshots — how to capture and insert them

> Copy kept in the docs repo at `ai-plan/manual-screenshots.md`; canonical copy at
> `PlanPanda/smart` → `ai-note/manual-screenshots.md` (update both when something
> here changes). The arrow/annotation manual it references is copied alongside at
> [guided-links.md](guided-links.md).

Reference for any agent/session that needs to add screenshots to the SolidPlan user
manual (repo `PlanPanda/docs`, Thai, Astro 6 + Starlight). Everything below was
validated live on 2026-10-16/17 while filling the manual's figure slots — don't
relearn it the hard way. Progress log lives in
[PlanPanda/docs#1](https://github.com/PlanPanda/docs/issues/1) (pinned comments).

## Where figures live (docs repo)

- Slot registry: `docs/SCREENSHOTS.md` — one row per figure with exact filename,
  what must be visible, and how to prepare the screen. **This is the source of truth.**
- Drop captures at `docs/src/assets/manual/<group>/<name>.png`
  (e.g. `customers/list-overview.png`).
- `docs/src/components/Screenshot.astro` eagerly globs `src/assets/manual/**/*.png`
  and renders an `astro:assets` `<Image>` (WebP 640/960/1280 srcset). A missing file
  renders a dashed placeholder — **the build never breaks**, so you can register a
  slot before capturing it (register new rows in SCREENSHOTS.md too).

## Capture environment

- Capture from **https://dev.solidplan.ai** (dev), logged in as the **demo account
  สิสิระ เหมันติกา** — fully synthetic data. Never use real customer data.
- Light theme: `localStorage.theme_mode = "light"` (set, then reload).
- Viewport **1280×720**. Long single pages (report, policy detail): raise to
  **1280×1750** — the app flexes, no stitching needed; crop the empty bottom with
  `sips` afterwards.
- **Log in first, then navigate.** The login redirect drops `?query=params`, so
  annotated URLs only work on an existing session. Auth is an httpOnly cookie —
  a session cannot be restored programmatically, so **never log out** of the demo
  session; capture login/signup pages from a separate, genuinely logged-out browser.

## Capture mechanics (in-app browser / Playwright-like driver)

- Screenshot the **full viewport**, then crop with
  `sips -c <h> <w> --cropOffset <y> <x>` using rects from `getBoundingClientRect()`.
  Browser-side `clip` coordinates proved unreliable twice — don't trust them.
- Thai text matching in `evaluate`: row text concatenates badge+name
  (e.g. "กลุ่มกลุ่มข้าราชการกลุ่ม") — use `.includes()`, not `startsWith()`.
- High-level locator clicks often time out on actionability in this app. Fallback
  order: `evaluate` + `el.click()` → for icon-only buttons (⋮ menus) use
  `tab.cua.click` at the rect center.
- React controlled inputs: `fill` updates the DOM but not always app state
  (computed fields, autosave, summaries). Use the native-setter trick
  (`Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el, v)`,
  dispatch `input`, then **`el.blur()` and wait ~4s** for autosave) and verify by
  reloading.
- **File upload works via DOM injection** (the file chooser API is unsupported):
  find the hidden `input[type=file]`, build a `DataTransfer` with
  `new File([bytes], name, {type})`, assign `input.files`, dispatch `change`.
  Works for the customer documents tab and the AI chat attach input; the upload
  runs through the app's own authenticated API. Generate synthetic files with a
  python zlib PNG writer + a hand-rolled minimal PDF.
- Form/dialog figures: fill sample data, capture, then **ยกเลิก — never save**
  (unless seeding, below). If a page can render mixed stale state after viewport
  changes + programmatic clicks, reload cleanly before capturing.

## Arrows / annotations (guided links)

Any app URL accepts annotation parameters; the app draws numbered pills with stub
arrows over the real UI (no dimming, no click interception). Full manual:
**[guided-links.md](guided-links.md)** (copied here for reference; original at
`PlanPanda/smart` → `docs/guided-links.md`, decision in that repo's
`docs/adr/0041-url-driven-annotation-overlay.md`).

Quick shape:

```
https://dev.solidplan.ai/<path>?anno=1&arrow1target=<css-selector>&arrow1label=1
```

- `anno=1` is the master switch; max **5 arrows**; `N` contiguous from 1.
- Prefer `arrowNtarget=<css-selector>` (testid) over freeform `arrowNhead/tail`.
- Labels ≤2 chars render as numbered badges (good for out-of-order steps).
- Gotchas learned live: the overlay re-measures on childList mutations +
  resize/scroll only — state changes that only flip `aria-label` need
  `window.dispatchEvent(new Event("resize"))`; target selectors must match the
  **capture-time** state; the target must be in view at load.
- Known placement issue: mid-header controls (search box, clear-X, filter toggle)
  always get their pill on the left, overlapping the heading — structural, tracked
  in [PlanPanda/smart#312](https://github.com/PlanPanda/smart/issues/312) together
  with the missing-testid list. Edge controls (chips row, add-prospect, cards,
  panels) place cleanly.
- Known-good testids: `add-prospect`, `customers-list`, `customer-side-panel`,
  `customer-expanded-panel`.

## Seeding demo data (when a slot needs state)

- The Solidplan MCP server is **NOT** pointed at the dev demo account (verified
  read-only: zero matches for demo customers) — never seed dev through it.
- Existing seeded state (as of 2026-10-17): customer สมชาย สุขสม has 2 attached
  files (รูปลูกค้า.png + กรมธรรม์.pdf) and 2 policies (*ตลอดชีพ 20* with a health
  rider + 3-row annual table, *คุ้มครองอุบัติเหตุ 24 ชม.*); ~14 friends on the
  team page (tiers/statuses/weekly numbers); org units สำนักงานสุขุมวิท/ทีมแสนสุข/
  หน่วยพี่ส้ม + 3 กลุ่ม.
- Policies were seeded through the app's own **กรอกข้อมูลเอง** flow (the เพิ่มกรมธรรม์
  dialog autosaves drafts into a two-pane editor). Gotchas: the **ตารางรายปี section
  exists only for ตลอดชีพ/สะสมทรัพย์ types** (term/accident have none); row count =
  ageAtEndDate − อายุแรกเข้า; surrender values need native-setter + blur + ~4s to
  persist; the accident-type form has no aria-labels (map inputs by type/order).
- Need a state-changing button to appear (e.g. บันทึก on ตั้งค่า→สังกัด)? Make a
  temporary **unsaved** change, capture, then **reload to discard** — no data harm.
- Birthday 🎂 shows on cards only on birthday-today (edit panel autosaves on blur).

## Writing the figure into the manual

- Add/keep the slot in the page as `<Screenshot name="<group>/<name>" alt="..."
  spec="..." />` — `alt` is the Thai sentence describing the figure, `spec` is the
  preparation recipe (see any synced page, e.g. `customers/list.mdx`).
- Insert arrows only where the surrounding sentence points at a control; plain
  state figures (settings pages, dialogs) don't need annotations.
- After dropping files run `pnpm build` in the docs repo — placeholders are
  replaced automatically. Self-review every PNG: arrow tips touch the right
  control, state matches spec, no browser chrome/stray cursors, Thai text crisp,
  filenames exact.
- Commit straight to `main` (established convention for this repo), then post a
  progress comment on docs#1 with the updated counts.

## Status (2026-10-17): 65/73 slots captured

Open slots and their blockers:

| Slot | Blocker |
|---|---|
| `team/add-friend-request-bell`, `team/manage-friends-requests` | need a **pending** friend request sent TO the demo account (bell badge + open menu); a dropped crop without the menu doesn't match spec |
| `ai/search-results`, `ai/birthday-card-example`, `ai/policy-confirm-card`, `ai/add-customer-avatar-confirm` | dev deployment lacks the chat card UIs (no customer result cards, no in-chat confirm cards) and `generate_image` fails server-side; file attach + AI file reading DO work |
| `settings/ai-key-page`, `settings/ai-oauth-page` | nothing — capturable anytime from the live session (Key page + OAuth page under ตั้งค่า) |
