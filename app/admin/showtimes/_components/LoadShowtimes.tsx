"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { Showtime } from "@/entities";

export default function LoadShowtimes() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const res = await fetch(`${API_URL}/showtime`, { credentials: "include" });
        const data = await res.json();
        setShowtimes(data);
      } finally {
        setLoading(false);
      }
    };
    fetchShowtimes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600 font-semibold">Cargando funciones...</span>
      </div>
    );
  }

  // Agrupar funciones por película usando el eager de la API
  const showtimesByMovie: { [movieTitle: string]: Showtime[] } = {};
  showtimes.forEach((showtime) => {
    const title = showtime.movie.movieTitle || "Sin título";
    if (!showtimesByMovie[title]) {
      showtimesByMovie[title] = [];
    }
    showtimesByMovie[title].push(showtime);
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-extrabold mb-10 text-blue-700 text-center tracking-tight">Funciones por Película</h2>
      {Object.keys(showtimesByMovie).length === 0 ? (
        <div className="text-center text-gray-500">No hay funciones registradas.</div>
      ) : (
        Object.entries(showtimesByMovie).map(([movieTitle, showtimes]) => (
          <div key={movieTitle} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-8 bg-blue-400 rounded-lg" />
              <h3 className="text-2xl font-bold text-blue-700">{movieTitle}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow border border-blue-100">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Fecha</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Hora</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Sala</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Idioma</th>
                    <th className="px-4 py-2 text-left text-blue-700 font-semibold">Precio</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {showtimes.map(showtime => (
                    <tr key={showtime.id} className="border-b last:border-b-0 hover:bg-blue-50 transition">
                      <td className="px-4 py-2 font-mono text-blue-900">
                        {new Date(showtime.dateTime).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 font-mono text-gray-700">
                        {new Date(showtime.dateTime).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {showtime.room.roomName}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {showtime.lenguage || "Español"}
                      </td>
                      <td className="px-4 py-2 text-green-700 font-bold">
                        {showtime.price ? `$${showtime.price}` : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={`/admin/showtimes/${showtime.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-1 rounded-full shadow transition text-xs inline-block"
                        >
                          Ver Detalles
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}