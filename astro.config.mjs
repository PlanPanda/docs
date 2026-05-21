// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "SolidPlan",
      logo: {
        src: "./src/assets/logo.png",
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
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
          },
        },
      ],
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        { label: "🏠 หน้าหลัก", slug: "index" },
        { label: "🎁 มีอะไรใหม่", slug: "release-notes" },
        {
          label: "🧭 เริ่มที่นี่",
          items: [
            { label: "เริ่มแบบเร็ว 10 นาที", slug: "start/quick-start" },
            { label: "ภาพรวมระบบ", slug: "start/overview" },
            { label: "เข้าสู่ระบบ", slug: "start/login" },
          ],
        },
        {
          label: "✅ ใช้งานทุกวัน",
          items: [
            { label: "Dashboard", slug: "daily/dashboard" },
            { label: "ปฏิทิน", slug: "daily/calendar" },
          ],
        },
        {
          label: "👥 ลูกค้า",
          items: [
            { label: "ภาพรวม", slug: "customers/overview" },
            { label: "รายชื่อลูกค้า", slug: "customers/list" },
            { label: "เพิ่มลูกค้า", slug: "customers/add" },
            { label: "รายละเอียดลูกค้า", slug: "customers/detail" },
            { label: "บันทึกกิจกรรม", slug: "customers/activities" },
            { label: "Workflow หลังคุยลูกค้า", slug: "customers/workflow-after-call" },
            { label: "PDPA & ความเป็นส่วนตัว", slug: "customers/pdpa" },
          ],
        },
        {
          label: "💰 แพ็คเกจ & ใบเสร็จ",
          items: [
            { label: "ภาพรวมแพ็คเกจ", slug: "billing/overview" },
            { label: "เติมเงิน", slug: "billing/topup" },
            { label: "ประวัติการชำระเงิน", slug: "billing/history" },
          ],
        },
        {
          label: "🤝 ทีมงาน",
          items: [
            { label: "ภาพรวม", slug: "team/overview" },
            { label: "เพิ่มเพื่อน", slug: "team/add-friend" },
            { label: "จัดการเพื่อน", slug: "team/manage-friends" },
            { label: "โครงสร้างองค์กร", slug: "team/org-hierarchy" },
            { label: "โปรไฟล์ตัวแทน", slug: "team/agent-profile" },
            { label: "ตัวเลขทีม & ความเป็นส่วนตัว", slug: "team/metrics-and-privacy" },
          ],
        },
        {
          label: "⚙️ ตั้งค่า",
          items: [
            { label: "ภาพรวมตั้งค่า", slug: "settings/overview" },
            { label: "ตั้งค่าโปรไฟล์", slug: "settings/profile" },
            { label: "ตั้งค่าใบเสร็จ", slug: "settings/receipt" },
          ],
        },
        {
          label: "❓ ช่วยเหลือ",
          items: [
            { label: "คำถามที่พบบ่อย", slug: "help/faq" },
            { label: "กิจกรรม 5 ขั้นตอน", slug: "help/5-steps" },
          ],
        },
      ],
    }),
  ],
});
