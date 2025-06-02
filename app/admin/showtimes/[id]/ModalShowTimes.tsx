"use client";

import updateShowTime from "@/actions/movies/showtime/update";
import React from "react";

interface EditShowtimeModalProps {
    id : string;
  editValues: any;
  setEditValues: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ModalShowtime({
    id,
  editValues,
  setEditValues,
  onClose,
  onSubmit,
  handleEditChange,
}: EditShowtimeModalProps) {

      const updateShowTimeById = updateShowTime.bind(null, id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">Editar Función</h3>
        <form action={updateShowTimeById} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Fecha</label>
            <input
              type="date"
              name="showtimeDate"
              value={editValues.showtimeDate}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Hora</label>
            <input
              type="time"
              name="showtimeTime"
              value={editValues.showtimeTime}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Sala</label>
            <input
              type="text"
              name="roomName"
              value={editValues.roomName}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Idioma</label>
            <input
              type="text"
              name="language"
              value={editValues.language}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={editValues.price}
              onChange={handleEditChange}
              className="w-full border rounded px-3 py-2"
              min={0}
              step="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
