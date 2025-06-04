"use client";
import React, { useState } from "react";
import { Movie, Showtime, Room, Ticket, Customer } from "@/entities";
import { createTicket } from "@/app/boletos/api";
import { useRouter } from "next/navigation";

async function getAuthenticatedCustomer(): Promise<Customer> {
  const token = localStorage.getItem("token"); 

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"
    }/customers/me`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  if (!res.ok) {
    throw new Error("No se pudo obtener el cliente autenticado");
  }
  return await res.json(); // Customer real
}

interface PayTicketsProps {
  paymentData: any; // 
}

export default function PayTickets({ paymentData }: PayTicketsProps) {
  const router = useRouter(); // <-- agrega esto

  // Estados para los campos de detalles de pago (tarjeta)
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardPayment = async () => {
    // Valida campos obligatorios 
    if (!cardNumber || !expiration || !cvv) {
      alert("Por favor, complete todos los campos de detalles de pago.");
      return;
    }
    // Confirmar el pago
    const confirmPayment = window.confirm("¿Desea confirmar el pago?");
    if (confirmPayment) {
      try {
        // Obtener la información del cliente autenticado dinámicamente
        const customer = await getAuthenticatedCustomer();
        console.log("Customer data:", customer); // datos

        // Se arma el payload con los datos del boleto a crear.
        const ticketPayload = {
          price: Number(paymentData.total),
          purchaseDate: new Date().toISOString(),
          customer: customer.customerId, // solo el UUID
          showtime: paymentData.showtime.id, // solo el UUID
        };

        console.log("Ticket payload:", ticketPayload);

        //api.ts
        await createTicket(ticketPayload);
        alert(
          "¡Pago exitoso, gracias por su compra! Puede revisar su boleto en nuestra página."
        );
        router.push("/boletos"); 
      } catch (error: any) {
        alert("Error al crear el ticket: " + error.message);
      }
    }
  };

  return (
    <main className="p-8 flex flex-col md:flex-row gap-8">
      {/* Sección de Datos del Pago */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Detalles del Pago</h2>
        {/* Datos personales */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              Paso 1 <span className="ml-2">Datos personales</span>
            </div>
            <button className="text-gray-600">&darr;</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre(s)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue=""
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido(s)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue=""
                required
              />
            </div>
          </div>
        </div>
        {/* Método de pago */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              Paso 2 <span className="ml-2">Método de pago</span>
            </div>
            <button className="text-gray-600">&darr;</button>
          </div>
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Información de Tarjeta
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Número de Tarjeta
              </label>
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleCardPayment}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Pagar con Tarjeta
            </button>
          </div>
        </div>
      </section>
      {/* Resumen del pedido */}
      <section className="flex-1 bg-white shadow-md p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Tu pedido</h2>
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={paymentData.movie.imageUrl}
              alt={paymentData.movie.title}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div>
              <div className="font-semibold">{paymentData.movie.title}</div>
              <div className="text-xs text-gray-600">
                {paymentData.movie.duration} min | {paymentData.movie.genre}
              </div>
              <div className="text-xs text-gray-600 mt-2">
                {paymentData.movie.description}
              </div>
              <div className="text-xs text-blue-500 mt-2">
                <a
                  href={paymentData.movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver trailer
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-semibold">Cine</div>
          <div className="text-gray-700">{paymentData.cinema}</div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-semibold">Fecha y hora</div>
          <div className="text-gray-700">{paymentData.dateAndTime}</div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-semibold">Sala</div>
          <div className="text-gray-700">{paymentData.room}</div>
        </div>
        <div className="mb-4">
          <div className="text-sm font-semibold">Asientos</div>
          <div className="flex flex-col gap-2">
            {paymentData.seats.map(
              (seat: { type: string; price: number }, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        fill="currentColor"
                        d="M4 10V4h16v6H4zm2 10v-6h12v6a2 2 0 01-2 2H8a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div>{seat.type}</div>
                  </div>
                  <div>${seat.price.toFixed(2)}</div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between font-semibold">
            <div>Total</div>
            <div>${Number(paymentData.total).toFixed(2)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
