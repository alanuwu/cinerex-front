import Carrousel from './_components/Carrousel';
import MovieCarousel from './_components/MovieCarousel';
import Navbar from './_components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
        <Carrousel />
        <MovieCarousel />
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
