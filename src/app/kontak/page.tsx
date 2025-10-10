import { Metadata } from 'next'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

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
    <div className="min-h-screen bg-neutral-50">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Kontak
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
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
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                      {info.title}
                    </h3>
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-neutral-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Kirim Pesan
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </button>
                </form>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Lokasi
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.123456789!3d-6.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjQuNCJTIDEwNsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </div>
                
                <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    Petunjuk Arah
                  </h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Dari gerbang utama, belok kanan</li>
                    <li>• Ikuti jalan hingga gedung Sains</li>
                    <li>• Laboratorium berada di lantai 2</li>
                    <li>• Tanyakan kepada satpam jika bingung</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Butuh Bantuan Cepat?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Hubungi kami langsung untuk mendapatkan bantuan segera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+622112345678"
                className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-3"
              >
                <Phone className="w-5 h-5 mr-2" />
                Telepon Sekarang
              </a>
              <a
                href="mailto:labkimia@university.ac.id"
                className="btn bg-primary-500 text-white hover:bg-primary-400 text-lg px-8 py-3"
              >
                <Mail className="w-5 h-5 mr-2" />
                Kirim Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
