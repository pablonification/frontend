import { Metadata } from 'next'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export const metadata: Metadata = {
  title: 'FAQ - Lab Kimia Dasar',
  description: 'Pertanyaan yang sering diajukan tentang praktikum kimia dasar, jadwal, dan informasi lainnya.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'Praktikum',
      questions: [
        {
          question: 'Kapan praktikum dimulai?',
          answer: 'Praktikum dimulai pada minggu kedua semester. Jadwal lengkap dapat dilihat di halaman praktikum.'
        },
        {
          question: 'Apa yang harus dibawa saat praktikum?',
          answer: 'Saat praktikum, Anda harus membawa modul praktikum yang sudah dicetak, alat tulis, dan mengikuti protokol kesehatan yang berlaku.'
        },
        {
          question: 'Bagaimana cara download modul praktikum?',
          answer: 'Modul praktikum dapat didownload di halaman praktikum. Pastikan Anda download modul terbaru sebelum praktikum dimulai.'
        },
        {
          question: 'Apakah ada absensi untuk praktikum?',
          answer: 'Ya, kehadiran praktikum wajib 100%. Absensi akan dicatat dan mempengaruhi nilai akhir praktikum.'
        }
      ]
    },
    {
      category: 'Jadwal',
      questions: [
        {
          question: 'Bagaimana cara melihat jadwal praktikum?',
          answer: 'Jadwal praktikum dapat dilihat di halaman praktikum. Pastikan Anda mengetahui jadwal kelompok Anda.'
        },
        {
          question: 'Apakah jadwal bisa berubah?',
          answer: 'Jadwal praktikum bisa berubah jika ada hal yang tidak terduga. Perubahan akan diumumkan melalui pengumuman resmi.'
        },
        {
          question: 'Kapan jadwal praktikum diumumkan?',
          answer: 'Jadwal praktikum diumumkan pada awal semester. Pastikan Anda mengecek pengumuman secara berkala.'
        }
      ]
    },
    {
      category: 'Kelompok',
      questions: [
        {
          question: 'Bagaimana cara melihat kelompok praktikum?',
          answer: 'Pembagian kelompok dapat dilihat di halaman praktikum. Setiap mahasiswa akan ditempatkan dalam kelompok yang sudah ditentukan.'
        },
        {
          question: 'Apakah kelompok bisa diubah?',
          answer: 'Pembagian kelompok bersifat final dan tidak dapat diubah setelah diumumkan.'
        },
        {
          question: 'Berapa jumlah mahasiswa per kelompok?',
          answer: 'Setiap kelompok terdiri dari 4-5 mahasiswa untuk memastikan efektivitas pembelajaran.'
        }
      ]
    },
    {
      category: 'Nilai',
      questions: [
        {
          question: 'Bagaimana cara melihat nilai praktikum?',
          answer: 'Nilai praktikum dapat diakses melalui link yang diberikan. Setiap file nilai dilindungi dengan password unik.'
        },
        {
          question: 'Kapan nilai praktikum diumumkan?',
          answer: 'Nilai praktikum diumumkan setelah semua praktikum selesai dan penilaian telah dilakukan.'
        },
        {
          question: 'Bagaimana jika tidak bisa mengakses nilai?',
          answer: 'Jika mengalami kesulitan mengakses nilai, silakan hubungi koordinator praktikum atau asisten laboratorium.'
        }
      ]
    },
    {
      category: 'Umum',
      questions: [
        {
          question: 'Bagaimana cara menghubungi laboratorium?',
          answer: 'Anda dapat menghubungi laboratorium melalui telepon (021) 1234-5678 atau email labkimia@university.ac.id'
        },
        {
          question: 'Apakah ada jam buka laboratorium?',
          answer: 'Laboratorium buka pada hari Senin - Jumat, pukul 08:00 - 16:00 WIB.'
        },
        {
          question: 'Bagaimana cara menjadi asisten laboratorium?',
          answer: 'Pendaftaran asisten laboratorium dibuka setiap semester. Informasi lengkap dapat dilihat di pengumuman.'
        }
      ]
    }
  ]

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
                Bantuan & FAQ
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                FAQ
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Pertanyaan yang sering diajukan tentang praktikum kimia dasar,
                jadwal, dan informasi lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-16">
                {faqs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 flex items-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mr-4">
                        <HelpCircle className="w-6 h-6 text-primary-600" />
                      </div>
                      {category.category}
                    </h2>
                    
                    <div className="space-y-6">
                      {category.questions.map((faq, faqIndex) => (
                        <Card
                          key={faqIndex}
                          className="p-8 group cursor-pointer border-neutral-100 hover:shadow-lg transition-all duration-300"
                        >
                          <details className="group">
                            <summary className="flex items-center justify-between cursor-pointer list-none">
                              <h3 className="text-xl font-semibold text-neutral-900 group-open:text-primary-600 transition-colors duration-300">
                                {faq.question}
                              </h3>
                              <ChevronDown className="w-6 h-6 text-neutral-500 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="mt-6 pt-6 border-t border-neutral-200">
                              <p className="text-neutral-600 leading-relaxed text-lg">
                                {faq.answer}
                              </p>
                            </div>
                          </details>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Contact CTA */}
              <div className="mt-20 text-center">
                <Card className="p-10 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                  <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    Tidak Menemukan Jawaban?
                  </h3>
                  <p className="text-neutral-600 mb-8 leading-relaxed max-w-md mx-auto">
                    Jika Anda tidak menemukan jawaban yang Anda cari,
                    silakan hubungi kami untuk mendapatkan bantuan.
                  </p>
                  <a href="/kontak">
                    <Button size="lg" className="shadow-lg hover:shadow-xl">
                      Hubungi Kami
                    </Button>
                  </a>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
