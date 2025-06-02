import SeatsForms from "../_components/seatsForms";
import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import type { Movie, Showtime, Room } from "@/entities";

export async function getShowtimeData(id: string) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/showtime/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo cargar la función");

  const data = await res.json();
  console.log("Showtime Data:", data); // Verifica la respuesta de la API
  return data;
}

export async function getRoomData(roomId: string) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/room/${roomId}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("No se pudo cargar la información de la sala");

  const data = await res.json();
  console.log("Room Data:", data); // Verifica la respuesta de la API
  return data;
}

export default async function SeatsPage({
  params,
}: {
  params: { idSeat: string };
}) {
  // Verifica que params.idSeat esté disponible
  if (!params || !params.idSeat) {
    return (
      <div className="p-4 text-red-500">
        No se encontró el parámetro de la función.
      </div>
    );
  }

  const showtimeData = await getShowtimeData(params.idSeat);

  // Si no hay datos de la película, muestra un mensaje de error
  if (!showtimeData.movie) {
    return (
      <div className="p-4 text-red-500">
        No se encontró la información de la película.
      </div>
    );
  }

  // Obtén el showtime y su room asociado
  const selectedShowtime: Showtime = showtimeData;

  // Verifica si room es un string (ID) o un objeto
  let roomData: Room | null = null;
  if (typeof selectedShowtime.room === "string") {
    // Si es un string, realiza una solicitud para obtener los datos de la sala
    roomData = await getRoomData(selectedShowtime.room);
  } else if (typeof selectedShowtime.room === "object") {
    // Si ya es un objeto, úsalo directamente
    roomData = selectedShowtime.room;
  }

  return (
    <SeatsForms
      movie={showtimeData.movie as Movie}
      room={roomData}
      selectedShowtime={selectedShowtime}
    />
  );
}