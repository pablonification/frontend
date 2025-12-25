'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface SliderItem {
  id: number
  title: string
  description: string
  image: string
  alt: string
  link?: string
}

// Mock data - in real app, this would come from API
const sliderData: SliderItem[] = [
  {
    id: 1,
    title: 'Selamat Datang di Lab Kimia Dasar',
    description: 'Temukan informasi praktikum, modul, dan pengumuman terbaru dari Laboratorium Kimia Dasar',
    image: '/tolongdong-1.jpg',
    alt: 'Laboratorium Kimia Dasar',
    link: '/about'
  },
  {
    id: 2,
    title: 'Praktikum Kimia Dasar',
    description: 'Akses modul praktikum, jadwal, dan pembagian kelompok untuk semester ini',
    image: '/tolongdong-2.jpg',
    alt: 'Praktikum Kimia',
    link: '/praktikum'
  },
  {
    id: 3,
    title: 'Pengumuman Terbaru',
    description: 'Informasi terkini tentang praktikum, jadwal, dan hal penting lainnya',
    image: '/tolongdong-3.jpg',
    alt: 'Pengumuman Lab',
    link: '/pengumuman'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-500/90">
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container-custom">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-neutral-100 animate-slide-up">
                      {slide.description}
                    </p>
                    {slide.link && (
                      <a
                        href={slide.link}
                        className="btn-primary text-lg px-8 py-3 animate-scale-in"
                      >
                        Pelajari Lebih Lanjut
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
