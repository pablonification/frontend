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
import Image from "next/image";

export default function HomePage() {
  const { addNotification } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowImages = [
    '/slideshow-1.jpeg',
    '/slideshow-2.jpg',
    '/slideshow-3.jpg',
    '/slideshow-4.jpg'
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [loading, slideshowImages.length]);

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
    {
      title: "Nilai Praktikum",
      description: "Cek nilai praktikum Anda",
      icon: Award,
      href: "/praktikum",
      color: "bg-violet-500",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Jadwal Praktikum Semester Ganjil 2024/2025",
      excerpt:
        "Jadwal praktikum untuk semester ganjil telah tersedia. Silakan cek jadwal kelompok Anda.",
      publishedAt: "2024-01-15T10:00:00Z",
      category: "academic",
    },
    {
      id: 2,
      title: "Pembaruan Modul Praktikum",
      excerpt:
        "Modul praktikum telah diperbarui dengan materi terbaru. Silakan download versi terbaru.",
      publishedAt: "2024-01-10T14:30:00Z",
      category: "info",
    },
    {
      id: 3,
      title: "Panduan Praktikum Online",
      excerpt:
        "Panduan lengkap untuk mengikuti praktikum online dapat diakses di halaman praktikum.",
      publishedAt: "2024-01-05T09:15:00Z",
      category: "info",
    },
  ];

  const stats = {
    totalStudents: 1200,
    totalModules: 24,
    totalAnnouncements: 15,
    totalDownloads: 3500,
  };

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

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-16 md:pt-18 pb-20 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent"></div>
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                  Platform Praktikum Kimia Dasar TPB
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                  Laboratorium{" "}
                  <span className="gradient-text">Kimia Dasar</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Wadah pembelajaran praktikum untuk menanamkan pemahaman konsep
                  dan keterampilan dasar kimia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/praktikum">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg">
                    Cek Modul Praktikum
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    window.open("https://multisite.itb.ac.id/lab-kimia-dasar/wp-content/uploads/sites/313/2020/12/MODUL-2.mp4", "_blank");
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Demo Praktikum
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-3xl flex items-center justify-center shadow-xl border border-primary-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                {/* Image slideshow */}
                <div className="absolute inset-0">
                  {slideshowImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Slideshow image ${index + 1}`}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    </div>
                  ))}
                </div>
                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Stats Section */}
      <section className="section-padding bg-neutral-50">
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
      </section>

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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
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
      </section>
    </div>
  );
}
