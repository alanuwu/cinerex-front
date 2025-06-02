import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Movie } from "@/entities";
import React from "react";

export default async function ShowMovies() {
  const headers = await authHeaders();
  const response = await fetch(`${API_URL}/movie`, {
    method: "GET",
    headers: {
      ...headers,
    },
    next: {
      tags: ["/admin/movies"],
    },
  });
  const data: Movie[] = await response.json();

  return (
    <section className="py-8 px-2 md:px-8 lg:px-12 xl:px-16 ml-0 md:ml-72 transition-all">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Cartelera Cinerex
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {data.map((movie, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.03] transition-transform border border-blue-100"
          >
            <img
              src={movie.movieImageUrl}
              alt={movie.movieTitle}
              className="w-full h-52 md:h-56 lg:h-64 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-blue-700 mb-2">
                {movie.movieTitle}
              </h3>
              <p className="text-gray-600 mb-1 text-sm md:text-base">
                <span className="font-semibold">
                  {movie.movieDurationMinutes} min
                </span>{" "}
                |{" "}
                <span className="font-semibold">{movie.movieGenre}</span>
              </p>
              <p className="text-gray-700 mb-3 flex-1 text-sm md:text-base">
                {movie.movieDescription}
              </p>
              <a
                href={`/admin/movies/${movie.movieId}`}
            
                rel="noopener noreferrer"
                className="inline-block mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold text-center transition text-sm md:text-base"
              >
                Detalles
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
