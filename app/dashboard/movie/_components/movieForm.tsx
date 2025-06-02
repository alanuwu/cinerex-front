"use client";
import React, { useState } from "react";
import type { Movie, Showtime } from "@/entities";
import { useRouter } from "next/navigation";

function getEmbedUrl(url?: string) {
  if (!url) return "";
  // Si ya es embed, regresa igual
  if (url.includes("/embed/")) return url;
  // Extrae el id del video
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : "";
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export default function MovieForm({
  movie,
}: {
  movie?: Movie & { trailerUrl?: string };
}) {
  const router = useRouter();

  if (!movie) {
    return (
      <div className="p-4 text-red-500">
        No se encontró la información de la película.
      </div>
    );
  }

  // Obtener idiomas únicos
  const idiomas = Array.from(
    new Set(movie.showtimes.map((st) => st.lenguage))
  );

  // Obtener días únicos (formato: YYYY-MM-DD)
  const diasUnicos = Array.from(
    new Set(
      movie.showtimes.map((st) =>
        new Date(st.dateTime).toLocaleDateString("es-MX", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      )
    )
  );

  // Estado para idioma, día y showtime seleccionados
  const [idiomaSel, setIdiomaSel] = useState(idiomas[0]);
  const [diaSel, setDiaSel] = useState(diasUnicos[0]);
  const [showtimeSel, setShowtimeSel] = useState<string | null>(null);

  // Filtrar showtimes por idioma y día seleccionados
  const horariosFiltrados = movie.showtimes.filter(
    (st) =>
      st.lenguage === idiomaSel &&
      new Date(st.dateTime).toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) === diaSel
  );

  //"Siguiente"
  const handleNext = () => {
    if (showtimeSel) {
      // Buscar el showtime seleccionado
      const showtimeObj = movie.showtimes.find((st) => st.id === showtimeSel);
      // Obtener el roomId (puede ser string o Room)
      let roomId = "";
      if (showtimeObj) {
        if (typeof showtimeObj.room === "string") {
          roomId = showtimeObj.room;
        } else if (
          typeof showtimeObj.room === "object" &&
          showtimeObj.room !== null
        ) {
          roomId = showtimeObj.room.roomId;
        }
      }
      // Puedes pasar ambos como query params o en el path
      router.push(`/dashboard/seats/${showtimeSel}?roomId=${roomId}`);
    }
  };

  return (
    <main className="p-4 flex flex-col md:flex-row gap-8">
      {/*Detalles de la función*/}
      <section
        className="flex-1 bg-white shadow-md p-6"
        style={{
          border: "3px solid",
          borderImage: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6) 1",
          borderRadius: "24px",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Detalles de la función</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Idioma</label>
          <div className="flex gap-4">
            {idiomas.map((idioma) => (
              <button
                key={idioma}
                className={`px-4 py-2 rounded font-semibold ${
                  idiomaSel === idioma
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setIdiomaSel(idioma);
                  setShowtimeSel(null); // reset horario seleccionado
                }}
                type="button"
              >
                {idioma}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Día</label>
          <div className="flex gap-4 flex-wrap">
            {diasUnicos.map((dia) => (
              <button
                key={dia}
                className={`px-4 py-2 rounded font-semibold ${
                  diaSel === dia ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => {
                  setDiaSel(dia);
                  setShowtimeSel(null); // reset horario seleccionado
                }}
                type="button"
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Horarios Disponibles</label>
          <div className="grid grid-cols-3 gap-2">
            {horariosFiltrados.map((st) => (
              <button
                key={st.id}
                className={`px-4 py-2 rounded border font-semibold shadow transition
                  ${
                    showtimeSel === st.id
                      ? "bg-blue-600 text-white border-blue-700"
                      : "border-blue-400 bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                type="button"
                onClick={() => setShowtimeSel(st.id)}
              >
                {new Date(st.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold shadow disabled:opacity-50"
            disabled={!showtimeSel}
            onClick={handleNext}
            type="button"
          >
            Siguiente
          </button>
        </div>
      </section>

      {/*Información de la película*/}
      <section
        className="flex-1 bg-white shadow-md p-6 flex flex-col gap-4"
        style={{
          border: "3px solid",
          borderImage: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6) 1",
          borderRadius: "24px",
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
          <div className="aspect-video w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden border-2 border-blue-200">
            <iframe
              src={getEmbedUrl(movie.movieTrailer)}
              title="Trailer"
              className="w-full h-full min-h-[340px]"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
