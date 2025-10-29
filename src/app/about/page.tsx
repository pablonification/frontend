import { Metadata } from 'next'
import { Users, Target, Award, BookOpen } from 'lucide-react'
import Card from '../../components/ui/Card'

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
    <div className="min-h-screen bg-white">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent"></div>
          <div className="container-custom section-padding relative">
            <div className="text-center max-w-5xl mx-auto space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Tentang Kami
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Tentang Lab{' '}
                <span className="gradient-text">Kimia Dasar</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Laboratorium Kimia Dasar merupakan unit pendukung pembelajaran yang menyediakan
                fasilitas dan layanan terbaik untuk mendukung proses pembelajaran kimia dasar
                di tingkat perguruan tinggi dengan standar internasional.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">Visi</h2>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Menjadi laboratorium kimia dasar yang unggul dalam mendukung pembelajaran
                    dan penelitian kimia dasar dengan standar internasional.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">Misi</h2>
                  <ul className="space-y-6 text-lg text-neutral-600">
                    <li className="flex items-start group">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="leading-relaxed">Menyediakan fasilitas laboratorium yang memadai dan modern</span>
                    </li>
                    <li className="flex items-start group">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="leading-relaxed">Mendukung proses pembelajaran kimia dasar yang berkualitas</span>
                    </li>
                    <li className="flex items-start group">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="leading-relaxed">Mengembangkan kemampuan praktis mahasiswa dalam bidang kimia</span>
                    </li>
                    <li className="flex items-start group">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="leading-relaxed">Menjaga standar keamanan dan keselamatan di laboratorium</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10 border border-primary-100 shadow-lg">
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">Fasilitas Laboratorium</h3>
                <div className="space-y-6">
                  {[
                    'Meja kerja praktikum yang ergonomis',
                    'Peralatan laboratorium modern',
                    'Sistem ventilasi dan keamanan',
                    'Penyimpanan bahan kimia yang aman',
                    'Sistem pencatatan digital'
                  ].map((facility, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="w-3 h-3 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-neutral-700 text-lg group-hover:text-primary-700 transition-colors duration-300">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Keunggulan Laboratorium
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Laboratorium Kimia Dasar dilengkapi dengan berbagai keunggulan
                untuk mendukung pembelajaran yang optimal dan berstandar internasional.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="p-8 text-center group cursor-pointer border-neutral-100">
                    <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                      <Icon className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
          <div className="container-custom text-center relative">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Butuh Informasi Lebih Lanjut?
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                Hubungi kami untuk informasi lebih lanjut tentang laboratorium dan layanan yang tersedia.
              </p>
              <a
                href="/kontak"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
