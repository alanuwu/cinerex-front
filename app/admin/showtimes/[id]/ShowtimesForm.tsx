"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/constants";
import ModalShowtime from "./ModalShowTimes";

export default function ShowtimesForm() {
  const { id } = useParams();
  const router = useRouter();
  const [showtime, setShowtime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editValues, setEditValues] = useState<any>({});

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const res = await fetch(`${API_URL}/showtime/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("No se pudo cargar la función");
        const data = await res.json();
        setShowtime(data);
        setEditValues({
          showtimeDate: data.showtimeDate || data.dateTime?.split("T")[0],
          showtimeTime: data.showtimeTime || data.dateTime?.split("T")[1]?.slice(0, 5),
          roomName: data.room?.roomName || data.room || "",
          language: data.language || "Español",
          price: data.price || "",
        });
      } catch (err) {
        setError("No se pudo cargar la función.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShowtime();
  }, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías llamar a tu server action para actualizar el showtime
    // Por ejemplo: await updateShowtime(id, editValues)
    setShowModal(false);
    // Opcional: recargar los datos
    setShowtime((prev: any) => ({
      ...prev,
      ...editValues,
      room: { ...prev.room, roomName: editValues.roomName },
      language: editValues.language,
      price: editValues.price,
      showtimeDate: editValues.showtimeDate,
      showtimeTime: editValues.showtimeTime,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600 font-semibold">Cargando función...</span>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-600 font-semibold">{error || "No se encontró la función."}</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 font-semibold rounded-full shadow transition border border-blue-200"
      >
        ← Regresar
      </button>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Detalles de la Función</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center mb-4">
          <span className="text-lg font-bold text-blue-800">{showtime.movie?.movieTitle || "Sin título"}</span>
          {showtime.movie?.movieImageUrl && (
            <img
              src={showtime.movie.movieImageUrl}
              alt={showtime.movie.movieTitle}
              className="w-40 h-56 object-cover rounded-xl shadow-lg mt-2 border border-blue-200"
            />
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-gray-500 font-semibold">Fecha</span>
            <span className="block font-mono text-blue-900">{showtime.showtimeDate || showtime.dateTime?.split("T")[0]}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Hora</span>
            <span className="block font-mono text-blue-900">{showtime.showtimeTime || showtime.dateTime?.split("T")[1]?.slice(0,5)}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Sala</span>
            <span className="block font-mono text-blue-900">{showtime.room?.roomName || showtime.room || "N/A"}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Idioma</span>
            <span className="block font-mono text-blue-900">{showtime.language || "Español"}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Precio</span>
            <span className="block font-mono text-green-700 font-bold">{showtime.price ? `$${showtime.price}` : "N/A"}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-full shadow transition"
          >
            Editar Función
          </button>
        </div>
      </div>

      {showModal && (
        <ModalShowtime
          editValues={editValues}
          setEditValues={setEditValues}
          onClose={() => setShowModal(false)}
          onSubmit={handleEditSubmit}
          handleEditChange={handleEditChange}
          id = {showtime.id}
        />
      )}
    </div>
  );
}