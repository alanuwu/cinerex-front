import PayTickets from "../_components/payTickets";
import { authHeaders } from "@/app/helpers/authHeaders";
import { API_URL } from "@/constants";
import { Showtime } from "@/entities";

// Función para obtener el JSON completo de un showtime usando solo su UUID.
export async function getPaymentData(searchParams: {
  showtimeId?: string;
  seats?: string;
}) {
  const headers = await authHeaders();
  const { showtimeId, seats } = searchParams;

  if (!showtimeId) {
    throw new Error("showtimeId es requerido");
  }

  try {
    const res = await fetch(`${API_URL}/showtime/${showtimeId}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener el showtime");
    }

    const showtime: Showtime = await res.json();
    console.log("Showtime data:", showtime); 

    const ticketCount = seats ? seats.split(",").length : 1;

    return {
      total: ticketCount * Number(showtime.price),
      cinema: "CineRex, Querétaro",
      dateAndTime: new Date(showtime.dateTime).toLocaleString(),
      room:
        typeof showtime.room === "object" && showtime.room !== null
          ? showtime.room.roomName
          : showtime.room,
      seats: seats
        ? seats.split(",").map((seat: string) => ({ type: seat, price: 150.0 }))
        : [],
      // Mapeo de la información de la película
      movie:
        typeof showtime.movie === "object" && showtime.movie !== null
          ? {
              title: showtime.movie.movieTitle,
              imageUrl: showtime.movie.movieImageUrl,
              duration: showtime.movie.movieDurationMinutes,
              genre: showtime.movie.movieGenre,
              description: showtime.movie.movieDescription,
              trailer: showtime.movie.movieTrailer,
            }
          : {
              title: String(showtime.movie),
              imageUrl: "",
              duration: 0,
              genre: "",
              description: "",
              trailer: "",
            },
    };
  } catch (error) {
    console.error("Fallo al cargar el showtime:", error);
    const ticketCount = seats ? seats.split(",").length : 1;
    return {
      total: ticketCount * 150.0,
      cinema: "CineRex, Querétaro",
      dateAndTime: "Domingo, 1 de junio, 11:30 p.m.",
      room: "Sala A",
      seats: seats
        ? seats.split(",").map((seat: string) => ({ type: seat, price: 150.0 }))
        : [],
      movie: {
        title: "Robe and Franky",
        imageUrl:
          "https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
        duration: 777,
        genre: "LAIRA",
        description: "Ian Ale Alan",
        trailer: "",
      },
    };
  }
}

export default async function PaymentOrderSummaryPage({
  searchParams,
}: {
  searchParams: { showtimeId?: string; seats?: string };
}) {
  const paymentData = await getPaymentData(searchParams);
  return <PayTickets paymentData={paymentData} />;
}