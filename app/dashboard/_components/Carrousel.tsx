
'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const Carousel = () => {
  const images = [
    'https://statics.cinemex.com/uploads/cms/promosa/3333-promo-v2.jpg',
    'https://statics.cinemex.com/uploads/cms/promosa/3338-promo-v2.jpg',
    'https://statics.cinemex.com/uploads/cms/promosa/3351-promo-v2.jpg',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)

  const delay = 3000

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      nextSlide()
    }, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [currentIndex])

  return (
    <div className="relative w-3/5 mx-auto select-none">
      <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-md bg-black px-0">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out"
        />

        {/* Botón izquierdo */}
        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            prevSlide()
          }}
          aria-label="Anterior"
          className="absolute inset-y-0 left-0 w-16 bg-black bg-opacity-10 hover:bg-opacity-20 text-white flex items-center justify-center text-4xl font-bold transition backdrop-blur-sm rounded-l-lg shadow-lg"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>

        {/* Botón derecho */}
        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            nextSlide()
          }}
          aria-label="Siguiente"
          className="absolute inset-y-0 right-0 w-16 bg-black bg-opacity-10 hover:bg-opacity-20 text-white flex items-center justify-center text-4xl font-bold transition backdrop-blur-sm rounded-r-lg shadow-lg"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
