import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CreatorAds - India\'s First CPC Traffic Marketplace for Micro-Creators',
  description: 'Make ₹ per click, not ₹ per post. India\'s first traffic marketplace built for micro‑creators. No apply, no approval — just promote & earn. Brands: buy real influencer traffic on CPC, cheaper than Meta ads.',
  keywords: ['creator ads', 'CPC marketing', 'creator economy', 'india', 'micro-creators', 'influencer marketing', 'cost per click', 'performance marketing', 'creator network'],
  openGraph: {
    title: 'CreatorAds - CPC Traffic Marketplace for Creators & Brands',
    description: 'For Creators: Earn ₹5-₹15 per click. For Brands: Buy influencer traffic on CPC. India\'s first performance-based creator ads network.',
    type: 'website',
    siteName: 'CreatorAds',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorAds - India\'s First CPC Creator Ads Network',
    description: 'Creators earn per click. Brands pay per click. No sales pressure. Performance-based influencer marketing.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

