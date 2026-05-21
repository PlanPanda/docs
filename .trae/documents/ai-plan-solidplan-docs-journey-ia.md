# แผนปรับโครงสร้าง/เพิ่มลดเนื้อหา (Journey-first) — SolidPlan Docs

## สรุป

เป้าหมายคือจัดโครงสร้างเอกสารให้สอดคล้องกับการใช้งานจริงของ “ตัวแทนประกันชีวิต + หัวหน้าทีม” โดย:

- เพิ่มหน้าที่ช่วย “เริ่มใช้งานให้ได้ผล” และ “เข้าใจแนวคิดหลัก” แบบเร็ว
- ยุบ/ตัดความซ้ำของเนื้อหา (โดยเฉพาะสมัครสมาชิก/ใบเสร็จ) ให้เหลือ source of truth ชัดเจน
- ปรับ Sidebar และ slug ได้ (ตามที่ตกลง) และอัปเดตลิงก์ภายในทั้งหมดให้ครบ
- ไม่ทำหน้า redirect สำหรับ slug เดิม (ตามที่ตกลง) ดังนั้นต้องตามแก้ลิงก์ภายในให้ครบถ้วน
- บันทึกแผน/รายการเพิ่มลดไว้ในโฟลเดอร์ `ai-plan/` (จะทำในขั้น EXECUTION)

## สถานะปัจจุบัน (จากการสำรวจ repo)

โครงสร้างไฟล์เอกสารอยู่ที่ `src/content/docs/` และ Sidebar ถูกกำหนดแบบ manual ใน [astro.config.mjs](file:///Users/apirak/workspace/solidplan/docs/astro.config.mjs#L76-L126)

หน้าที่มีอยู่ในปัจจุบัน:

- หน้าเดี่ยว: `index`, `release-notes`, `getting-started`, `login`, `dashboard`, `calendar`
- ลูกค้า: `customer/overview`, `customer/customer-list`, `customer/add-customer`, `customer/customer-detail`, `customer/activities`
- แพ็คเกจ: `package/overview`, `package/payment`, `package/billing`
- ทีมงาน: `team/overview`, `team/add-friend`, `team/manage-friends`, `team/org-hierarchy`, `team/agent-profile`
- ตั้งค่า: `settings/profile`, `settings/receipt-settings`

ปัญหาเชิง journey ที่คาดว่าจะเกิด:

- มือใหม่ต้องการ “เริ่มแบบเร็วให้ทำได้จริง” (ยังไม่มีหน้า quick start/checklist)
- แนวคิดแกนกลาง “กิจกรรม 5 ขั้นตอน” ถูกอ้างหลายหน้า แต่ยังไม่มีหน้าเดียวที่อธิบายให้เข้าใจแบบจบ ๆ
- เนื้อหาอาจซ้ำ/กระจาย เช่น สมัครสมาชิก (อยู่ทั้ง getting-started และ login), ใบเสร็จ (อยู่ทั้ง billing และ receipt-settings)
- ไม่มีหมวด “ช่วยเหลือ/แก้ปัญหา” สำหรับเคสหน้างาน (ลืมรหัส, ไม่ได้อีเมล, เติมเงินแล้วไม่เข้า, หาใบเสร็จไม่เจอ ฯลฯ)

## หลักการออกแบบ IA (ให้ทีมทำต่อได้ไม่หลง)

1. **Journey-first**: เริ่มได้เร็ว → ทำงานรายวัน → ติดขัด/แก้ปัญหา → ขยายเป็นทีม
2. **1 เรื่องควรมี 1 หน้าเป็น source of truth**: หน้าอื่นลิงก์ไป ไม่เขียนซ้ำ
3. **ชื่อหน้า = เป้าหมายของผู้ใช้** มากกว่า “ชื่อโมดูล”
4. **No redirect**: เปลี่ยน slug ได้ แต่ต้อง “ตามแก้ลิงก์ภายในทั้งหมด” และตรวจ build

## โครง Sidebar ใหม่ (เสนอ)

หมายเหตุ: ยังใช้ Starlight sidebar แบบ manual ใน `astro.config.mjs` แต่ปรับกลุ่ม/slug ให้เดินตามการใช้งานจริง

### 🧭 เริ่มที่นี่

- หน้าหลัก (`/`)
- เริ่มแบบเร็ว 10 นาที (`/start/quick-start/`) **ใหม่**
- ภาพรวมระบบ (`/start/overview/`) **ย้ายจาก** `getting-started`
- เข้าสู่ระบบ (`/start/login/`) **ย้ายจาก** `login`
- มีอะไรใหม่ (`/release-notes/`)

### ✅ ใช้งานทุกวัน

- Dashboard (`/daily/dashboard/`) **ย้ายจาก** `dashboard`
- ปฏิทิน (`/daily/calendar/`) **ย้ายจาก** `calendar`
- ลูกค้า
  - ภาพรวมระบบลูกค้า (`/customers/overview/`) **ย้ายจาก** `customer/overview`
  - รายชื่อลูกค้า (`/customers/list/`) **ย้ายจาก** `customer/customer-list`
  - เพิ่มลูกค้า (`/customers/add/`) **ย้ายจาก** `customer/add-customer`
  - รายละเอียดลูกค้า (`/customers/detail/`) **ย้ายจาก** `customer/customer-detail`
  - บันทึกกิจกรรม (`/customers/activities/`) **ย้ายจาก** `customer/activities`
  - Workflow “หลังคุยลูกค้า 2 นาที” (`/customers/workflow-after-call/`) **ใหม่**
  - PDPA & ความเป็นส่วนตัวลูกค้า (`/customers/pdpa/`) **ใหม่**

### 💰 แพ็คเกจ & ใบเสร็จ

- ภาพรวมแพ็คเกจ (`/billing/overview/`) **ย้ายจาก** `package/overview`
- เติมเงิน (`/billing/topup/`) **ย้ายจาก** `package/payment`
- ประวัติการชำระเงิน & ใบเสร็จ (`/billing/history/`) **ย้ายจาก** `package/billing`
- ตั้งค่าใบเสร็จ (`/settings/receipt/`) **ย้ายจาก** `settings/receipt-settings` (แต่ลิงก์จากหมวดนี้ได้)

### 🤝 ทีมงาน

- ภาพรวมทีมงาน (`/team/overview/`) (คงเดิมได้ หรือย้ายตามโครงใหม่ถ้าต้องการให้สม่ำเสมอ)
- เพิ่มเพื่อน (`/team/add-friend/`)
- จัดการเพื่อน (`/team/manage-friends/`)
- โครงสร้างองค์กร (`/team/org-hierarchy/`)
- โปรไฟล์ตัวแทน (`/team/agent-profile/`)
- ตัวเลขทีม/การอ่านกราฟ/ความเป็นส่วนตัว (`/team/metrics-and-privacy/`) **ใหม่**

### ⚙️ ตั้งค่า

- ภาพรวมตั้งค่า (`/settings/overview/`) **ใหม่**
- ตั้งค่าโปรไฟล์ (`/settings/profile/`) (คงเดิมได้ หรือย้ายเป็น `/settings/profile/` ตามด้านบน)
- ตั้งค่าใบเสร็จ (`/settings/receipt/`) **ย้าย**

### ❓ ช่วยเหลือ

- รวมคำถามที่พบบ่อย (FAQ) & แก้ปัญหา (`/help/faq/`) **ใหม่**
- “กิจกรรม 5 ขั้นตอน” คืออะไร (`/help/5-steps/`) **ใหม่**

## รายการเพิ่ม/ยุบ/ย้าย (Decision-complete)

### A) เพิ่มหน้าใหม่ (ไฟล์ใหม่ที่ต้องสร้าง)

1. `src/content/docs/start/quick-start.mdx`
   - เป้าหมาย: ทำให้ผู้ใช้ทำได้จริงภายใน 10 นาที
   - เนื้อหาหลัก: สมัคร/เข้าใช้ → ตั้งค่าโปรไฟล์ขั้นต่ำ → เพิ่มลูกค้า → บันทึกกิจกรรม → ตั้งนัดครั้งถัดไป → เปิด Dashboard
   - ลิงก์ออก: ไปหน้า login (รายละเอียด), ไป customers/add, ไป customers/activities, ไป daily/dashboard

2. `src/content/docs/customers/workflow-after-call.mdx`
   - เป้าหมาย: ลดปัญหา “คุยแล้วลืมบันทึก” และทำให้การ follow-up ต่อเนื่อง
   - เนื้อหาหลัก: ขั้นตอนสั้น ๆ หลังโทร/พบลูกค้า, ตัวอย่างโน้ตที่ควรจด, ตั้งนัดครั้งถัดไป
   - ลิงก์ออก: ไป customers/detail + customers/activities + daily/calendar

3. `src/content/docs/customers/pdpa.mdx`
   - เป้าหมาย: ให้ทีมใช้งานอย่างมั่นใจเรื่องข้อมูลลูกค้า
   - เนื้อหาหลัก: ต้องขออะไรเมื่อไหร่, บันทึก PDPA ในระบบ, คำแนะนำเชิงปฏิบัติ

4. `src/content/docs/team/metrics-and-privacy.mdx`
   - เป้าหมาย: ช่วยทั้ง agent และ leader อ่านตัวเลข/กราฟทีม และเข้าใจสิ่งที่แชร์ได้
   - เนื้อหาหลัก: ตัวเลข 5 ขั้นตอนคืออะไร, อ่าน heatmap/radar ของทีม, โหมดส่วนตัวทำอะไรได้บ้าง

5. `src/content/docs/settings/overview.mdx`
   - เป้าหมาย: รวม “ควรตั้งอะไรบ้าง” และลำดับการตั้งค่า (ช่วยลดการหลงเมนู)
   - เนื้อหาหลัก: โปรไฟล์, เปลี่ยนรหัสผ่าน, ใบเสร็จ, (จุดที่มักพลาด)

6. `src/content/docs/help/faq.mdx`
   - เป้าหมาย: ปิดช่องว่างเคสหน้างาน
   - หัวข้อขั้นต่ำ: ไม่ได้อีเมลยืนยัน, ลืมรหัส, เติมเงินแล้วไม่เข้า, หาใบเสร็จไม่เจอ, เพื่อนเห็นอะไรได้บ้าง, อัปโหลดไฟล์ไม่ได้ (ถ้ามี)

7. `src/content/docs/help/5-steps.mdx`
   - เป้าหมาย: เป็น source of truth ของ “กิจกรรม 5 ขั้นตอน”
   - เนื้อหาหลัก: ความหมายแต่ละขั้น, ตัวอย่างกิจกรรม, สีในปฏิทิน/ผลต่อ dashboard/team

### B) ย้าย/เปลี่ยน slug (ไฟล์เดิมที่ต้องย้าย path + แก้ frontmatter)

รายการนี้เป็น “ไฟล์ → path ใหม่” (ตัวอย่าง mapping):

- `src/content/docs/getting-started.mdx` → `src/content/docs/start/overview.mdx`
- `src/content/docs/login.mdx` → `src/content/docs/start/login.mdx`
- `src/content/docs/dashboard.mdx` → `src/content/docs/daily/dashboard.mdx`
- `src/content/docs/calendar.mdx` → `src/content/docs/daily/calendar.mdx`
- `src/content/docs/customer/overview.mdx` → `src/content/docs/customers/overview.mdx`
- `src/content/docs/customer/customer-list.mdx` → `src/content/docs/customers/list.mdx`
- `src/content/docs/customer/add-customer.mdx` → `src/content/docs/customers/add.mdx`
- `src/content/docs/customer/customer-detail.mdx` → `src/content/docs/customers/detail.mdx`
- `src/content/docs/customer/activities.mdx` → `src/content/docs/customers/activities.mdx`
- `src/content/docs/package/overview.mdx` → `src/content/docs/billing/overview.mdx`
- `src/content/docs/package/payment.mdx` → `src/content/docs/billing/topup.mdx`
- `src/content/docs/package/billing.mdx` → `src/content/docs/billing/history.mdx`
- `src/content/docs/settings/receipt-settings.mdx` → `src/content/docs/settings/receipt.mdx`

ข้อกำหนดสำคัญ:

- ต้องอัปเดต `astro.config.mjs` sidebar slug ให้ตรงกับ path ใหม่ทั้งหมด
- ต้องไล่แก้ลิงก์ภายในเอกสารทั้งหมด (หา `/customer/...` `/package/...` `/settings/receipt-settings/` ฯลฯ แล้วแก้)

### C) ยุบ/ตัดซ้ำ (ไฟล์เดิมที่ต้องแก้เนื้อหา)

1. หน้า login (หลังย้ายเป็น `/start/login/`)
   - ตัดความซ้ำ: ในหน้า “ภาพรวมระบบ/quick start” ไม่ต้องอธิบายสมัครละเอียด
   - ให้ login เป็น source of truth ของ: สมัคร, เข้าสู่ระบบ, ลืมรหัส, สลับธีม

2. หน้า overview ระบบ (หลังย้ายเป็น `/start/overview/`)
   - ยุบ: เอาขั้นตอนสมัคร/เข้าสู่ระบบแบบละเอียดออก เหลือแค่ “ภาพรวม + ลิงก์ไป quick start”
   - ให้เน้น: แผนที่เมนู, แนวคิด relationship-first, เส้นทางรายวัน (dashboard → customer → calendar)

3. หน้า billing history (หลังย้ายเป็น `/billing/history/`)
   - ลดความซ้ำเรื่องตั้งค่าใบเสร็จ: ให้เหลือแค่ลิงก์ไป `/settings/receipt/` (ไม่ต้องอธิบายซ้ำ)

4. หน้า settings receipt (หลังย้ายเป็น `/settings/receipt/`)
   - เป็น source of truth ของการตั้งค่าใบเสร็จ
   - เพิ่มส่วน “ก่อนออกใบเสร็จครั้งแรกต้องทำอะไร” และลิงก์กลับไป billing history

### D) ปรับหน้า Home ให้สอดคล้องกับ IA ใหม่

- อัปเดตการ์ดบน [index.mdx](file:///Users/apirak/workspace/solidplan/docs/src/content/docs/index.mdx) ให้ชี้ไป overview ของแต่ละหมวดตาม slug ใหม่
- เพิ่มการ์ด “เริ่มแบบเร็ว 10 นาที” เพื่อพาคนใหม่เข้าทางที่ถูก

## งานในโฟลเดอร์ `ai-plan/` (ตามที่ร้องขอ)

ในขั้น EXECUTION จะเพิ่มโฟลเดอร์ `ai-plan/` ที่ root และใส่ไฟล์:

- `ai-plan/ia-map.md` — สรุป sidebar ใหม่ + mapping old → new
- `ai-plan/page-changes.md` — รายการเพิ่ม/ยุบ/ย้าย/ตัดซ้ำ (สรุปสั้นสำหรับทีม)

## ขั้นตอนทำงาน (Implementation Steps)

1. สร้าง `ai-plan/` และเขียนไฟล์สรุป 2 ไฟล์ตามหัวข้อด้านบน
2. เพิ่มไฟล์หน้าใหม่ (A) พร้อม frontmatter `title`/`description` และลิงก์เชื่อมไปหน้าที่เกี่ยวข้อง
3. ย้ายไฟล์เดิมตาม mapping (B) และอัปเดต import รูปภาพให้ path ถูกต้อง (MDX บางหน้ามี `import ... from '../../assets/...';`)
4. อัปเดต Sidebar ใน `astro.config.mjs` ให้ตรงโครงใหม่ (รวม emoji/label)
5. ไล่แก้ internal links ทั้ง repo:
   - ค้นหา `/customer/` `/package/` `/settings/receipt-settings/` `/dashboard/` `/calendar/` แล้วแทนด้วย slug ใหม่
6. ปรับหน้า Home ให้ลิงก์ถูกต้อง และเพิ่มการ์ด quick start

## การตรวจสอบ (Verification)

1. `pnpm build` ต้องผ่าน
2. ตรวจด้วย grep ว่าไม่มีลิงก์เก่าค้าง:
   - `/customer/` (ที่ไม่ใช่ `/customers/`)
   - `/package/` (ที่ไม่ใช่ `/billing/`)
   - `/settings/receipt-settings/`
3. เปิด dev server และคลิก sidebar + การ์ดหน้า Home ให้ไปถึงหน้าปลายทางได้ครบ

## Assumptions & Decisions (ล็อกแล้ว)

- อนุญาตให้เปลี่ยน slug/ย้ายโครงได้
- ไม่ทำ redirect สำหรับลิงก์เก่า
- โฟกัส journey แบบสมดุล: ตัวแทนเดี่ยว + หัวหน้าทีม
