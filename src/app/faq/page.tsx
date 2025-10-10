import { Metadata } from 'next'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { ChevronDown, HelpCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-neutral-50">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                FAQ
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Pertanyaan yang sering diajukan tentang praktikum kimia dasar, 
                jadwal, dan informasi lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {faqs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                      <HelpCircle className="w-6 h-6 mr-3 text-primary-600" />
                      {category.category}
                    </h2>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div
                          key={faqIndex}
                          className="card p-6 hover:shadow-md transition-shadow duration-200"
                        >
                          <details className="group">
                            <summary className="flex items-center justify-between cursor-pointer list-none">
                              <h3 className="text-lg font-semibold text-neutral-900 group-open:text-primary-600 transition-colors duration-200">
                                {faq.question}
                              </h3>
                              <ChevronDown className="w-5 h-5 text-neutral-500 group-open:rotate-180 transition-transform duration-200" />
                            </summary>
                            <div className="mt-4 pt-4 border-t border-neutral-200">
                              <p className="text-neutral-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Contact CTA */}
              <div className="mt-16 text-center">
                <div className="card p-8 bg-primary-50">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Tidak Menemukan Jawaban?
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Jika Anda tidak menemukan jawaban yang Anda cari, 
                    silakan hubungi kami untuk mendapatkan bantuan.
                  </p>
                  <a
                    href="/kontak"
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
