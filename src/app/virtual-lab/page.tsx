import Link from "next/link";
import { Beaker, FlaskConical, TestTube, ArrowRight } from "lucide-react";
import React from "react";

function Button({
    children,
    className = "",
    variant,
    size,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode; className?: string; variant?: string; size?: string }) {
    const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    return (
        <button {...props} className={`${base} ${className}`}>
            {children}
        </button>
    );
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

export default function PracticumCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Beaker className="w-16 h-16 animate-pulse" />
            <div>
              <h1 className="text-5xl font-bold mb-2">Virtual Lab Kimia</h1>
              <p className="text-xl text-indigo-100">Simulasi Praktikum Interaktif</p>
            </div>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Lakukan eksperimen kimia secara virtual dengan visualisasi realistis. 
            Aman, interaktif, dan menyenangkan! 🧪✨
          </p>
        </div>
      </div>

      {/* Practicum Cards */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Pilih Praktikum</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practicums.map((practicum) => {
            const Icon = practicum.icon;
            return (
              <Link key={practicum.id} href={`/virtual-lab/${practicum.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${practicum.gradient} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <Icon className="w-12 h-12 text-white mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white relative z-10">{practicum.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 min-h-[48px]">{practicum.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        practicum.difficulty === "Easy" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {practicum.difficulty}
                      </span>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
                      >
                        Mulai
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
