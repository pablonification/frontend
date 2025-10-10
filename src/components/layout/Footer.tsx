import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lab Kimia Dasar</h3>
            <p className="text-neutral-300 mb-4">
              Laboratorium Kimia Dasar menyediakan fasilitas dan layanan terbaik 
              untuk mendukung pembelajaran kimia dasar.
            </p>
            <div className="flex items-center space-x-2 text-neutral-300">
              <MapPin className="w-4 h-4" />
              <span>Gedung Sains, Lantai 2</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition-colors">
                  Tentang Lab
                </Link>
              </li>
              <li>
                <Link href="/praktikum" className="text-neutral-300 hover:text-white transition-colors">
                  Praktikum
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-neutral-300 hover:text-white transition-colors">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-neutral-300">
                <Phone className="w-4 h-4" />
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Mail className="w-4 h-4" />
                <span>labkimia@university.ac.id</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Clock className="w-4 h-4" />
                <span>Senin - Jumat, 08:00 - 16:00</span>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lokasi</h3>
            <div className="bg-neutral-800 rounded-lg p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.123456789!3d-6.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnMjQuNCJTIDEwNsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400">
            © 2024 Lab Kimia Dasar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}