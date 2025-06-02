import ShowtimesForm from "./ShowtimesForm";




export default function ShowTimePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
      <ShowtimesForm/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
