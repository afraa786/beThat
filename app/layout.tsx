import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
// import Banner from '@/components/layout/Banner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap' })
const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '700'], display: 'swap' })

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Be That Percent',
    template: '%s | Be That Percent',
  },
  description: 'Fashion for those who dare to be different.',
  // TODO: Add OpenGraph, Twitter card, and favicon metadata once brand assets are finalised
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${playfair.variable}
          ${poppins.variable}
          antialiased
          overflow-x-hidden
          w-full
          max-w-[100vw]
          min-h-screen
        `}
      >
        {/* Dismissable promo banner — fetches text from Firestore settings doc */}
        {/* <Banner /> */}

        {/* Sticky site header with nav, search, cart badge, and account icon */}
        <Header />

        {/* Page content */}
        <main className="w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </main>

        {/* Site-wide footer */}
        <Footer />
      </body>
    </html>
  )
}
