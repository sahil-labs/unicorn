import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Micro-Creator Affiliate - India\'s First Affiliate Marketplace for Micro-Creators',
  description: 'Make ₹ per sale, not ₹ per post. No apply, no approval — just promote & earn.',
  keywords: ['affiliate marketing', 'creator economy', 'india', 'micro-creators', 'commission'],
  openGraph: {
    title: 'Micro-Creator Affiliate Marketplace',
    description: 'India\'s first affiliate marketplace built for micro-creators',
    type: 'website',
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

