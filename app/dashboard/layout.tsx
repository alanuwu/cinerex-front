'use client';
import { usePathname } from "next/navigation";

import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col justify-between">

    <Navbar />
      <main className="flex-grow">
        {children}
        {path === "/dashboard"}
      </main>

      <Footer />
    </div>
  );
}
