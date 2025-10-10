import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import { AppProvider } from '../contexts/AppContext'
import NotificationSystem from '../components/NotificationSystem'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Lab Kimia Dasar ITB',
  description: 'Website resmi Laboratorium Kimia Dasar Institut Teknologi Bandung',
  keywords: 'kimia dasar, praktikum, ITB, laboratorium, kimia',
  authors: [{ name: 'Lab Kimia Dasar ITB' }],
  openGraph: {
    title: 'Lab Kimia Dasar ITB',
    description: 'Website resmi Laboratorium Kimia Dasar Institut Teknologi Bandung',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={manrope.variable}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <AppProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <NotificationSystem />
            </div>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}