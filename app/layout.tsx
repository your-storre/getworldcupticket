import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Toaster } from 'react-hot-toast'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GetWorldCupTicket | Official World Cup 2026 Ticket Marketplace',
  description: 'Buy and sell FIFA World Cup 2026 tickets securely. Trusted marketplace with 100% guarantee. Best prices for all matches including finals, semi-finals, and group stages.',
  keywords: 'World Cup tickets, FIFA 2026, football tickets, World Cup USA, soccer tickets',
  authors: [{ name: 'GetWorldCupTicket' }],
  openGraph: {
    title: 'GetWorldCupTicket - World Cup 2026 Tickets',
    description: 'Secure marketplace for FIFA World Cup 2026 tickets',
    url: 'https://getworldcupticket.com',
    siteName: 'GetWorldCupTicket',
    images: [
      {
        url: 'https://getworldcupticket.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'World Cup 2026 Tickets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetWorldCupTicket - World Cup 2026 Tickets',
    description: 'Secure marketplace for FIFA World Cup 2026 tickets',
    images: ['https://getworldcupticket.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://getworldcupticket.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
