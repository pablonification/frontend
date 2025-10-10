import Link from 'next/link'
import { BookOpen, Calendar, FileText, HelpCircle, Phone, Search } from 'lucide-react'

const quickAccessItems = [
  {
    title: 'Praktikum',
    description: 'Akses modul, jadwal, dan pembagian kelompok',
    icon: BookOpen,
    href: '/praktikum',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    title: 'Pengumuman',
    description: 'Informasi terkini dari laboratorium',
    icon: FileText,
    href: '/pengumuman',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    title: 'Jadwal Praktikum',
    description: 'Lihat jadwal praktikum semester ini',
    icon: Calendar,
    href: '/praktikum#jadwal',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600'
  },
  {
    title: 'FAQ',
    description: 'Pertanyaan yang sering diajukan',
    icon: HelpCircle,
    href: '/faq',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600'
  },
  {
    title: 'Kontak',
    description: 'Hubungi laboratorium',
    icon: Phone,
    href: '/kontak',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600'
  },
  {
    title: 'Pencarian',
    description: 'Cari informasi di website',
    icon: Search,
    href: '/search',
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-600'
  }
]

export default function QuickAccess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickAccessItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.title}
            href={item.href}
            className="group card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className={`${item.color} ${item.hoverColor} p-3 rounded-lg transition-colors duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
