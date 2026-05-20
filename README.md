# SolidPlan Docs

คู่มือการใช้งาน SolidPlan — แอปพลิเคชันสำหรับตัวแทนประกันชีวิต

เว็บไซต์: [solidplan.ai](https://solidplan.ai)

## เกี่ยวกับโปรเจกต์

เว็บไซต์เอกสารประกอบการใช้งาน (User Documentation) สร้างด้วย [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)

เนื้อหาทั้งหมดเป็นภาษาไทย ครอบคลุมการใช้งานทุกฟีเจอร์ของ SolidPlan:

| ส่วน | เนื้อหา |
| ------ | --------- |
| เริ่มต้นใช้งาน | ขั้นตอนสมัคร เพิ่มลูกค้า เริ่มบันทึกกิจกรรม |
| เข้าสู่ระบบ | สมัครสมาชิก, login, ลืมรหัสผ่าน, สลับธีม |
| Dashboard | สถิติสรุป, Yearly Heatmap, Radar Chart, ลูกค้าล่าสุด |
| ลูกค้า | รายชื่อ, เพิ่มลูกค้า, รายละเอียด, บันทึกกิจกรรม 5 ขั้นตอน |
| ปฏิทิน | วางแผนนัดหมาย ติดตามกิจกรรม |
| แพ็คเกจ | แพ็คเกจที่ใช้งาน, เติมเงิน QR PromptPay, ประวัติการเติมเงิน |
| ทีมงาน | เพิ่มเพื่อน, โครงสร้างองค์กร, โปรไฟล์ตัวแทน, ดูผลงาน |
| ตั้งค่า | โปรไฟล์, รหัสผ่าน, ใบเสร็จ |

## แหล่งเนื้อหา

เนื้อหาต้นฉบับอยู่ที่ `../smart/docs/` ประกอบด้วย:

- ไฟล์คู่มือการใช้งาน (getting-started, login, dashboard, calendar, customer/, package/, team/, settings/)
- ADR (Architecture Decision Records) — บันทึกการตัดสินใจทางเทคนิคของระบบ

## โครงสร้างโปรเจกต์

```text
├── src/
│   ├── content/docs/   ← เนื้อหาเอกสาร (MDX/Markdown)
│   ├── assets/         ← รูปภาพที่ผ่าน Astro processing
│   └── content.config.ts
├── public/             ← Static assets
├── astro.config.mjs    ← Starlight config + sidebar
└── package.json
```

## Commands

| คำสั่ง | การทำงาน |
| --------- | ---------- |
| `pnpm install` | ติดตั้ง dependencies |
| `pnpm dev` | รัน dev server ที่ `localhost:4321` |
| `pnpm build` | Build production ไปที่ `./dist/` |
| `pnpm preview` | Preview build ก่อน deploy |

## เพิ่มเติม

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
