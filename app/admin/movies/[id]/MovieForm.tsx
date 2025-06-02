"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/constants";
import { Movie } from "@/entities";
import updateMovie from "@/actions/movies/update";
import deleteMovie from "@/actions/movies/delete";
import { ArrowLeft } from "lucide-react";

export default function MovieForm() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${API_URL}/movie/${id}`, {
          credentials: "include",
          next: { tags: [`admin:movies:${id}`] }
        });
        if (!res.ok) throw new Error("No se pudo cargar la película");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setMovie(null);
        setError("No se pudo cargar la película.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600 font-semibold">Cargando película...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-600 font-semibold">{error || "No se encontró la película."}</span>
      </div>
    );
  }

  const updateMovieById = updateMovie.bind(null, movie.movieId);
  const deleteMovieById = deleteMovie.bind(null, movie.movieId);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10 flex flex-col md:flex-row gap-8 relative">
      {/* Botón regresar mejorado */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute -top-6 left-0 flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 font-semibold rounded-full shadow transition z-10 border border-blue-200"
        style={{ transform: "translateY(-50%)" }}
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Regresar</span>
      </button>
      {/* Imagen de la película */}
      <div className="flex-shrink-0 flex flex-col items-center w-full md:w-1/3">
        <img
          src={movie.movieImageUrl}
          alt={movie.movieTitle}
          className="rounded-xl shadow-lg w-full h-64 object-cover mb-4 border border-blue-200"
        />
        <form className="w-full" action={deleteMovieById}>
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
      </div>
      {/* Formulario de datos */}
      <form className="flex-1" action={updateMovieById}>
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Editar Película</h2>
        <input type="hidden" name="movieId" value={movie.movieId} />
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Título</label>
          <input
            type="text"
            name="movieTitle"
            defaultValue={movie.movieTitle}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Descripción</label>
          <textarea
            name="movieDescription"
            defaultValue={movie.movieDescription}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Duración (minutos)</label>
            <input
              type="number"
              name="movieDurationMinutes"
              defaultValue={movie.movieDurationMinutes}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">Género</label>
            <input
              type="text"
              name="movieGenre"
              defaultValue={movie.movieGenre}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">URL Imagen</label>
          <input
            type="text"
            name="movieImageUrl"
            defaultValue={movie.movieImageUrl}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Trailer</label>
          <input
            type="text"
            name="movieTrailer"
            defaultValue={movie.movieTrailer}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {error && (
          <div className="text-red-600 font-semibold mb-2">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2 transition"
        >
          Actualizar Película
        </button>
      </form>
    </div>
  );
}