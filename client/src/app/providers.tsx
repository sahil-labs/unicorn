'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/analytics'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      initPostHog()
    }
  }, [])

  return <>{children}</>
}

