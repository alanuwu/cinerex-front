import React from "react";

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="p-4">{children}</main>
    </>
  );
}