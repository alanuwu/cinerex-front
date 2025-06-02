"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Customer } from "@/entities";



export default function SignUpForm() {
  const [customer, setCustomer] = useState<Omit<Customer, "customerId" | "tickets" | "user">>({
    customerName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhoneNumber: "",
  });
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(customer.customerEmail)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (userPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (userPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (
      !customer.customerName ||
      !customer.customerLastName ||
      !customer.customerPhoneNumber
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      // Registrar usuario en /auth
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: customer.customerEmail, userPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409) {
          setError("Este correo ya está en uso, por favor escribe otro.");
          setLoading(false);
          return;
        }

        throw new Error(
          errorData.message || "Error al registrar. Intenta con otro correo."
        );
      }

      // Registrar usuario como cliente en /customers
      await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customer.customerName,
          customerLastName: customer.customerLastName,
          customerEmail: customer.customerEmail,
          customerPhoneNumber: customer.customerPhoneNumber,
        }),
      });

      alert("Registro exitoso. Redirigiendo al login");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Crear una cuenta
        </h2>

        {/* Nombre */}
        <label htmlFor="customerName" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <div className="relative mb-2">
          <UserIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 text-base"
            required
          />
        </div>

        {/* Apellido */}
        <label htmlFor="customerLastName" className="block text-sm font-medium mb-1">
          Apellido
        </label>
        <div className="relative mb-2">
          <UserIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type="text"
            id="customerLastName"
            name="customerLastName"
            value={customer.customerLastName}
            onChange={handleChange}
            className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 text-base"
            required
          />
        </div>

        {/* Teléfono */}
        <label htmlFor="customerPhoneNumber" className="block text-sm font-medium mb-1">
          Teléfono
        </label>
        <div className="relative mb-2">
          <PhoneIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type="tel"
            id="customerPhoneNumber"
            name="customerPhoneNumber"
            value={customer.customerPhoneNumber}
            onChange={handleChange}
            className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 text-base"
            required
          />
        </div>

        {/* Email */}
        <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
          Correo Electrónico
        </label>
        <div className="relative mb-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={customer.customerEmail}
            onChange={handleChange}
            className={`pl-10 pr-3 py-2 w-full rounded-md border ${
              error.toLowerCase().includes("correo")
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring ${
              error.toLowerCase().includes("correo")
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            } text-base`}
            required
          />
        </div>

        {/* Password */}
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña
        </label>
        <div className="relative mb-2">
          <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className={`pl-10 pr-10 py-2 w-full rounded-md border ${
              error.toLowerCase().includes("contraseña")
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring ${
              error.toLowerCase().includes("contraseña")
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            } text-base`}
            required
          />
        </div>

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Repetir Contraseña
        </label>
        <div className="relative mb-2">
          <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-3" />
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 pr-10 py-2 w-full rounded-md border ${
              error.toLowerCase().includes("contraseña")
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring ${
              error.toLowerCase().includes("contraseña")
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            } text-base`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 text-base rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
