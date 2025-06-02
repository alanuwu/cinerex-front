
import deleteMovie from "@/actions/movies/delete";

export default function DeleteMovie({ movieId }: { movieId: number }) {
  const deleteMovieById = deleteMovie.bind(null, movieId);

  return (
    <form action={deleteMovieById} className="w-full">
      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-2 transition"
        onClick={e => {
          if (!confirm("¿Estás seguro de eliminar esta película?")) e.preventDefault();
        }}
      >
        Eliminar Película
      </button>
    </form>
  );
}