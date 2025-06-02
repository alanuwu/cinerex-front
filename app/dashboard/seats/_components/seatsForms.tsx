"use client";
import React, { useState } from "react";
import type { Movie, Room, Showtime } from "@/entities";

export default function SeatsForms({
  movie,
  room,
  selectedShowtime,
}: {
  movie: Movie;
  room: Room | null;
  selectedShowtime: Showtime | null;
}) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const roomName = room ? room.roomName : "Sala";
  const roomCapacity = room ? room.roomCapacity : 96;

  // Calcula columnas para que la sala sea lo más cuadrada posible (entre 8 y 16 columnas)
  const columns = Math.max(8, Math.min(16, Math.ceil(Math.sqrt(roomCapacity))));
  const rows = Math.ceil(roomCapacity / columns);

  // Genera los asientos según la capacidad de la sala
  const seatRows = Array.from({ length: rows }, (_, i) =>
    Array.from(
      { length: columns },
      (_, j) => {
        const seatNumber = i * columns + j + 1;
        return seatNumber <= roomCapacity
          ? `${String.fromCharCode(65 + i)}${j + 1}`
          : null;
      }
    ).filter(Boolean)
  );

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <main className="p-8 flex flex-col md:flex-row gap-8">
      {/* Selector de asientos */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Selecciona tus asientos</h2>
        <div className="border-b w-full mb-4" />
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {seatRows.map((row, i) => (
              <div key={i} className="flex justify-center mb-2">
                {row.map((seat) => (
                  <button
                    key={seat}
                    className={`w-8 h-8 m-1 rounded-full border text-xs
                      ${selectedSeats.includes(seat)
                        ? "bg-green-500 text-white"
                        : "bg-white hover:bg-blue-100"
                      }`}
                    onClick={() => handleSeatClick(seat!)}
                    disabled={false}
                  >
                    {seat!.replace(/^[A-Z]/, "")}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">{roomName}</div>
        </div>
      </section>
      {/* Resumen y detalles de la película */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex gap-6 items-start">
          <img
            src={movie.movieImageUrl}
            alt="imagen peli"
            className="w-40 h-60 object-cover rounded-lg shadow-lg border-2 border-blue-300"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-1 mb-2">
              {movie.movieTitle}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{movie.movieDurationMinutes} min</span>
              | <span className="font-semibold">{movie.movieGenre}</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Boletos (cantidad)</label>
          <div className="text-gray-700 min-h-[24px]">
            {selectedSeats.length}
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Asientos seleccionados</label>
          <div className="text-gray-700 min-h-[24px]">
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Ninguno"}
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Order summary:</label>
          <div className="text-2xl font-bold text-green-700">
            {selectedShowtime
              ? `$${(selectedSeats.length * selectedShowtime.price).toFixed(2)}`
              : "$0.00"}
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={selectedSeats.length === 0}
        >
          Pagar
        </button>
      </section>
    </main>
  );
}

