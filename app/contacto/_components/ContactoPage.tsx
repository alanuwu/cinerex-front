'use client'

import { useState, useEffect } from 'react'
import { API_URL } from '@/constants'
import { Movie } from '@/entities'

import { UserIcon, EnvelopeIcon, FilmIcon, ChatBubbleBottomCenterTextIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'


export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    movie: '',
  })

  const [movies, setMovies] = useState<Movie[]>([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API_URL}/movie`, {
          method: 'GET',
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Error cargando las películas')
        const data = await res.json()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
    fetchMovies()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Enviando formulario:', formData)
    setStatus('Gracias por contactarnos. Te responderemos pronto.')
    setFormData({ name: '', email: '', message: '', movie: '' })
  }

  return (
    <div className="max-w-xl mx-auto mt-8 px-4 font-sans text-center">
      <h1 className="text-3xl font-semibold mb-2">Contacto - CineRex</h1>
      <p className="mb-6">¿Tienes alguna pregunta o comentario? Escríbenos aquí:</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nombre */}
        <label className="flex flex-col">
          <span className="mb-1 font-medium flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-gray-600" />
            Nombre:
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="p-2 text-base w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col">
          <span className="mb-1 font-medium flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            Email:
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="p-2 text-base w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        {/* Película */}
        <label className="flex flex-col">
          <span className="mb-1 font-medium flex items-center gap-2">
            <FilmIcon className="w-5 h-5 text-gray-600" />
            ¿Sobre qué película quieres preguntar?
          </span>
          <select
            name="movie"
            value={formData.movie}
            onChange={handleChange}
            required
            className="p-2 text-base w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">-- Selecciona una película --</option>
            {movies.map((movie) => (
              <option key={movie.movieId} value={movie.movieTitle}>
                {movie.movieTitle}
              </option>
            ))}
          </select>
        </label>

        {/* Mensaje */}
        <label className="flex flex-col">
          <span className="mb-1 font-medium flex items-center gap-2">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-600" />
            Mensaje:
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Escribe tu mensaje aquí"
            rows={5}
            className="p-2 text-base w-full border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        {/* Botón */}
        <button
          type="submit"
          className="py-3 text-lg bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
        >
          Enviar
        </button>
      </form>

      {status && <p className="mt-4 text-green-600">{status}</p>}

      <hr className="my-8" />

      {/* Información de contacto */}
      <div className='text-center items-center'>
      <h2 className="text-2xl font-semibold mb-2">Información de contacto</h2>
      <p className="flex items-center gap-2">
        <PhoneIcon className="w-5 h-5 text-gray-600" />
         Teléfono: +52 419 120 2458
      </p>
      <p className="flex items-center gap-2">
        <EnvelopeIcon className="w-5 h-5 text-gray-600" />
        Email: contacto@cinerex.com
      </p>
      <p className="flex items-center gap-2">
        <MapPinIcon className="w-5 h-5 text-gray-600" />
        Dirección: Rincones Del Marquez, Rinconada Pinesque, ext. 6, int. 11.
      </p>
      </div>
    </div>
  )
}
