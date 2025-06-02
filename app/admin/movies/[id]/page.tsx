import DeleteMovie from "./DeleteMovie";
import MovieForm from "./MovieForm";



export default function MovieIDPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
       <MovieForm/>
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
