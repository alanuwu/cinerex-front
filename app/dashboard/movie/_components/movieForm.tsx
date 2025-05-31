import React from "react";




//CAMBIAR A ENTIDADES DEL ARCHIVO ENTITIES
type Movie = {
  movieImageUrl: string;
  movieTitle: string;
  movieDurationMinutes: number;
  movieGenre: string;
  movieDescription: string;
  trailerUrl: string;
};

type Showtime = {
  idioma: string;
  horarios: string[];
};

export default function MovieForm({
  movie,
  showtimes = [],
}: {
  movie?: Movie;
  showtimes?: Showtime[];
}) {
  if (!movie) {
    return (
      <div className="p-4 text-red-500">
        No se encontró la información de la película.
      </div>
    );
  }

  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <main className="p-4 flex flex-col md:flex-row gap-8">
      {/* Sección de detalles de la función */}
      <section
        className="flex-1 bg-white shadow-md p-6"
        style={{
          border: "3px solid",
          borderImage: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6) 1",
          borderRadius: "24px", // Bordes redondeados
        }}
      >
        <h2 className="text-xl font-bold mb-4">Detalles de la función</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Idioma</label>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded bg-gray-200 font-semibold">
              Sub
            </button>
            <button className="px-4 py-2 rounded bg-gray-200 font-semibold">
              Doblada
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Fecha</label>
          <select className="w-full border rounded px-2 py-1">
            {dias.map((dia) => (
              <option key={dia}>{dia}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Horarios Disponibles</label>
          <div className="grid grid-cols-3 gap-2">
            {(showtimes ?? []).map((st) =>
              st.horarios.map((hora, idx) => (
                <button
                  key={st.idioma + hora + idx}
                  className="px-4 py-2 rounded border border-blue-400 bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition"
                >
                  {hora}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold shadow">
            Siguiente
          </button>
        </div>
      </section>

      {/* Sección de información de la película */}
      <section
        className="flex-1 bg-white shadow-md p-6 flex flex-col gap-4"
        style={{
          border: "3px solid",
          borderImage: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6) 1",
          borderRadius: "24px", // Bordes redondeados
        }}
      >
        <div className="flex gap-8 items-start">
          <img
            src={movie.movieImageUrl}
            alt="imagen peli"
            className="w-64 h-96 object-cover rounded-lg shadow-lg border-2 border-blue-300"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-2">
              {movie.movieTitle}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{movie.movieDurationMinutes} min</span>{" "}
              |{" "}
              <span className="font-semibold">{movie.movieGenre}</span>
            </p>
            <div>
              <label className="block font-semibold mb-1">Descripción</label>
              <p className="text-gray-700">{movie.movieDescription}</p>
            </div>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Trailer</label>
          <div className="aspect-video w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden border-2 border-blue-200">
            {movie.trailerUrl ? (
      <iframe
      src={movie.trailerUrl}
      title="Trailer"
      className="w-full h-40"
    />
  ) : (
    <p className="text-center text-white py-10">Trailer no disponible</p>
  )}
</div>
        </div>
      </section>
    </main>
  );
}

// Uso del componente MovieForm con datos de ejemplo
const movieData = {
  movieImageUrl:
    "https://image.tmdb.org/t/p/w500/your-movie-image.jpg",
  movieTitle: "Título de la película",
  movieDurationMinutes: 120,
  movieGenre: "Acción",
  movieDescription: "Descripción de la película.",
  trailerUrl: "https://www.youtube.com/embed/your-trailer-url",
};

const showtimesData = [
  {
    idioma: "Español",
    horarios: ["14:00", "17:00", "20:00"],
  },
  {
    idioma: "Inglés",
    horarios: ["15:00", "18:00", "21:00"],
  },
];

<MovieForm movie={movieData} showtimes={showtimesData} />;