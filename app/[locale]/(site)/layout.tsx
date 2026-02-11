// app/(site)/layout.tsx
import FloatingContact from "@/components/Helper/FloatingContact";
import Footer from "@/components/Layout/Footer/Footer";
import ResponsiveNav from "@/components/Layout/Navbar/ResponsiveNav";
import { auth } from "@/auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar chỉ hiện ở các trang trong nhóm (site) */}
      <ResponsiveNav currentUser={session?.user} />
      <FloatingContact />

      <div className="">{children}</div>

      {/* Footer chỉ hiện ở các trang trong nhóm (site) */}
      <Footer />
    </div>
  );
}
