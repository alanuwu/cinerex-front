import Carrousel from './_components/Carrousel';
import MovieGrid from './_components/MovieGrid';
import Navbar from './_components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="space-y-8">
        <Carrousel />
        <MovieGrid />
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
