import MovieForm from "../_components/movieForm";

export async function getMovieData(id: number) {
  // Escribe aquí tu token JWT completo
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUGFzc3dvcmQiOiIkMmIkMDUkYi5ldkEwSFFURjZ6SXY4V0p3L0hxdXdmV2pnbzdsdk9MQy40SVVtTEYwemh1czJFVmNZc1MiLCJ1c2VyUm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNzQ4NjkwNDIwLCJleHAiOjE3NDkyOTUyMjB9.-XGy3BipHjmN-h71DhNAnw3Dxgi2ZcX4CdWUnYx4zDY";

  const res = await fetch(`http://localhost:4000/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

  // Agrupar showtimes por idioma
  const horariosPorIdioma: { [idioma: string]: string[] } = {};

  for (const st of movieData.showtimes ?? []) {
    const idioma = st.language ?? "Español"; // ✅ Usa el idioma real si viene en los datos
    if (!horariosPorIdioma[idioma]) horariosPorIdioma[idioma] = [];

    horariosPorIdioma[idioma].push(
      new Date(st.dateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  const showtimes = Object.entries(horariosPorIdioma).map(
    ([idioma, horarios]) => ({
      idioma,
      horarios,
    })
  );

  return (
    <MovieForm
      movie={{
        movieImageUrl: movieData.movieImageUrl,
        movieTitle: movieData.movieTitle,
        movieDurationMinutes: movieData.movieDurationMinutes,
        movieGenre: movieData.movieGenre,
        movieDescription: movieData.movieDescription,
        trailerUrl: movieData.trailerUrl ?? "",
      }}
      showtimes={showtimes}
    />
  );
}
