// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://solidplan.ai",
  integrations: [
    starlight({
      title: "SolidPlan",
      logo: {
        src: "./public/favicon/favicon-96x96.png",
        alt: "SolidPlan Logo",
      },
      head: [
        {
          tag: "link",
          attrs: { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon/favicon.svg",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/favicon/favicon-96x96.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/apple-touch-icon.png",
          },
        },
        {
          tag: "link",
          attrs: { rel: "manifest", href: "/favicon/site.webmanifest" },
        },
        {
          tag: "link",
          attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
        Hero: "./src/components/Hero.astro",
      },
      sidebar: [
        { label: "หน้าหลัก", slug: "index" },
        { label: "มีอะไรใหม่", slug: "release-notes" },
        {
          label: "เริ่มที่นี่",
          items: [
            { label: "เริ่มใช้ใน 10 นาที", slug: "start/quick-start" },
            { label: "ภาพรวมระบบ", slug: "start/overview" },
            { label: "เข้าสู่ระบบ", slug: "start/login" },
          ],
        },
        {
          label: "ใช้งานประจำวัน",
          items: [
            { label: "รายงาน", slug: "daily/report" },
            { label: "ปฏิทิน", slug: "daily/calendar" },
          ],
        },
        {
          label: "ลูกค้า",
          items: [
            { label: "ภาพรวม", slug: "customers/overview" },
            { label: "เพิ่มลูกค้า", slug: "customers/add" },
            { label: "รายชื่อลูกค้า", slug: "customers/list" },
            { label: "รายละเอียดลูกค้า", slug: "customers/detail" },
            { label: "กิจกรรม", slug: "customers/activities" },
            { label: "บันทึกกรมธรรม์", slug: "customers/policies" },
            { label: "ไฟล์เอกสาร", slug: "customers/documents" },
            {
              label: "Workflow หลังคุยลูกค้า",
              slug: "customers/workflow-after-call",
            },
            { label: "PDPA & ความเป็นส่วนตัว", slug: "customers/pdpa" },
          ],
        },
        {
          label: "ผู้ช่วย AI",
          items: [
            { label: "ภาพรวมผู้ช่วย AI", slug: "ai/assistant" },
            { label: "ค้นหาด้วย AI", slug: "ai/search" },
            { label: "การ์ดอวยพรวันเกิด", slug: "ai/birthday-card" },
            { label: "สร้างกรมธรรม์จากไฟล์", slug: "ai/policy-from-file" },
            { label: "เพิ่มลูกค้าด้วย AI", slug: "ai/add-customer" },
          ],
        },
        {
          label: "ยอดขาย",
          items: [{ label: "บันทึกยอดขาย", slug: "sales/sales-records" }],
        },
        {
          label: "ทีมงาน",
          items: [
            { label: "ภาพรวม", slug: "team/overview" },
            { label: "เพิ่มเพื่อน", slug: "team/add-friend" },
            { label: "จัดการเพื่อน", slug: "team/manage-friends" },
            { label: "โครงสร้างสังกัด", slug: "team/org-hierarchy" },
            { label: "โปรไฟล์ตัวแทน", slug: "team/agent-profile" },
            { label: "แชร์ให้ทีม", slug: "team/campaign" },
            {
              label: "ตัวเลขทีม & ความเป็นส่วนตัว",
              slug: "team/metrics-and-privacy",
            },
          ],
        },
        {
          label: "แพ็คเกจ & พอยต์",
          items: [
            { label: "ภาพรวมแพ็คเกจ", slug: "package/overview" },
            { label: "เติมเงิน", slug: "package/payment" },
            { label: "ประวัติพอยต์", slug: "package/billing" },
          ],
        },
        {
          label: "นำเข้า / ส่งออก",
          items: [
            { label: "ย้ายข้อมูลเข้า-ออก", slug: "import-export" },
            { label: "AI ช่วยนำเข้า", slug: "import-ai" },
            { label: "AI ช่วยวิเคราะห์", slug: "export-ai" },
          ],
        },
        {
          label: "ตั้งค่า",
          items: [
            { label: "ภาพรวมตั้งค่า", slug: "settings/overview" },
            { label: "ข้อมูลส่วนตัว", slug: "settings/profile" },
            { label: "วิธีเข้าสู่ระบบ", slug: "settings/auth-methods" },
            { label: "ตั้งค่าใบเสร็จ", slug: "settings/receipt" },
            { label: "เชื่อมต่อแอป AI อื่น", slug: "settings/ai-connections" },
          ],
        },
        {
          label: "ช่วยเหลือ",
          items: [
            { label: "คำถามที่พบบ่อย", slug: "help/faq" },
            { label: "กิจกรรม 5 ขั้นตอน", slug: "help/5-steps" },
          ],
        },
      ],
    }),
    icon(),
  ],
});
