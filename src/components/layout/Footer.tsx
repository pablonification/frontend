import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, MapPlus } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Lab Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo_itb2.png" alt="Lab Kimia Dasar" width={55} height={55} />
              <span className="text-xl font-bold text-neutral-900">
                Laboratorium Kimia Dasar ITB
              </span>
            </div>
            <p className="text-neutral-600 leading-relaxed text-justify">
              Laboratorium Kimia Dasar ITB menyediakan fasilitas dan layanan terbaik
              untuk mendukung pembelajaran kimia dasar dengan teknologi modern.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Menu Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                  Tentang Lab
                </Link>
              </li>
              <li>
                <Link href="/praktikum" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                  Praktikum
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Kontak</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <span className="leading-relaxed">Laboratorium Kimia Dasar, ITB Jatinangor</span>
              </div>
              <div className="flex items-center space-x-4 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <span>labkidas@itb.ac.id</span>
              </div>
              <div className="flex items-center space-x-4 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <span>Senin - Jumat, 06:00 - 17:30</span>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Lokasi</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.681914996939!2d107.76805689999999!3d-6.9285715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c5001d4f2f5b%3A0x9e7ed7b69e9bbd54!2sLaboratorium%20Kimia%20Dasar%20ITB%20Jatinangor!5e0!3m2!1sen!2sid!4v1761727673831!5m2!1sen!2sid"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-16 pt-8">
          <div className="flex flex-row items-center justify-center">
            <p className="text-neutral-600 text-sm">
              © 2025 Laboratorium Kimia Dasar ITB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}