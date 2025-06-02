import Navbar from '../_components/Navbar';
export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="p-4">{children}</main>
    </>
  );
}