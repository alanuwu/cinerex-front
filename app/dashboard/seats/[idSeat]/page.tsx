import SeatsForms from "../_components/seatsForms";
import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import type { Movie, Showtime } from "@/entities";

export async function getShowtimeData(id: string) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/showtime/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo cargar la función");

  return res.json();
}

export default async function SeatsPage({
  params,
}: {
  params: { idSeat: string };
}) {
  const showtimeData = await getShowtimeData(params.idSeat);

  // Si no hay datos de la película, muestra un mensaje de error
  if (!showtimeData.movie) {
    return (
      <div className="p-4 text-red-500">
        No se encontró la información de la película.
      </div>
    );
  }

  // Obtén el primer showtime y su room asociado
  const selectedShowtime = showtimeData.movie.showtimes?.[0];
  const roomData = selectedShowtime?.room || null;

  return (
    <SeatsForms
      movie={showtimeData.movie as Movie}
      room={roomData}
      selectedShowtime={selectedShowtime as Showtime}
    />
  );
}
