// app/contact/page.tsx
import { getSiteConfig } from "@/app/actions/config";
import ContactClient from "@/components/Contact/ContactClient";

export default async function ContactRoutePage() {
  // 1. Gọi Database lấy cấu hình
  const config = await getSiteConfig();

  return <ContactClient config={config} />;
}
