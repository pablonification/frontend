"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  Award,
  ChevronRight,
  Play,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useApp } from "../contexts/AppContext";
import { api } from "../lib/api";
import Image from "next/image";

export default function HomePage() {
  const { addNotification } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sliders, setSliders] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  
  // Fallback slider data in case API fails
  const fallbackSliders = [
    { id: 1, image_path: '/slideshow-1.jpeg', title: 'Laboratorium Kimia Dasar' },
    { id: 2, image_path: '/slideshow-2.jpg', title: 'Praktikum Kimia' },
    { id: 3, image_path: '/slideshow-3.jpg', title: 'Eksperimen Kimia' },
    { id: 4, image_path: '/slideshow-4.jpg', title: 'Lab Modern' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch sliders for slideshow
        try {
          const slidersResponse = await api.get('/api/sliders');
          const slidersData = (slidersResponse.data as any) || [];
          // Only use sliders if we have valid data with image_path
          if (Array.isArray(slidersData) && slidersData.length > 0 && slidersData[0].image_path) {
            setSliders(slidersData);
          } else {
            console.warn('Invalid slider data from API, using fallback');
            setSliders(fallbackSliders);
          }
        } catch (sliderErr) {
          console.warn('Failed to fetch sliders, using fallback:', sliderErr);
          setSliders(fallbackSliders);
        }
        
        // Fetch announcements
        try {
          const announcementsResponse = await api.get('/api/announcements');
          setAnnouncements((announcementsResponse.data as any) || []);
        } catch (announcementErr) {
          console.warn('Failed to fetch announcements:', announcementErr);
          setAnnouncements([]);
        }
        
        // Fetch stats (this would need a dedicated stats endpoint)
        // For now, we'll use mock stats
        setStats({
          totalStudents: 1200,
          totalModules: 24,
          totalAnnouncements: 15,
          totalDownloads: 3500,
        });
        
      } catch (err) {
        console.error('Error fetching data:', err);
        // Don't set error for slider issues, just use fallback
        if (!sliders.length) {
          setSliders(fallbackSliders);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [addNotification]);
  
  useEffect(() => {
    if (loading) return;
    
    // Use either the loaded sliders or fallback sliders
    const activeSliders = sliders.length > 0 ? sliders : fallbackSliders;
    
    const interval = setInterval(() => {
      setPreviousSlide(currentSlide);
      setIsTransitioning(true);
      
      // Start fade transition
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSliders.length);
      }, 100);
      
      // End transition after fade completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [loading, sliders.length, currentSlide]);
  
  const quickAccessItems = [
    {
      title: "Modul Praktikum",
      description: "Download modul praktikum terbaru",
      icon: BookOpen,
      href: "/praktikum",
      color: "bg-primary-500",
    },
    {
      title: "Jadwal Praktikum",
      description: "Lihat jadwal praktikum Anda",
      icon: Calendar,
      href: "/praktikum",
      color: "bg-emerald-500",
    },
    {
      title: "Pengumuman",
      description: "Informasi terbaru dari lab",
      icon: FileText,
      href: "/pengumuman",
      color: "bg-amber-500",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "badge-primary";
      case "urgent":
        return "badge-error";
      case "info":
        return "badge-secondary";
      default:
        return "badge-primary";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "academic":
        return "Akademik";
      case "urgent":
        return "Penting";
      case "info":
        return "Informasi";
      default:
        return "Informasi";
    }
  };

  if (loading) {
    return <LoadingSpinner.Page message="Memuat halaman utama..." />;
  }
  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="container-custom py-6">
          <ErrorAlert message={error} onDismiss={() => setError(null)} />
        </div>
      )}


      {/* Hero Section - Enhanced with Custom Design */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 relative overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/5 via-transparent to-cyan-400/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-100/30 via-transparent to-transparent"></div>
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            {/* Badge without additional effects */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 rounded-full text-sm font-medium backdrop-blur-sm border border-teal-200/50">
              Platform Praktikum Terpusat untuk Mahasiswa TPB
            </div>
            
            {/* Enhanced heading with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-teal-800 to-cyan-900 bg-clip-text text-transparent">
                Laboratorium Kimia Dasar
              </span>{" "}
              <span className="italic font-normal text-primary-900">
                mengembangkan
              </span>{" "}
              <span className="bg-gradient-to-r from-slate-900 via-teal-800 to-cyan-900 bg-clip-text text-transparent">
                pemahaman konsep
              </span>
            </h1>
            
            {/* Enhanced description */}
            <p className="text-lg md:text-xl text-teal-700 leading-relaxed max-w-2xl mx-auto">
              Wadah pembelajaran praktikum yang dirancang secara menarik untuk membantu Anda
              memahami dan menguasai konsep kimia dasar melalui pengalaman praktis yang mendalam.
            </p>

            {/* Enhanced buttons with better styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/praktikum">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white rounded-full px-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-teal-600">
                  Lihat Modul
                </Button>
              </Link>
              <Link href="/kontak">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-full px-8 bg-white/60 backdrop-blur-sm hover:bg-white/80 text-teal-700 hover:text-teal-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/50">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Left Image with enhanced styling */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl overflow-hidden shadow-2xl md:transform md:-rotate-3 md:hover:rotate-0 transition-all duration-500 hover:shadow-3xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={'/pajang-1.jpg'}
                alt="Praktikum 1"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-teal-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium">Eksperimen Kimia Dasar</p>
              </div>
            </div>

            {/* Center Image - Enhanced with better effects */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-3xl md:transform md:scale-110 md:z-10 md:hover:scale-115 transition-all duration-500 group" style={{ backgroundColor: '#ccfbf1' }}>
              {/* Solid background to prevent bleed-through - always visible and solid */}
              <div className="absolute inset-0 rounded-3xl" style={{ 
                background: 'linear-gradient(to bottom right, rgb(204 251 241), rgb(165 243 252))', 
                opacity: 1, 
                zIndex: 0 
              }}></div>
              
              {/* Image container with fade transition - only images fade */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ zIndex: 1 }}>
                {(sliders.length > 0 ? sliders : fallbackSliders).map((slider, index) => {
                  const imageSrc = slider.image_path || fallbackSliders[index]?.image_path || '/slideshow-1.jpeg';
                  const isActive = index === currentSlide;
                  const wasPrevious = index === previousSlide;
                  
                  return (
                    <div
                      key={`slide-wrapper-${index}`}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        opacity: isActive ? 1 : (wasPrevious && isTransitioning ? 0 : 0),
                        transition: 'opacity 500ms ease-in-out',
                        zIndex: isActive ? 10 : (wasPrevious && isTransitioning ? 5 : 0),
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={slider.title || 'Praktikum featured'}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
              
              {/* Gradient overlay - always visible, maintains card appearance */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent rounded-3xl pointer-events-none" style={{ opacity: 1, zIndex: 20 }}></div>
              
              {/* Enhanced slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2" style={{ zIndex: 30 }}>
                {(sliders.length > 0 ? sliders : fallbackSliders).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPreviousSlide(currentSlide);
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentSlide(index);
                      }, 100);
                      setTimeout(() => {
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-8 shadow-lg'
                        : 'bg-white/50 hover:bg-white/75 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Image with enhanced styling */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-cyan-100 to-teal-200 rounded-3xl overflow-hidden shadow-2xl md:transform md:rotate-3 md:hover:rotate-0 transition-all duration-500 hover:shadow-3xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={'/pajang-2.png'}
                alt="Praktikum 3"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cyan-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium">Laboratorium Modern</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Dalam Angka
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Prestasi dan pencapaian Laboratorium Kimia Dasar
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="p-8 text-center border-neutral-100 h-full flex flex-col justify-center">
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary-600" />
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {stats.totalStudents?.toLocaleString() || "1,200"}
              </div>
              <p className="text-neutral-600 font-medium">Mahasiswa Aktif</p>
            </Card>

            <Card className="p-8 text-center border-neutral-100 h-full flex flex-col justify-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {stats.totalModules || "24"}
              </div>
              <p className="text-neutral-600 font-medium">Modul Praktikum</p>
            </Card>

            <Card className="p-8 text-center border-neutral-100 h-full flex flex-col justify-center">
              <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-amber-600" />
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {stats.totalAnnouncements || "15"}
              </div>
              <p className="text-neutral-600 font-medium">Pengumuman</p>
            </Card>

            <Card className="p-8 text-center border-neutral-100 h-full flex flex-col justify-center">
              <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-violet-600" />
              </div>
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                {stats.totalDownloads?.toLocaleString() || "3,500"}
              </div>
              <p className="text-neutral-600 font-medium">Total Download</p>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Latest Announcements */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Pengumuman Terbaru
              </h2>
              <p className="text-xl text-neutral-600">
                Informasi terkini dari Laboratorium Kimia Dasar
              </p>
            </div>
            <Link href="/pengumuman">
              <Button variant="secondary" size="lg" className="shadow-md">
                Lihat Semua
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="p-8 group cursor-pointer border-neutral-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`badge ${getCategoryColor(announcement.category)}`}
                  >
                    {getCategoryText(announcement.category)}
                  </span>
                  <span className="text-sm text-neutral-500 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(announcement.publishedAt).toLocaleDateString(
                      "id-ID"
                    )}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {announcement.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                  {announcement.excerpt}
                </p>

                <Link
                  href={`/pengumuman/${announcement.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group"
                >
                  Baca selengkapnya
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

            {/* Quick Access Section */}
            <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Akses Cepat
            </h2>
            <p className="text-xl text-neutral-600 max-w-5xl mx-auto">
              Semua yang Anda butuhkan untuk praktikum kimia dasar tersedia dalam satu
              platform yang terintegrasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickAccessItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="p-8 text-center group cursor-pointer border-neutral-100 h-full flex flex-col">
                  <div
                    className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
        <div className="container-custom text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap Memulai Praktikum?
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
              Bergabunglah dengan ribuan mahasiswa yang telah merasakan
              pengalaman praktikum terbaik di Laboratorium Kimia Dasar ITB.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/praktikum">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto shadow-xl"
                >
                  Mulai Sekarang
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/kontak">
                <Button
                  size="lg"
                  variant="ghost"
                  className="inline-flex items-center px-8 py-4 bg-primary-500/20 backdrop-blur-sm text-white hover:bg-primary-500/30 hover:text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20"
                >
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
