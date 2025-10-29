import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Lab Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Lab Kimia Dasar
              </span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Laboratorium Kimia Dasar menyediakan fasilitas dan layanan terbaik
              untuk mendukung pembelajaran kimia dasar dengan teknologi modern.
            </p>
            <div className="flex items-center space-x-3 text-neutral-600">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span>Gedung Sains, Lantai 2</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Menu Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Tentang Lab
                </Link>
              </li>
              <li>
                <Link href="/praktikum" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Praktikum
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <span>labkimia@university.ac.id</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <span>Senin - Jumat, 08:00 - 16:00</span>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-900">Lokasi</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.123456789!3d-6.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjQuNCJTIDEwNsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
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
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-neutral-600 text-sm">
              © 2024 Lab Kimia Dasar. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-600 hover:text-primary-600 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}