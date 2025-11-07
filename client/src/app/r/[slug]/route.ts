import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    // Find the affiliate link
    const link = await prisma.affiliateLink.findUnique({
      where: { slug },
      include: {
        product: true,
        creator: true,
      },
    })

    if (!link || !link.isActive) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Get tracking data
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || null

    // Generate unique click ID
    const clickId = nanoid()

    // Create click record
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + (parseInt(process.env.ATTRIBUTION_WINDOW_DAYS || '7')))

    await prisma.click.create({
      data: {
        linkId: link.id,
        ipAddress,
        userAgent,
        referer,
        clickId,
        expiresAt,
      },
    })

    // Update link clicks count
    await prisma.affiliateLink.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    })

    // Update product clicks
    await prisma.product.update({
      where: { id: link.productId },
      data: { totalClicks: { increment: 1 } },
    })

    // Create redirect response with tracking cookies
    const response = NextResponse.redirect(link.product.productUrl)
    
    response.cookies.set('aff_click_id', clickId, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
    })

    response.cookies.set('aff_link_id', link.id, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

