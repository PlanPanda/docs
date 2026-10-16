---
version: 2.0
name: SolidPlan Docs
description: Documentation site for SolidPlan — an insurance agent relationship management app. Built on Starlight with a black & white "Product Clarity" design system shared with the solidplan.ai home site. Thai-first typography (Sarabun), flat hairline surfaces, restrained black actions, and a functional-green discipline. Prioritizes readability, clear navigation, and supportive tone for Thai-speaking insurance agents.

colors:
  # Core neutrals (shared with ../home DESIGN.md)
  ink: "#1d1d1f"            # primary text, accent (links, active, primary buttons)
  ink-hover: "#333333"      # hover on black controls
  body-muted: "#525258"     # body text
  muted-2: "#6e6e73"        # secondary text
  gray-4: "#8e8e93"
  hairline: "#d2d2d7"       # card borders, dividers
  edge: "#ececf0"           # quiet dividers, inline-code bg
  soft: "#f5f5f7"           # soft band, inline-code bg, accent-low

  # Dark mode (Apple-style true dark)
  dark-band: "#111111"      # canvas, nav, sidebar
  dark-surface: "#1d1d1f"   # inline-code bg, elevated surfaces
  dark-border: "#2c2c2e"
  dark-border-light: "#3a3a3c"
  dark-text: "#c7c7cc"      # body text on dark
  dark-muted: "#a1a1a6"     # secondary text on dark
  on-dark-bright: "#f5f5f7" # headings / accent on dark

  # Functional green — focus rings, status, success ONLY. Never brand fill.
  green: "#15734b"
  selection-bg: "#d5ebdf"
  selection-text: "#111111"

typography:
  # Sarabun is the single font (loaded from Google Fonts in astro.config.mjs).
  # It covers Thai + Latin — Inter is retired because it has no Thai glyphs.
  font: "Sarabun"
  weights: [400, 500, 600, 700]
  letter-spacing: 0            # global rule (`* { letter-spacing: 0 }`)
  body: "16px / 1.75"
  h1-hero: "clamp up to 64px / 700 / lh 1.25"
  page-title: "var(--sl-text-h1) / 600–700 / lh 1.35"
  headings-text-wrap: "balance"

surfaces:
  canvas: "#ffffff (light) / #111111 (dark)"
  chrome: "header, nav, sidebar — same as canvas, separated by hairlines only. No tinted sidebars."
  elevation: "Flat everywhere. Cards are hairline-framed (`1px solid #d2d2d7`), radius 8px. No drop shadows on sections."
  code-bg: "#f5f5f7 (light) / #1d1d1f (dark)"

components:
  buttons: "Primary = ink background, white text, radius 8px, hover #333. On dark = white background, #111 text. Ghost = hairline border, hover soft band. (Starlight .sl-link-button)"
  links: "Content links underlined with hairline underline; underline turns ink on hover. Accent text = ink (light) / #f5f5f7 (dark)."
  cards: "Homepage category cards (.sp-card): flat hairline frame, radius 8px, Lucide icon + bold title + one-line description, border darkens to ink on hover."
  callouts: "Starlight asides :::note / :::tip (semantic colors kept for meaning)."
  screenshots: "Screenshot.astro — real capture in a hairline 8px frame; missing captures render a dashed placeholder showing the target filename in public/images/manual/."
  hero: "Custom Hero.astro — centered text hero, primary + minimal actions, Solid mascot below (light variant / dark variant swap)."

icons:
  library: "Lucide (astro-icon + @iconify-json/lucide)"
  usage: "<Icon name=\"lucide:<name>\" /> — stroke inherits currentColor, 18–22px in UI contexts."
  exceptions: "LINE social icon keeps its brand glyph. Starlight UI chrome (search, theme toggle) keeps its built-in line icons."

logo:
  header: "/favicon/favicon-96x96.png rendered as rounded square (radius 7px) + bold site title — mirrors home .brand"
  favicon-set: "public/favicon/ synced from ../smart/public/favicon"

voice:
  brand-personality: "อบอุ่น เป็นกันเอง น่าเชื่อถือ"
  visual-personality: "เงียบ ชัด เป็นระเบียบ — ให้เนื้อหาเป็นพระเอก ตัวอักษรไทยอ่านสบาย สีพูดน้อยแต่เด็ดขาด"

do:
  - ใช้ token จากตารางนี้เท่านั้น ห้ามสุ่มสีใหม่
  - ใช้ Sarabun ทุกน้ำหนักที่มีอยู่ ห้ามสลับฟอนต์
  - การ์ด = เส้น hairline ล้วน ถ้าต้องมีเงา ให้มีเฉพาะวัตถุ "ผลิตภัณฑ์" (เช่นกรอบ screenshot)
  - ใช้เขียว #15734b เฉพาะ focus/status เท่านั้น
  - ตรวจทั้ง light และ dark ทุกครั้งที่แตะ UI

dont:
  - ไม่กลับไปใช้ครีม/ชมพู/สีสันจัด หรือ claymation (ธีมเก่า ยกเลิกแล้ว)
  - ไม่ gradient text, glassmorphism, หรือ animation เรืองรอง
  - ไม่ floating cards ลอยกลางหน้า
  - ไม่ใช้ Inter (ไม่มี Thai glyph)
