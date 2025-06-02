import React from "react";
import { ShieldCheck, Film, Users, Ticket } from "lucide-react";

const AdminDashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-yellow-50 to-blue-50 rounded-3xl shadow-xl mx-auto max-w-3xl mt-12 p-10">
    <div className="flex flex-col items-center gap-3 mb-6">
      <ShieldCheck size={56} className="text-yellow-500 drop-shadow-lg" />
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">
        ¡Bienvenido Administrador!
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-xl">
        Este es el <span className="font-semibold text-yellow-600">Panel de Administración</span> de <span className="font-semibold text-blue-700">CineRex</span>.
        <br />
        Gestiona películas, usuarios y boletos de manera sencilla y eficiente.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full">
      <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <Film size={36} className="text-blue-500 mb-2" />
        <span className="font-semibold text-gray-700">Películas</span>
        <span className="text-xs text-gray-400 mt-1 text-center">Administra la cartelera y horarios</span>
      </div>
      <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <Users size={36} className="text-green-500 mb-2" />
        <span className="font-semibold text-gray-700">Usuarios</span>
        <span className="text-xs text-gray-400 mt-1 text-center">Gestiona clientes y administradores</span>
      </div>
      <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <Ticket size={36} className="text-yellow-500 mb-2" />
        <span className="font-semibold text-gray-700">Boletos</span>
        <span className="text-xs text-gray-400 mt-1 text-center">Consulta y administra ventas</span>
      </div>
    </div>
  </div>
);

export default AdminDashboard;