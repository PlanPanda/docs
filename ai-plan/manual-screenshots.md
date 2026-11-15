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

## Capture plan (2026-11-15): knowledge sync for AI levels, birthday without year, customer limit, JSON import/export

The 2026-11-15 sync added 8 new slots and made 9 existing PNGs stale. Status: **66/81 PNGs exist, 9 of them stale**.

**Environment for this round:** the local app at **http://127.0.0.1:3333** runs the new
features; dev may not yet. Same rules as above: demo/synthetic data only, light theme,
1280×720. Log in once in the capture browser, and never log out.

### A. New slots (no PNG yet)

| # | Slot | Route / how | State to prepare |
|---|---|---|---|
| 1 | `ai/assistant-intelligence-level` | ผู้ช่วย AI → ปุ่ม ✨ มุมล่างขวาของกล่องพิมพ์ | menu open, all 4 levels visible (อัตโนมัติ ✓) |
| 2 | `customers/detail-birthday-fields` | customer full page → ส่วนตัว → แก้ไข | day+month filled, year empty → header "วันเกิด (เว้นปีได้)". **Reload to discard, don't save** |
| 3 | `settings/profile-call-consent` | ตั้งค่า → ข้อมูลส่วนตัว | demo account has a phone number; crop to phone field + switch |
| 4 | `import-export/import-screen` | `/settings/import` | empty state: step 1 buttons + drop zone |
| 5 | `import-export/import-preview` | `/settings/import` → inject JSON via `input[type=file]` DataTransfer | file with 1 new customer + 1 existing `id` + a duplicate ชื่อเรียก (warning). **Don't confirm** |
| 6 | `import-export/import-result` | same, then ยืนยันนำเข้า | file with 1 new customer whose `files[0].url` returns 404 → ล้มเหลว + ดาวน์โหลดไฟล์ที่เหลือ. **This writes data.** The failed customer is rolled back, but any successful rows persist, so use a single-customer file and delete leftovers afterwards |
| 7 | `package/customer-limit-banner` | `/customers` | needs auto-package **OFF** + customers ≥ 90% of the plan limit. Easiest: switch the demo account to แพ็คเกจฟรี (check the limit) with auto off. Restore afterwards |
| 8 | `customers/add-limit-reached` | `/customers` → เพิ่มลูกค้า | same as #7 but at 100% → dialog "ลูกค้าเต็มแพ็คเกจแล้ว" + อัปเกรดแพ็คเกจ |

Do #7 and #8 together, last, and restore the package and auto-select straight after.

### B. Stale PNGs (UI changed, retake with the same filename)

| Slot | Why |
|---|---|
| `import-export/export-screen` | page redesigned: single **ดาวน์โหลด JSON**, 5 counts, step 2 |
| `export-ai/export-download` | same page, crop to step 1 |
| `export-ai/field-copy` | now a dialog: **คำอธิบายไฟล์ เพื่อให้ AI เข้าใจ** (ดาวน์โหลด / คัดลอก) |
| `import-ai/prepare-prompt` | now a dialog: **คำอธิบาย เพื่อให้ AI สร้างไฟล์ได้ถูกต้อง** |
| `team/campaign-team-code`, `team/add-friend-team-code` | menu/page renamed โค้ดสร้างทีม → **ชวนเพื่อน** |
| `settings/overview-menu` | menu label ชวนเพื่อน; export/import order |
| `settings/profile-form` | consent switch now under เบอร์โทร |
| `customers/add-edit-personal`, `customers/detail-full` | birthday is now 3 fields (วัน/เดือน/ปี) |
| `ai/assistant-overview` | composer shows the ✨ level button instead of เลือกรุ่น AI. Retake only if visible in the crop |

### C. Order (fewest state changes first)

1. Read-only captures: A1, A3, A4, all of B.
2. Unsaved-edit captures: A2, A5 (reload to discard).
3. Data-writing capture: A6, then clean up.
4. Package-state captures: A7, A8, then restore the package and auto-select.

Still blocked from earlier rounds (unchanged): the 4 chat-card slots, `team/add-friend-request-bell`,
and `settings/ai-key-page` / `ai-oauth-page`. The last two are capturable anytime.

## Status (2026-10-17): 65/73 slots captured

Open slots and their blockers:

| Slot | Blocker |
|---|---|
| `team/add-friend-request-bell`, `team/manage-friends-requests` | need a **pending** friend request sent TO the demo account (bell badge + open menu); a dropped crop without the menu doesn't match spec |
| `ai/search-results`, `ai/birthday-card-example`, `ai/policy-confirm-card`, `ai/add-customer-avatar-confirm` | dev deployment lacks the chat card UIs (no customer result cards, no in-chat confirm cards) and `generate_image` fails server-side; file attach + AI file reading DO work |
| `settings/ai-key-page`, `settings/ai-oauth-page` | nothing — capturable anytime from the live session (Key page + OAuth page under ตั้งค่า) |
