import { API_URL } from "@/constants";

export async function createTicket(ticketData: any): Promise<any> {
  const response = await fetch(`${API_URL}/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // si usas cookies/sesión
    body: JSON.stringify(ticketData)
  });

  if (!response.ok) {
    throw new Error("Error al crear el ticket.");
  }

  return response.json();
}