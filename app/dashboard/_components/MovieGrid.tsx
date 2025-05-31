
'use client'

import { useEffect, useState } from 'react'
import { API_URL } from '@/constants'

type Movie = {
  id: number
  title: string
  movieImageUrl: string
}

const MovieGrid = () => {
  const [movies, setMovies] = useState<Movie[]>([])

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={movie.movieImageUrl}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-2 text-center font-semibold">{movie.title}</div>
        </div>
      ))}
    </div>
  )
}

export default MovieGrid
