// PostHog Analytics

export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    const posthog = require('posthog-js')
    
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog: any) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })

    return posthog
  }
  return null
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    const posthog = require('posthog-js')
    posthog.capture(eventName, properties)
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    const posthog = require('posthog-js')
    posthog.identify(userId, traits)
  }
}

// Common events
export const Events = {
  // User events
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in',
  USER_ONBOARDED: 'user_onboarded',

  // Creator events
  PRODUCT_VIEWED: 'product_viewed',
  LINK_GENERATED: 'link_generated',
  LINK_CLICKED: 'link_clicked',
  LINK_SHARED: 'link_shared',
  PAYOUT_REQUESTED: 'payout_requested',
  PAYOUT_RECEIVED: 'payout_received',

  // Brand events
  PRODUCT_CREATED: 'product_created',
  PRODUCT_UPDATED: 'product_updated',
  COUPON_CREATED: 'coupon_created',
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',

  // Transaction events
  CONVERSION_TRACKED: 'conversion_tracked',
  COMMISSION_EARNED: 'commission_earned',
  SALE_COMPLETED: 'sale_completed',

  // Engagement events
  PAGE_VIEWED: 'page_viewed',
  BUTTON_CLICKED: 'button_clicked',
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
}

// Server-side analytics logging to database
export async function logAuditEvent(params: {
  userId?: string
  action: string
  entity: string
  entityId?: string
  changes?: any
  ipAddress?: string
  userAgent?: string
}) {
  try {
    const { prisma } = await import('./prisma')
    
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        changes: params.changes,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    })
  } catch (error) {
    console.error('Audit log error:', error)
  }
}

// Analytics helper functions
export function trackProductView(productId: string, userId?: string) {
  trackEvent(Events.PRODUCT_VIEWED, {
    product_id: productId,
    user_id: userId,
  })
}

export function trackLinkGeneration(linkId: string, productId: string, creatorId: string) {
  trackEvent(Events.LINK_GENERATED, {
    link_id: linkId,
    product_id: productId,
    creator_id: creatorId,
  })
}

export function trackConversion(params: {
  linkId: string
  productId: string
  creatorId: string
  amount: number
  commission: number
}) {
  trackEvent(Events.CONVERSION_TRACKED, params)
}

