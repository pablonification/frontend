import { Metadata } from 'next'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Users, Target, Award, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Lab - Lab Kimia Dasar',
  description: 'Pelajari lebih lanjut tentang Laboratorium Kimia Dasar, visi misi, dan fasilitas yang tersedia.',
}

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: 'Tim Berpengalaman',
      description: 'Dosen dan asisten laboratorium yang berpengalaman dalam bidang kimia dasar'
    },
    {
      icon: Target,
      title: 'Pembelajaran Terstruktur',
      description: 'Kurikulum yang terstruktur dan sesuai dengan standar pendidikan tinggi'
    },
    {
      icon: Award,
      title: 'Fasilitas Lengkap',
      description: 'Laboratorium dilengkapi dengan peralatan modern dan bahan praktikum yang memadai'
    },
    {
      icon: BookOpen,
      title: 'Modul Praktikum',
      description: 'Modul praktikum yang komprehensif dan mudah dipahami oleh mahasiswa'
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
                Tentang Lab Kimia Dasar
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Laboratorium Kimia Dasar merupakan unit pendukung pembelajaran yang menyediakan 
                fasilitas dan layanan terbaik untuk mendukung proses pembelajaran kimia dasar 
                di tingkat perguruan tinggi.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Visi</h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Menjadi laboratorium kimia dasar yang unggul dalam mendukung pembelajaran 
                  dan penelitian kimia dasar dengan standar internasional.
                </p>
                
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Misi</h2>
                <ul className="space-y-4 text-lg text-neutral-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Menyediakan fasilitas laboratorium yang memadai dan modern
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mendukung proses pembelajaran kimia dasar yang berkualitas
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mengembangkan kemampuan praktis mahasiswa dalam bidang kimia
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Menjaga standar keamanan dan keselamatan di laboratorium
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Fasilitas Laboratorium</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-700">Meja kerja praktikum yang ergonomis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-700">Peralatan laboratorium modern</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-700">Sistem ventilasi dan keamanan</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-700">Penyimpanan bahan kimia yang aman</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-700">Sistem pencatatan digital</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Keunggulan Laboratorium
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Laboratorium Kimia Dasar dilengkapi dengan berbagai keunggulan 
                untuk mendukung pembelajaran yang optimal.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Butuh Informasi Lebih Lanjut?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang laboratorium dan layanan yang tersedia.
            </p>
            <a
              href="/kontak"
              className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-3"
            >
              Hubungi Kami
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
