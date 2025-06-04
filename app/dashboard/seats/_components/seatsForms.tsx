"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const getPrice = () => (selectedShowtime ? selectedShowtime.price : "N/A");
  const getRoomName = () => (room ? room.roomName : "Sala no disponible");
  const getRoomCapacity = () => (room ? room.roomCapacity : 0);

  const roomCapacity = getRoomCapacity();
  const columns = Math.max(8, Math.min(16, Math.ceil(Math.sqrt(roomCapacity))));
  const rows = Math.ceil(roomCapacity / columns);

  const seatRows = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => {
      const seatNumber = i * columns + j + 1;
      return seatNumber <= roomCapacity
        ? `${String.fromCharCode(65 + i)}${j + 1}`
        : null;
    }).filter((seat): seat is string => seat !== null)
  );

  const [occupiedSeats, setOccupiedSeats] = useState<string[]>(() => {

    const saved = typeof window !== "undefined" && localStorage.getItem("occupiedSeats");
    if (saved) {
      try {
        return JSON.parse(saved) as string[];
      } catch {

      }
    }

    const allSeats = seatRows.flat();
    const totalSeats = allSeats.length;
    const remainingSeats = selectedShowtime?.remainingSeats ?? totalSeats;
    const occupiedCount = totalSeats - remainingSeats;
    const shuffled = [...allSeats].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, occupiedCount);
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("occupiedSeats", JSON.stringify(occupiedSeats));
    }
  }, [occupiedSeats]);

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePaymentRedirect = () => {
    if (!selectedShowtime) return;
    let roomId = "";
    if (typeof selectedShowtime.room === "string") {
      roomId = selectedShowtime.room;
    } else if (
      typeof selectedShowtime.room === "object" &&
      selectedShowtime.room !== null
    ) {
      roomId = selectedShowtime.room.roomId;
    }
    const seats = selectedSeats.join(",");
    router.push(
      `/dashboard/payments/orderSummary?showtimeId=${selectedShowtime.id}&roomId=${roomId}&seats=${encodeURIComponent(
        seats
      )}`
    );
  };

  return (
    <main className="p-8 flex flex-col md:flex-row gap-8">
      {/* Selector de asientos */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Selecciona tus asientos</h2>
        <div className="border-b w-full mb-4" />
        <div className="flex flex-col items-center w-full">
          {/* Pantalla simulada */}
          <div className="w-3/4 mx-auto mb-6">
            <div className="bg-gray-300 rounded-b-3xl h-8 flex items-center justify-center shadow-inner">
              <span className="text-gray-600 font-semibold text-sm tracking-widest">
                Pantalla
              </span>
            </div>
          </div>

          {/* Asientos con etiquetas de fila */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {seatRows.map((row, i) => {
              const rowLabel = String.fromCharCode(65 + i);
              return (
                <div key={i} className="flex items-center justify-center mb-2">
                  {/* Letra de fila */}
                  <span className="w-6 text-center font-bold text-gray-700 mr-2">
                    {rowLabel}
                  </span>
                  {/* Botones de asientos */}
                  <div className="flex">
                    {row.map((seat) => {
                      const isAvailable = !occupiedSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          key={seat}
                          disabled={!isAvailable}
                          className={`w-8 h-8 m-1 rounded-full border text-xs ${
                            isAvailable
                              ? isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-blue-100"
                              : "bg-gray-400 text-white cursor-not-allowed"
                          }`}
                          onClick={() => isAvailable && handleSeatClick(seat)}
                        >
                          {seat.replace(/^[A-Z]/, "")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 text-xs text-gray-500">{getRoomName()}</div>
        </div>
      </section>

      {/* Resumen y detalles de la película */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex gap-6 items-start">
          <img
            src={movie.movieImageUrl}
            alt="Imagen de la película"
            className="w-40 h-60 object-cover rounded-lg shadow-lg border-2 border-blue-300"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-2">
              {movie.movieTitle}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">
                {movie.movieDurationMinutes} min
              </span>{" "}
              |{" "}
              <span className="font-semibold">{movie.movieGenre}</span>
            </p>
            <div className="text-xs text-gray-600 mt-2">
              {movie.movieDescription}
            </div>
            <div className="text-xs text-blue-500 mt-2">
              <a
                href={movie.movieTrailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver trailer
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1">Precio</label>
          <div className="text-gray-700 min-h-[24px]">{`$${getPrice()}`}</div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Capacidad de la sala</label>
          <div className="text-gray-700 min-h-[24px]">{getRoomCapacity()}</div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Boletos (cantidad)</label>
          <div className="text-gray-700 min-h-[24px]">{selectedSeats.length}</div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Asientos seleccionados</label>
          <div className="text-gray-700 min-h-[24px]">
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Ninguno"}
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Resumen del pedido:</label>
          <div className="text-2xl font-bold text-green-700">
            {selectedShowtime
              ? `$${(
                  selectedSeats.length * parseFloat(selectedShowtime.price)
                ).toFixed(2)}`
              : "$0.00"}
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={selectedSeats.length === 0}
          onClick={handlePaymentRedirect}
        >
          Pagar
        </button>
      </section>
    </main>
  );
}
