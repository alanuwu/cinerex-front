import LoadShowtimes from "./_components/LoadShowtimes";




export default function ShowTimePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
      <LoadShowtimes/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
