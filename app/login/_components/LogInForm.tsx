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
import Link from "next/link";

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
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

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userEmail, userPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Correo o contraseña incorrectos."
        );
      }

      // Manejo de respuesta (token o JSON)
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setUserEmail("");
      setUserPassword("");
      setError("");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0f2fe] to-[#bae6fd] px-0">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-7 border border-[#bae6fd]">
        {/* Logo y título */}
        <div className="flex flex-col items-center mb-2">
          <span className="text-4xl font-extrabold text-[#38bdf8] drop-shadow mb-1 tracking-tight">
            CineRex
          </span>
          <span className="text-base text-[#0ea5e9] font-semibold mb-2 tracking-wide">
            ¡Bienvenido! Inicia sesión para disfrutar del cine
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-[#334155]"
          >
            Correo Electrónico
          </label>
          <div className="relative mb-2">
            <EnvelopeIcon className="w-5 h-5 text-[#38bdf8] absolute top-2.5 left-3" />
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
                error.toLowerCase().includes("correo")
                  ? "border-red-400"
                  : "border-[#bae6fd]"
              } focus:outline-none focus:ring-2 ${
                error.toLowerCase().includes("correo")
                  ? "focus:ring-red-400"
                  : "focus:ring-[#38bdf8]"
              } text-base bg-[#e0f2fe]`}
              required
            />
          </div>
          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-[#334155]"
          >
            Contraseña
          </label>
          <div className="relative mb-2">
            <LockClosedIcon className="w-5 h-5 text-[#38bdf8] absolute top-2.5 left-3" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className={`pl-10 pr-10 py-2 w-full rounded-lg border ${
                error.toLowerCase().includes("contraseña")
                  ? "border-red-400"
                  : "border-[#bae6fd]"
              } focus:outline-none focus:ring-2 ${
                error.toLowerCase().includes("contraseña")
                  ? "focus:ring-red-400"
                  : "focus:ring-[#38bdf8]"
              } text-base bg-[#e0f2fe]`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-[#38bdf8]"
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
            <p className="text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white py-2 text-base rounded-lg font-bold hover:from-[#0ea5e9] hover:to-[#38bdf8] transition-colors shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>
        {/* Apartado para registrarse */}
        <div className="text-center mt-4">
          <span className="text-[#334155] text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              href="/signin"
              className="text-[#0ea5e9] font-semibold hover:underline"
            >
              Regístrate aquí
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
