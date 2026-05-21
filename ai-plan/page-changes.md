# Page Changes — SolidPlan Docs

## A) หน้าใหม่ที่ต้องสร้าง (7 หน้า)

### 1. `/start/quick-start/` — เริ่มแบบเร็ว 10 นาที

**ไฟล์**: `src/content/docs/start/quick-start.mdx`

**เป้าหมาย**: ทำให้ผู้ใช้ทำได้จริงภายใน 10 นาที

**เนื้อหาหลัก**:
- สมัคร/เข้าใช้
- ตั้งค่าโปรไฟล์ขั้นต่ำ
- เพิ่มลูกค้า
- บันทึกกิจกรรม
- ตั้งนัดครั้งถัดไป
- เปิด Dashboard

**ลิงก์ออก**: `/start/login/`, `/customers/add/`, `/customers/activities/`, `/daily/dashboard/`

---

### 2. `/customers/workflow-after-call/` — Workflow หลังคุยลูกค้า 2 นาที

**ไฟล์**: `src/content/docs/customers/workflow-after-call.mdx`

**เป้าหมาย**: ลดปัญหา "คุยแล้วลืมบันทึก" และทำให้การ follow-up ต่อเนื่อง

**เนื้อหาหลัก**:
- ขั้นตอนสั้น ๆ หลังโทร/พบลูกค้า
- ตัวอย่างโน้ตที่ควรจด
- ตั้งนัดครั้งถัดไป

**ลิงก์ออก**: `/customers/detail/`, `/customers/activities/`, `/daily/calendar/`

---

### 3. `/customers/pdpa/` — PDPA & ความเป็นส่วนตัวลูกค้า

**ไฟล์**: `src/content/docs/customers/pdpa.mdx`

**เป้าหมาย**: ให้ทีมใช้งานอย่างมั่นใจเรื่องข้อมูลลูกค้า

**เนื้อหาหลัก**:
- ต้องขออะไรเมื่อไหร่
- บันทึก PDPA ในระบบ
- คำแนะนำเชิงปฏิบัติ

---

### 4. `/team/metrics-and-privacy/` — ตัวเลขทีม/การอ่านกราฟ/ความเป็นส่วนตัว

**ไฟล์**: `src/content/docs/team/metrics-and-privacy.mdx`

**เป้าหมาย**: ช่วยทั้ง agent และ leader อ่านตัวเลข/กราฟทีม และเข้าใจสิ่งที่แชร์ได้

**เนื้อหาหลัก**:
- ตัวเลข 5 ขั้นตอนคืออะไร
- อ่าน heatmap/radar ของทีม
- โหมดส่วนตัวทำอะไรได้บ้าง

---

### 5. `/settings/overview/` — ภาพรวมตั้งค่า

**ไฟล์**: `src/content/docs/settings/overview.mdx`

**เป้าหมาย**: รวม "ควรตั้งอะไรบ้าง" และลำดับการตั้งค่า

**เนื้อหาหลัก**:
- โปรไฟล์
- เปลี่ยนรหัสผ่าน
- ใบเสร็จ
- จุดที่มักพลาด

---

### 6. `/help/faq/` — FAQ & แก้ปัญหา

**ไฟล์**: `src/content/docs/help/faq.mdx`

**เป้าหมาย**: ปิดช่องว่างเคสหน้างาน

**หัวข้อขั้นต่ำ**:
- ไม่ได้อีเมลยืนยัน
- ลืมรหัส
- เติมเงินแล้วไม่เข้า
- หาใบเสร็จไม่เจอ
- เพื่อนเห็นอะไรได้บ้าง
- อัปโหลดไฟล์ไม่ได้ (ถ้ามี)

---

### 7. `/help/5-steps/` — กิจกรรม 5 ขั้นตอนคืออะไร

**ไฟล์**: `src/content/docs/help/5-steps.mdx`

**เป้าหมาย**: เป็น source of truth ของ "กิจกรรม 5 ขั้นตอน"

**เนื้อหาหลัก**:
- ความหมายแต่ละขั้น
- ตัวอย่างกิจกรรม
- สีในปฏิทิน/ผลต่อ dashboard/team

---

## B) ไฟล์ที่ต้องย้าย (13 ไฟล์)

| ไฟล์เดิม | ไฟล์ใหม่ |
|----------|----------|
| `src/content/docs/getting-started.mdx` | `src/content/docs/start/overview.mdx` |
| `src/content/docs/login.mdx` | `src/content/docs/start/login.mdx` |
| `src/content/docs/dashboard.mdx` | `src/content/docs/daily/dashboard.mdx` |
| `src/content/docs/calendar.mdx` | `src/content/docs/daily/calendar.mdx` |
| `src/content/docs/customer/overview.mdx` | `src/content/docs/customers/overview.mdx` |
| `src/content/docs/customer/customer-list.mdx` | `src/content/docs/customers/list.mdx` |
| `src/content/docs/customer/add-customer.mdx` | `src/content/docs/customers/add.mdx` |
| `src/content/docs/customer/customer-detail.mdx` | `src/content/docs/customers/detail.mdx` |
| `src/content/docs/customer/activities.mdx` | `src/content/docs/customers/activities.mdx` |
| `src/content/docs/package/overview.mdx` | `src/content/docs/billing/overview.mdx` |
| `src/content/docs/package/payment.mdx` | `src/content/docs/billing/topup.mdx` |
| `src/content/docs/package/billing.mdx` | `src/content/docs/billing/history.mdx` |
| `src/content/docs/settings/receipt-settings.mdx` | `src/content/docs/settings/receipt.mdx` |

---

## C) หน้าที่ต้องแก้เนื้อหา (ยุบ/ตัดซ้ำ)

### 1. `/start/login/` (หลังย้ายจาก `/login/`)

**การเปลี่ยนแปลง**:
- เป็น source of truth ของ: สมัคร, เข้าสู่ระบบ, ลืมรหัส, สลับธีม
- ตัดความซ้ำจากหน้าอื่น

### 2. `/start/overview/` (หลังย้ายจาก `/getting-started/`)

**การเปลี่ยนแปลง**:
- ยุบ: เอาขั้นตอนสมัคร/เข้าสู่ระบบแบบละเอียดออก
- เหลือแค่ "ภาพรวม + ลิงก์ไป quick start"
- เน้น: แผนที่เมนู, แนวคิด relationship-first, เส้นทางรายวัน

### 3. `/billing/history/` (หลังย้ายจาก `/package/billing/`)

**การเปลี่ยนแปลง**:
- ลดความซ้ำเรื่องตั้งค่าใบเสร็จ
- ให้เหลือแค่ลิงก์ไป `/settings/receipt/`

### 4. `/settings/receipt/` (หลังย้ายจาก `/settings/receipt-settings/`)

**การเปลี่ยนแปลง**:
- เป็น source of truth ของการตั้งค่าใบเสร็จ
- เพิ่มส่วน "ก่อนออกใบเสร็จครั้งแรกต้องทำอะไร"
- ลิงก์กลับไป billing history

---

## D) หน้า Home (`index.mdx`)

**การเปลี่ยนแปลง**:
- อัปเดตการ์ดให้ชี้ไป overview ของแต่ละหมวดตาม slug ใหม่
- เพิ่มการ์ด "เริ่มแบบเร็ว 10 นาที"

---

## งานที่ต้องทำตามลำดับ

1. ✅ สร้าง `ai-plan/` และไฟล์สรุป
2. ⬜ เพิ่มไฟล์หน้าใหม่ 7 หน้า
3. ⬜ ย้ายไฟล์เดิม 13 ไฟล์
4. ⬜ อัปเดต Sidebar ใน `astro.config.mjs`
5. ⬜ ไล่แก้ internal links ทั้ง repo
6. ⬜ ปรับหน้า Home
7. ⬜ ตรวจสอบด้วย `pnpm build`
