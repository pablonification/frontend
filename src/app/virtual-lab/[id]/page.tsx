import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import Runner from "../../../components/VirtualLab/Runner";

type Practicum = {
  id: string;
  title: string;
  description: string;
};

const practicums: Record<string, Practicum> = {
  "acid-base": { id: "acid-base", title: "Titrasi Asam-Basa", description: "Praktikum reaksi netralisasi dan pengukuran pH larutan" },
  "salt-solution": { id: "salt-solution", title: "Pembuatan Larutan Garam", description: "Praktikum pembuatan dan analisis larutan garam" },
  "ph-indicator": { id: "ph-indicator", title: "Indikator pH Alami", description: "Praktikum eksplorasi indikator pH dari bahan alami" },
  "precipitation": { id: "precipitation", title: "Reaksi Presipitasi", description: "Amati pembentukan endapan ketika ion bertemu" },
  "redox": { id: "redox", title: "Reaksi Oksidasi-Reduksi", description: "Eksplorasi transfer elektron antara zat dan pengamatan perubahan warna" },
  "calorimetry": { id: "calorimetry", title: "Kalorimetri dan Perubahan Energi", description: "Ukur perubahan suhu untuk menghitung kalor reaksi" },
  "gas-laws": { id: "gas-laws", title: "Hukum Gas", description: "Simulasi hubungan tekanan, volume, dan suhu gas" },
  "electrochemistry": { id: "electrochemistry", title: "Elektrokimia", description: "Rangkaian sederhana sel volta dan pengukuran tegangan" },
  "organic-extraction": { id: "organic-extraction", title: "Ekstraksi Organik", description: "Pisahkan campuran menggunakan kelarutan dan densitas" },
  "kinetics": { id: "kinetics", title: "Kinetika Reaksi", description: "Pelajari pengaruh konsentrasi dan suhu terhadap laju reaksi" },
  "chromatography": { id: "chromatography", title: "Kromatografi", description: "Pisahkan komponen campuran berdasarkan afinitas fase diam dan fase gerak" },
  "spectroscopy": { id: "spectroscopy", title: "Spektroskopi", description: "Analisis spektrum untuk mengidentifikasi gugus fungsi dan struktur molekul" }
};

export default function PracticumPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const practicum = practicums[id as keyof typeof practicums];

  if (!practicum) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Praktikum tidak ditemukan</h1>
          <Link href="/virtual-lab" className="text-indigo-600 hover:underline">
            Kembali ke katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/virtual-lab" className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors">
              <Home className="w-4 h-4" />
              <span>Katalog</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 font-medium">{practicum.title}</span>
          </div>
        </div>
      </div>

      {/* Runner Component */}
      <Runner practicum={practicum} />
    </div>
  );
}
