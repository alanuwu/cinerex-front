
'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { API_URL } from '@/constants'

type Movie = {
  movieId: number
  title: string
  movieImageUrl: string
}

const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const visibleCount = 5

  const maxIndex = movies.length - visibleCount >= 0 ? movies.length - visibleCount : 0

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API_URL}/movie/`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
    fetchMovies()
  }, [])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      nextSlide()
    }, 5000)

    return () => clearTimeout(timeoutRef.current)
  }, [currentIndex, movies])

  if (movies.length === 0) {
    return <div className="text-center py-20">Cargando películas...</div>
  }

  return (
    <div className="relative w-full max-w-[1300px] mx-auto select-none">
      <h2 className="text-2xl font-bold mb-4 text-center">Nuevos estrenos</h2>
      <div className="relative overflow-hidden rounded-lg shadow-md bg-black/5 px-2">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${movies.length * (100 / visibleCount)}%`,
            transform: `translateX(-${(currentIndex * 100) / movies.length}%)`,
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.movieId}
              className="flex-shrink-0 px-1"
              style={{ width: `${100 / movies.length}%` }}
            >
              <img
                src={movie.movieImageUrl}
                alt={movie.title}
                className="w-full h-[358px] object-cover rounded-lg select-none"
                draggable={false}
              />
              <div className="text-center font-semibold text-sm mt-1 text-gray-800">
                {movie.title}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            prevSlide()
          }}
          aria-label="Anterior"
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 flex items-center justify-center p-2 rounded-r-lg shadow-lg"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>

        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            nextSlide()
          }}
          aria-label="Siguiente"
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 flex items-center justify-center p-2 rounded-l-lg shadow-lg"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}

export default MovieCarousel
