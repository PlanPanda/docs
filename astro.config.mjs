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
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        { label: "🏠 หน้าหลัก", slug: "index" },
        {
          label: "🎁 มีอะไรใหม่",
          slug: "release-notes",
        },
        {
          label: "🚀 เริ่มต้นใช้งาน",
          items: [
            { label: "เริ่มต้นใช้งาน", slug: "getting-started" },
            { label: "เข้าสู่ระบบ", slug: "login" },
            { label: "Dashboard", slug: "dashboard" },
          ],
        },
        {
          label: "👥 ลูกค้า",
          items: [
            { label: "ภาพรวม", slug: "customer/overview" },
            { label: "รายชื่อลูกค้า", slug: "customer/customer-list" },
            { label: "เพิ่มลูกค้า", slug: "customer/add-customer" },
            { label: "รายละเอียดลูกค้า", slug: "customer/customer-detail" },
            { label: "กิจกรรม", slug: "customer/activities" },
          ],
        },
        { label: "🗓️ ปฏิทิน", slug: "calendar" },
        {
          label: "💰 แพ็คเกจ",
          items: [
            { label: "ภาพรวม", slug: "package/overview" },
            { label: "เติมเงิน", slug: "package/payment" },
            { label: "การเรียกเก็บเงิน", slug: "package/billing" },
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
          ],
        },
        {
          label: "⚙️ ตั้งค่า",
          items: [
            { label: "โปรไฟล์", slug: "settings/profile" },
            { label: "ใบเสร็จ", slug: "settings/receipt-settings" },
          ],
        },
      ],
    }),
  ],
});
