'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/constants';

type Ticket = {
  id: string;
  price: number;
  purchaseDate: string;
  customer: {
    customerId: string;
    customerName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhoneNumber: string;
  };
  showtime: {
    id: string;
    dateTime: string;
    price: string;
    remainingSeats: number;
    lenguage: string;
    movie: {
      movieId: number;
      movieTitle: string;
      movieDescription: string;
      movieDurationMinutes: number;
      movieGenre: string;
      movieImageUrl: string;
      movieTrailer: string | null;
    };
    room: {
      roomId: string;
      roomName: string;
      roomCapacity: number;
    };
  };
};

export default function TicketCards() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_URL}/ticket`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 justify-items-center">
      {tickets.map((ticket) => (
<div
  key={ticket.id}
  className="rounded-2xl border p-4 shadow-lg flex flex-col min-h-[700px] min-w-[450px] w-full max-w-md"
>
  <div className="flex">
    <div className="w-52 h-72 relative rounded-lg overflow-hidden mr-4">
      <img
        src={ticket.showtime.movie.movieImageUrl}
        alt={ticket.showtime.movie.movieTitle}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="flex-1">
      <h2 className="font-bold text-xl">
        {ticket.showtime.movie.movieTitle}
      </h2>
      <p className="text-sm text-gray-600 underline line-clamp-6">
        {ticket.showtime.movie.movieDescription}
      </p>
    </div>
  </div>

  <div className="mt-4 text-sm text-gray-700 flex-1">
    <p>
      <strong>Cine:</strong> CineRex{' '}
      <strong>Sala:</strong> {ticket.showtime.room.roomName}
    </p>
    <p className="mt-1">
      <strong>Fecha y Hora:</strong>{' '}
      {new Date(ticket.showtime.dateTime).toLocaleString()}
    </p>
    <div className="mt-2">
      <strong>Asientos:</strong>
      <ul className="list-disc list-inside">
        <li>1 adulto</li>
        <li>2 niños</li>
      </ul>
    </div>
  </div>
</div>

      ))}
    </div>
  );
}
