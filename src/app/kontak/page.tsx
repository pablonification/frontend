import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export const metadata: Metadata = {
  title: 'Kontak - Lab Kimia Dasar',
  description: 'Hubungi Laboratorium Kimia Dasar untuk informasi lebih lanjut tentang praktikum, jadwal, dan layanan lainnya.',
}

export default function KontakPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      details: [
        'Gedung Sains, Lantai 2',
        'Universitas Example',
        'Jl. Contoh No. 123',
        'Jakarta 12345'
      ]
    },
    {
      icon: Phone,
      title: 'Telepon',
      details: [
        '(021) 1234-5678',
        'WhatsApp: +62 812-3456-7890'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'labkimia@university.ac.id',
        'koordinator@university.ac.id'
      ]
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: [
        'Senin - Jumat: 08:00 - 16:00',
        'Sabtu: 08:00 - 12:00',
        'Minggu: Tutup'
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
                Hubungi Kami
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Kontak
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Hubungi Laboratorium Kimia Dasar untuk informasi lebih lanjut tentang
                praktikum, jadwal, dan layanan lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card key={index} className="p-8 text-center border-neutral-100">
                    <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-10 h-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                      {info.title}
                    </h3>
                    <div className="space-y-3">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-neutral-600 leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-8">
                  Kirim Pesan
                </h2>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="label">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="label">
                      Subjek
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="input"
                      placeholder="Subjek pesan"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="label">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="textarea"
                      placeholder="Tuliskan pesan Anda di sini..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full shadow-lg hover:shadow-xl">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-8">
                  Lokasi
                </h2>
                <Card className="overflow-hidden border-neutral-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.123456789!3d-6.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjQuNCJTIDEwNsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </Card>
                
                <Card className="mt-8 p-8 border-neutral-200">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                    Petunjuk Arah
                  </h3>
                  <ul className="space-y-4 text-neutral-600 leading-relaxed">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Dari gerbang utama, belok kanan
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ikuti jalan hingga gedung Sains
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Laboratorium berada di lantai 2
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Tanyakan kepada satpam jika bingung
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
          <div className="container-custom text-center relative">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Butuh Bantuan Cepat?
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                Hubungi kami langsung untuk mendapatkan bantuan segera.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="tel:+622112345678"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:bg-primary-50 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Telepon Sekarang
                </a>
                <a
                  href="mailto:labkimia@university.ac.id"
                  className="inline-flex items-center px-8 py-4 bg-primary-500/20 backdrop-blur-sm text-white hover:bg-primary-500/30 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Kirim Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
