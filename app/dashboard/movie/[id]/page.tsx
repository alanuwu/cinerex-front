import MovieForm from "../_components/movieForm";
import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";

export async function getMovieData(id: number) {
  const headers = await authHeaders();

  const res = await fetch(`${API_URL}/movie/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo cargar la película");

  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const movieData = await getMovieData(id);

  return (
    <MovieForm
      movie={{
        ...movieData,
        trailerUrl: movieData.movieTrailer ?? "",
      }}
    />
  );
}