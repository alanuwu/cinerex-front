"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { Customer } from "@/entities";
import { Plus, Edit, Trash2 } from "lucide-react";
import createCustomer from "@/actions/users/create";

export default function UserDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  // Estado para los formularios
  const [form, setForm] = useState({
    customerName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhoneNumber: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${API_URL}/customers`, { credentials: "include" });
        const data = await res.json();
        setCustomers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Rellena el formulario al editar
  useEffect(() => {
    if (showEditModal && editCustomer) {
      setForm({
        customerName: editCustomer.customerName,
        customerLastName: editCustomer.customerLastName,
        customerEmail: editCustomer.customerEmail,
        customerPhoneNumber: editCustomer.customerPhoneNumber || "",
      });
    }
    if (showAddModal) {
      setForm({
        customerName: "",
        customerLastName: "",
        customerEmail: "",
        customerPhoneNumber: "",
      });
    }
  }, [showEditModal, showAddModal, editCustomer]);

  const handleDelete = async (customerId: string) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    await fetch(`${API_URL}/customers/${customerId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setCustomers(customers.filter(c => c.customerId !== customerId));
  };

  const handleEdit = (customerId: string) => {
    const customer = customers.find(c => c.customerId === customerId);
    setEditCustomer(customer || null);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const res = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al agregar cliente");
      const newCustomer = await res.json();
      setCustomers([...customers, newCustomer]);
      setShowAddModal(false);
    } catch (err) {
      alert("No se pudo agregar el cliente.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustomer) return;
    try {


      const res = await fetch(`${API_URL}/customers/${editCustomer.customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al editar cliente");
      const updatedCustomer = await res.json();
      setCustomers(customers.map(c =>
        c.customerId === editCustomer.customerId ? updatedCustomer : c
      ));
      setShowEditModal(false);
    } catch (err) {
      alert("No se pudo editar el cliente.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-blue-600 font-semibold">Cargando clientes...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl p-10 border border-blue-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight drop-shadow text-center">
          Clientes Registrados
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Plus size={20} /> <span className="hidden sm:inline">Agregar Cliente</span>
        </button>
      </div>
      {customers.length === 0 ? (
        <div className="text-center text-gray-400 text-lg py-16">
          <span className="inline-block bg-blue-100 px-6 py-3 rounded-xl shadow text-blue-700 font-semibold">
            No hay clientes registrados.
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow border border-blue-100 overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
              <tr>
                <th className="px-6 py-3 text-left text-blue-700 font-bold text-base">ID Cliente</th>
                <th className="px-6 py-3 text-left text-blue-700 font-bold text-base">Nombre</th>
                <th className="px-6 py-3 text-left text-blue-700 font-bold text-base">Email</th>
                <th className="px-6 py-3 text-left text-blue-700 font-bold text-base">Teléfono</th>
                <th className="px-6 py-3 text-center text-blue-700 font-bold text-base">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr
                  key={customer.customerId}
                  className="border-b last:border-b-0 hover:bg-blue-50/70 transition-all duration-150 group"
                >
                  <td className="px-6 py-3 font-mono text-blue-900">{customer.customerId}</td>
                  <td className="px-6 py-3 font-semibold text-gray-800">
                    {customer.customerName}{" "}
                    <span className="text-gray-500">{customer.customerLastName}</span>
                  </td>
                  <td className="px-6 py-3 text-blue-700">{customer.customerEmail}</td>
                  <td className="px-6 py-3">
                    {customer.customerPhoneNumber || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(customer.customerId)}
                      className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold px-3 py-1.5 rounded-full shadow transition flex items-center border border-yellow-200 group-hover:scale-105"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.customerId)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1.5 rounded-full shadow transition flex items-center border border-red-300 group-hover:scale-105"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modales */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Agregar Cliente</h3>
            <div className="space-y-4">
              <input
                name="customerName"
                value={form.customerName}
                onChange={handleFormChange}
                required
                placeholder="Nombre"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerLastName"
                value={form.customerLastName}
                onChange={handleFormChange}
                required
                placeholder="Apellido"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleFormChange}
                required
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerPhoneNumber"
                value={form.customerPhoneNumber}
                onChange={handleFormChange}
                placeholder="Teléfono"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditModal && editCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Editar Cliente</h3>
            <div className="space-y-4">
              <input
                name="customerName"
                value={form.customerName}
                onChange={handleFormChange}
                required
                placeholder="Nombre"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerLastName"
                value={form.customerLastName}
                onChange={handleFormChange}
                required
                placeholder="Apellido"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleFormChange}
                required
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="customerPhoneNumber"
                value={form.customerPhoneNumber}
                onChange={handleFormChange}
                placeholder="Teléfono"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}