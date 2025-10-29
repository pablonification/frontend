import Link from "next/link";
import { Beaker, FlaskConical, TestTube, ArrowRight } from "lucide-react";
import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Virtual Lab - Lab Kimia Dasar',
  description: 'Simulasi Praktikum Interaktif - Lakukan eksperimen kimia secara virtual dengan visualisasi realistis.',
}

const practicums = [
  {
    id: "acid-base",
    title: "Titrasi Asam-Basa",
    description: "Pelajari reaksi netralisasi dan pengukuran pH",
    difficulty: "Medium",
    icon: FlaskConical,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "salt-solution",
    title: "Pembuatan Larutan Garam",
    description: "Praktikum pembuatan dan analisis larutan garam",
    difficulty: "Easy",
    icon: TestTube,
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: "ph-indicator",
    title: "Indikator pH Alami",
    description: "Eksplorasi indikator pH dari bahan alami",
    difficulty: "Easy",
    icon: Beaker,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "precipitation",
    title: "Reaksi Presipitasi",
    description: "Amati pembentukan endapan ketika ion bertemu",
    difficulty: "Easy",
    icon: TestTube,
    gradient: "from-green-400 to-teal-500"
  },
  {
    id: "redox",
    title: "Reaksi Oksidasi-Reduksi",
    description: "Eksplorasi transfer elektron antara zat dan pengamatan perubahan warna",
    difficulty: "Medium",
    icon: FlaskConical,
    gradient: "from-orange-500 to-rose-500"
  },
  {
    id: "calorimetry",
    title: "Kalorimetri dan Perubahan Energi",
    description: "Ukur perubahan suhu untuk menghitung kalor reaksi",
    difficulty: "Medium",
    icon: Beaker,
    gradient: "from-red-400 to-pink-400"
  },
  {
    id: "gas-laws",
    title: "Hukum Gas",
    description: "Simulasi hubungan tekanan, volume, dan suhu gas",
    difficulty: "Easy",
    icon: TestTube,
    gradient: "from-sky-400 to-indigo-400"
  },
  {
    id: "electrochemistry",
    title: "Elektrokimia",
    description: "Rangkaian sederhana sel volta dan pengukuran tegangan",
    difficulty: "Hard",
    icon: FlaskConical,
    gradient: "from-cyan-600 to-blue-500"
  },
  {
    id: "organic-extraction",
    title: "Ekstraksi Organik",
    description: "Pisahkan campuran menggunakan kelarutan dan densitas",
    difficulty: "Medium",
    icon: Beaker,
    gradient: "from-fuchsia-500 to-purple-500"
  },
  {
    id: "kinetics",
    title: "Kinetika Reaksi",
    description: "Pelajari pengaruh konsentrasi dan suhu terhadap laju reaksi",
    difficulty: "Hard",
    icon: TestTube,
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: "chromatography",
    title: "Kromatografi",
    description: "Pisahkan komponen campuran berdasarkan afinitas fase diam dan fase gerak",
    difficulty: "Medium",
    icon: TestTube,
    gradient: "from-lime-400 to-emerald-500"
  },
  {
    id: "spectroscopy",
    title: "Spektroskopi",
    description: "Analisis spektrum untuk mengidentifikasi gugus fungsi dan struktur molekul",
    difficulty: "Hard",
    icon: FlaskConical,
    gradient: "from-indigo-600 to-violet-500"
  }
];

export default function VirtualLabPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent"></div>
          <div className="container-custom section-padding relative">
            <div className="text-center max-w-5xl mx-auto space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Simulasi Praktikum Interaktif
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Virtual Lab{' '}
                <span className="gradient-text">Kimia</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto text-balance">
                Lakukan eksperimen kimia secara virtual dengan visualisasi realistis.
                Aman, interaktif, dan menyenangkan!
              </p>
            </div>
          </div>
        </section>

        {/* Practicum Cards */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Pilih Praktikum</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Pilih dari berbagai simulasi praktikum kimia yang tersedia
              </p>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practicums.map((practicum) => {
            const Icon = practicum.icon;
            return (
              <Link key={practicum.id} href={`/virtual-lab/${practicum.id}`} className="group">
                <Card className="overflow-hidden border-neutral-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${practicum.gradient} p-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <Icon className="w-16 h-16 text-white mb-4 relative z-10 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white relative z-10">{practicum.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <p className="text-neutral-600 mb-6 leading-relaxed min-h-[60px]">{practicum.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        practicum.difficulty === "Easy"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {practicum.difficulty}
                      </span>

                      <Button
                        variant="secondary"
                        size="md"
                        className="group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors shadow-md hover:shadow-lg"
                      >
                        Mulai
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
            })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
