
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { API_URL } from "@/constants";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { label } from "framer-motion/client";

export default function SignUpForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(userEmail)) {
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

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword }),
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

      const data = await response.json();
      console.log("Registro exitoso:", data);
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
        className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-10 space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Crear una cuenta
        </h2>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <EnvelopeIcon className="w-6 h-6 text-gray-400 absolute top-3 left-3" />
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className={`pl-12 pr-4 py-3 w-full rounded-lg border ${
                error.toLowerCase().includes("correo")
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring ${
                error.toLowerCase().includes("correo")
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } text-lg`}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-lg font-medium mb-1">
            Contraseña
          </label>
          <div className="relative">
            <LockClosedIcon className="w-6 h-6 text-gray-400 absolute top-3 left-3" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className={`pl-12 pr-12 py-3 w-full rounded-lg border ${
                error.toLowerCase().includes("contraseña")
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring ${
                error.toLowerCase().includes("contraseña")
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } text-lg`}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium mb-1"
          >
            Repetir Contraseña
          </label>
          <div className="relative">
            <LockClosedIcon className="w-6 h-6 text-gray-400 absolute top-3 left-3" />
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-12 pr-12 py-3 w-full rounded-lg border ${
                error.toLowerCase().includes("contraseña")
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring ${
                error.toLowerCase().includes("contraseña")
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } text-lg`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
