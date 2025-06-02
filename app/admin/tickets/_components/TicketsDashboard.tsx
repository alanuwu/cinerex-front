"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { Ticket } from "@/entities";




export default function TicketsDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_URL}/ticket`, { credentials: "include" });
        const data = await res.json();
        setTickets(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600 font-semibold">Cargando tickets...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-extrabold mb-10 text-blue-700 text-center tracking-tight">Tickets Vendidos</h2>
      {tickets.length === 0 ? (
        <div className="text-center text-gray-500">No hay tickets registrados.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border border-blue-100">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Usuario</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Email</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Película</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Fecha</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Hora</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Sala</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Asiento</th>
                <th className="px-4 py-2 text-left text-blue-700 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} className="border-b last:border-b-0 hover:bg-blue-50 transition">
                  <td className="px-4 py-2">{ticket.customer.customerName|| "Sin usuario"}</td>
                  <td className="px-4 py-2">{ticket.customer.customerEmail || "-"}</td>
                  <td className="px-4 py-2">{ticket.showtime?.movie?.movieTitle || "-"}</td>
                  <td className="px-4 py-2 font-mono text-blue-900">{new Date(ticket.showtime?.dateTime).toLocaleDateString()}</td>
                  <td className="px-4 py-2 font-mono text-gray-700">{new Date(ticket.showtime?.dateTime).toLocaleTimeString()}</td>
                  <td className="px-4 py-2">{ticket.showtime?.room?.roomName || "-"}</td>
                  <td className="px-4 py-2">{ticket.showtime?.room.roomId}</td>
                  <td className="px-4 py-2 text-green-700 font-bold">{ticket.price ? `$${ticket.price.toFixed(2)}` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}