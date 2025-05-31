import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Movie } from "@/entities";
import React from "react";



export default async function CompleteMovies() {
 const headers = await authHeaders()
    const response = await fetch(`${API_URL}/movie`,{
        method : "GET",
        headers : {
            ...headers,
        },
        next : {
           tags:["dashboard:billboard"] 
        }

    });
    const data:Movie[] = await response.json();



  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Cartelera Cinerex
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {data.map((movie, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform border border-blue-100"
          >
            <img
              src={movie.movieImageUrl}
              alt={movie.movieTitle}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {movie.movieTitle}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">
                  {movie.movieDurationMinutes} min
                </span>{" "}
                |{" "}
                <span className="font-semibold">{movie.movieGenre}</span>
              </p>
              <p className="text-gray-700 mb-3 flex-1">
                {movie.movieDescription}
              </p>
              <a
                href={"/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold text-center transition"
              >
                Ver Trailer
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
