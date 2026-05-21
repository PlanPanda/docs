---
version: alpha
name: SolidPlan Docs
description: Documentation site for SolidPlan — an insurance agent relationship management app. Built on Starlight with a warm, friendly design system adapted from the main SolidPlan website (Clay-inspired palette). Prioritizes readability, clear navigation, and supportive tone for Thai-speaking insurance agents.

colors:
  # Brand accent — shared with main website
  accent: "#ff4d8b"
  accent-light: "#ff6b9d"
  accent-dark: "#e8457b"

  # Core neutrals (tinted warm toward brand hue, ch=0.01)
  primary: "#0a0a0a"
  primary-active: "#1f1f1f"
  ink: "#0a0a0a"
  body: "#3a3a3a"
  body-strong: "#1a1a1a"
  muted: "#6a6a6a"
  muted-soft: "#9a9a9a"
  hairline: "#e5e5e5"
  hairline-soft: "#f0f0f0"

  # Surfaces — cream canvas warmth carried from main site
  canvas: "#fffaf0"
  surface-soft: "#faf5e8"
  surface-card: "#f5f0e0"
  surface-strong: "#ebe6d6"
  surface-dark: "#0a1a1a"
  surface-dark-elevated: "#1a2a2a"
  surface-dark-card: "#152020"

  # Text on dark
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#a0a0a0"
  on-dark-muted: "#6a7a7a"

  # Secondary brand colors (for feature highlights, callouts)
  brand-teal: "#1a3a3a"
  brand-lavender: "#b8a4ed"
  brand-peach: "#ffb084"
  brand-ochre: "#e8b94a"
  brand-mint: "#a4d4c5"
  brand-coral: "#ff6b5a"

  # Semantic
  success: "#22c55e"
  warning: "#f59e0b"
  error: "#ef4444"
  info: "#3b82f6"

typography:
  # Starlight docs use Inter for everything (no display type needed)
  font-base: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

  display:
    fontFamily: "Inter, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px

  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.3px

  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.2px

  h3:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

  h4:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

  body:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0

  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

  code:
    fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5

  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  # Starlight overrides
  sidebar:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    activeTextColor: "{colors.accent}"
    borderColor: "{colors.hairline}"
    width: 280px

  sidebar-group:
    fontWeight: 600
    fontSize: "{typography.caption.fontSize}"
    textColor: "{colors.muted}"
    letterSpacing: 0.5px

  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    height: 64px

  content-area:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    maxWidth: "75ch"
    padding: "{spacing.xl}"

  code-block:
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"

  inline-code:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.accent}"
    fontFamily: "{typography.code.fontFamily}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"

  link:
    textColor: "{colors.accent}"
    hoverTextColor: "{colors.accent-dark}"
    underlineOffset: 2px

  table:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline}"
    headerBackground: "{colors.surface-soft}"
    rowHover: "{colors.surface-card}"
    rounded: "{rounded.lg}"

  callout-tip:
    backgroundColor: "rgba(255, 77, 139, 0.08)"
    borderColor: "{colors.accent}"
    borderLeftWidth: 3px
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"

  callout-note:
    backgroundColor: "{colors.surface-soft}"
    borderColor: "{colors.hairline}"
    borderLeftWidth: 3px
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"

  callout-warning:
    backgroundColor: "rgba(245, 158, 11, 0.08)"
    borderColor: "{colors.warning}"
    borderLeftWidth: 3px
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"

  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    fontWeight: 600
    rounded: "{rounded.md}"
    padding: "10px 18px"
    height: 40px

  search-input:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.muted-soft}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: 40px
    borderColor: "{colors.hairline}"
---

## Overview

SolidPlan Docs เป็นเอกสารประกอบการใช้งานแอป SolidPlan สำหรับตัวแทนประกันชีวิต สร้างด้วย Astro + Starlight เนื้อหาทั้งหมดเป็นภาษาไทย

ดีไซน์ระบบนี้ดัดแปลงมาจาก Clay theme ของเว็บไซต์หลัก (solidplan.ai) โดยรักษาสีหลักและความรู้สึกอบอุ่นไว้ แต่ปรับให้เหมาะกับการอ่านเอกสารยาว ๆ และ navigation ที่ชัดเจน

**Key Characteristics:**
- **Canvas สีครีมอุ่น** (`{colors.canvas}` — #fffaf0) ต่อเนื่องจากเว็บหลัก แตกต่างจาก docs ทั่วไปที่มักใช้พื้นขาวเทา
- **Accent สีชมพู** (`{colors.accent}` — #ff4d8b) ใช้ sparingly สำหรับ links, active states, และ callouts
- **Typography เน้น readability** — Inter ทั้งหมด ไม่มี display type ขนาดใหญ่ (ไม่ใช่ landing page)
- **Cards / containers น้อย** — เอกสารไม่ต้องการ cards มากมาย ใช้ whitespace และ hierarchy แทน
- **Code blocks บน surface-card** (`{colors.surface-card}` — #f5f0e0) แทนพื้นดำทั่วไป ให้ความรู้สึกอบอุ่น
- **Maximum content width 75ch** สำหรับ body text — อ่านสบายตา

## Colors

### Light Mode

| Token | Hex | Use |
|-------|-----|-----|
| `{colors.canvas}` | #fffaf0 | พื้นหลังหลักของหน้า |
| `{colors.surface-soft}` | #faf5e8 | Sidebar background |
| `{colors.surface-card}` | #f5f0e0 | Code blocks, callout backgrounds |
| `{colors.ink}` | #0a0a0a | หัวข้อ h1-h4 |
| `{colors.body}` | #3a3a3a | Body text |
| `{colors.accent}` | #ff4d8b | Links, active nav, inline code text |
| `{colors.muted}` | #6a6a6a | Secondary text, captions |
| `{colors.hairline}` | #e5e5e5 | Borders, dividers |

### Dark Mode

| Token | Hex | Use |
|-------|-----|-----|
| `{colors.surface-dark}` | #0a1a1a | พื้นหลังหลัก |
| `{colors.surface-dark-elevated}` | #1a2a2a | Sidebar, cards |
| `{colors.surface-dark-card}` | #152020 | Code blocks |
| `{colors.on-dark}` | #ffffff | หัวข้อ |
| `{colors.on-dark-soft}` | #a0a0a0 | Body text |
| `{colors.accent-light}` | #ff6b9d | Accent บน dark (สว่างกว่าเล็กน้อย) |

## Typography

### Scale

| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| `{typography.display}` | 32px | 600 | 1.2 | Hero title หน้าแรก docs |
| `{typography.h1}` | 28px | 600 | 1.25 | Page title |
| `{typography.h2}` | 22px | 600 | 1.3 | Section heading |
| `{typography.h3}` | 18px | 600 | 1.4 | Sub-section |
| `{typography.h4}` | 16px | 600 | 1.4 | Minor heading |
| `{typography.body}` | 16px | 400 | 1.7 | Running text |
| `{typography.body-sm}` | 14px | 400 | 1.6 | Secondary text, captions |
| `{typography.code}` | 14px | 400 | 1.5 | Code blocks, inline code |
| `{typography.caption}` | 13px | 500 | 1.4 | Labels, small UI |

### Thai Language Considerations

- Inter รองรับ Thai ได้ดี ไม่ต้อง fallback font พิเศษ
- Line height 1.7 สำหรับ body text ช่วยให้อ่าน Thai ที่มีสระบน-ล่างเยอะสบายขึ้น
- หลีกเลี่ยง font-weight บาง (100-300) สำหรับ Thai — อ่านยากบนหน้าจอ

## Layout

### Spacing System

Base unit 4px. Tokens: xxs (4) · xs (8) · sm (12) · md (16) · lg (24) · xl (32) · xxl (48)

### Content Width

- **Max content**: 75ch (สำหรับ body text — อ่านสบายตา)
- **Page container**: 100% with xl padding (32px)
- **Sidebar**: 280px fixed

### Navigation Structure

- **Top nav**: 64px สูง มี logo + search + theme toggle
- **Left sidebar**: Grouped by feature area (เริ่มต้นใช้งาน, ลูกค้า, ปฏิทิน, แพ็คเกจ, ทีมงาน, ตั้งค่า)
- **Right TOC** (auto): In-page anchor links สำหรับ h2-h3

## Elevation & Depth

Docs site ใช้ elevation น้อยมาก:

- **Flat**: เนื้อหาหลัก, sidebar, nav — ไม่มี shadow
- **Hairline border**: Code blocks, tables, callouts — 1px border
- **Active/hover**: เปลี่ยน background color เล็กน้อย ไม่ใช้ shadow

## Components

### Sidebar Navigation

- Background: `{colors.surface-soft}`
- Group label: `{typography.caption}` สี muted, uppercase tracking
- Link: `{typography.body-sm}` สี body
- Active link: สี accent + font-weight 600
- Hover: background `{colors.surface-card}`

### Code Blocks

- Background: `{colors.surface-card}` (light) / `{colors.surface-dark-card}` (dark)
- Border: 1px `{colors.hairline}`
- Rounded: `{rounded.md}` (8px)
- Padding: `{spacing.md}` (16px)
- Font: `{typography.code}`

### Inline Code

- Background: `{colors.surface-soft}`
- Text: `{colors.accent}`
- Rounded: `{rounded.sm}` (6px)
- Padding: 2px 6px

### Callouts

- **Tip**: ขอบซ้าย accent 3px, bg สีชมพูจาง (8% opacity)
- **Note**: ขอบซ้าย hairline, bg surface-soft
- **Warning**: ขอบซ้าย ochre, bg สีเหลืองจาง

### Tables

- Header: `{colors.surface-soft}` bg
- Row hover: `{colors.surface-card}`
- Border: 1px `{colors.hairline}`
- Rounded: `{rounded.lg}` (12px)

## Responsive

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 768px | Sidebar hide → hamburger, content full-width |
| Tablet | 768–1024px | Sidebar narrow (240px), content fluid |
| Desktop | > 1024px | Full sidebar (280px), max-content 75ch |

## Do's and Don'ts

### Do
- ใช้ canvas สีครีมเป็นพื้นหลัก — ความอุ่น differentiate จาก docs อื่น
- ใช้ accent สีชมพู sparingly — links, active states, inline code
- รักษา whitespace มาก ๆ ระหว่าง sections
- ใช้ numbered steps สำหรับ guide — agent ต้องทำตามลำดับ
- จบทุกหน้าด้วย "พร้อมลุยต่อ ✨" หรือ next step

### Don't
- อย่าใช้ gradient text หรือ glassmorphism
- อย่าใส่ animation ที่กินสมาธิ — docs ต้องอ่านได้ลื่น
- อย่าใช้ cards ซ้อน cards
- อย่าให้บรรทัดยาวเกิน 75ch
- อย่าใช้ภาษาทางการ — เขียนเหมือนคุยกับเพื่อน
