
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Nuevos estrenos</h2>
      <div
        className="grid p-0 justify-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(239px, 1fr))',
          gap: '0px',
        }}
      >
        {movies.map((movie) => (
          <Link
            key={movie.movieId}
            href={`/dashboard/movie/${movie.movieId}`}
            className="overflow-hidden"
            style={{ width: '239px' }}
          >
            <img
              src={movie.movieImageUrl}
              alt={movie.title}
              className="w-[239px] h-[358px] object-cover block"
            />
            <div className="text-center font-semibold text-sm mt-1">{movie.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
