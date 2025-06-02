'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/constants';
import getRole from '@/app/(auth)/useRole';
import getInformation from '@/app/(auth)/useEmail';

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
  const [customer, setCustomer] = useState<null | {
    customerId: string;
    customerName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhoneNumber: string;
  }>(null);

  useEffect(() => {
    const fetchUserAndTickets = async () => {
      try {
        // Obtener el usuario y su información de customer
        const userData = await getRole();
        if (userData?.user) {
          const customerData = await getInformation(userData.user.userEmail);
          setCustomer(customerData);

          // Obtener todos los tickets
          const res = await fetch(`${API_URL}/ticket`, {
            method: 'GET',
            credentials: 'include'
          });
          const data = await res.json();

          // Filtrar tickets por nombre y apellido del customer logueado
          const filtered = data.filter(
            (ticket: Ticket) =>
              ticket.customer.customerName === customerData.customerName &&
              ticket.customer.customerLastName === customerData.customerLastName
          );
          setTickets(filtered);
        }
      } catch (error) {
        console.error('Error fetching tickets or user:', error);
      }
    };

    fetchUserAndTickets();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 justify-items-center">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="rounded-2xl border p-6 shadow-lg flex flex-col min-h-[700px] min-w-[450px] w-full max-w-md bg-white font-sans"
        >
          <div className="flex mb-4">
            <div className="w-52 h-72 relative rounded-lg overflow-hidden mr-6">
              <img
                src={ticket.showtime.movie.movieImageUrl}
                alt={ticket.showtime.movie.movieTitle}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-2xl mb-3">{ticket.showtime.movie.movieTitle}</h2>
                <p className="text-base text-gray-700 underline mb-4 break-words">
                  {ticket.showtime.movie.movieDescription}
                </p>
                <p className="mb-2">
                  <strong>Duración:</strong> {ticket.showtime.movie.movieDurationMinutes} min
                </p>
                <p className="mb-2">
                  <strong>Género:</strong> {ticket.showtime.movie.movieGenre}
                </p>
                <p className="mb-2">
                  <strong>Idioma:</strong> {ticket.showtime.lenguage}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-base text-gray-800 flex-1 font-sans">
            <p className="mb-2">
              <strong>Cine:</strong> CineRex
            </p>
            <p className="mb-2">
              <strong>Sala:</strong> {ticket.showtime.room.roomName}
            </p>
            <p className="mb-2">
              <strong>Fecha y Hora:</strong> {new Date(ticket.showtime.dateTime).toLocaleString()}
            </p>
            <div className="mt-4 border-t pt-4">
              <strong className="block mb-2">Datos del cliente:</strong>
              <ul className="list-none mt-1 text-gray-900 space-y-2">
                <li>
                  <span className="font-semibold">Nombre:</span> {ticket.customer.customerName} {ticket.customer.customerLastName}
                </li>
                <li>
                  <span className="font-semibold">Email:</span> {ticket.customer.customerEmail}
                </li>
                <li>
                  <span className="font-semibold">Teléfono:</span> {ticket.customer.customerPhoneNumber}
                </li>
                <li>
                  <span className="font-semibold">ID Cliente:</span> {ticket.customer.customerId}
                </li>
                <li>
                  <span className="font-semibold">Precio del boleto:</span> ${ticket.price}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
