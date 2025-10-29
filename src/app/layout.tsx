import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '../components/layout/ConditionalLayout'
import ErrorBoundary from '../components/ErrorBoundary'
import { AppProvider } from '../contexts/AppContext'
import NotificationSystem from '../components/NotificationSystem'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <AppProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <NotificationSystem />
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}