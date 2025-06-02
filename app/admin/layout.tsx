'use client';

import { usePathname } from "next/navigation";
import Footer from "./_components/Footer";
import Sidebar from "./_components/Sidebar";


export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col justify-between">

    <Sidebar />
      <main className="flex-grow">
        {children}
        {path === "/admin"}
      </main>

     
    </div>
  );
}
