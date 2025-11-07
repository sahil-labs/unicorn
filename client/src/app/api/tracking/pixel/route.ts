import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Postback pixel endpoint for conversion tracking
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('order_id')
    const amount = searchParams.get('amount')
    const clickId = request.cookies.get('aff_click_id')?.value
    const linkId = request.cookies.get('aff_link_id')?.value

    if (!orderId || !amount || !clickId || !linkId) {
      return new NextResponse('Invalid parameters', { status: 400 })
    }

    // Find the click and link
    const click = await prisma.click.findUnique({
      where: { clickId },
      include: {
        link: {
          include: {
            product: true,
            creator: true,
          },
        },
      },
    })

    if (!click || click.converted) {
      return new NextResponse('Click not found or already converted', { status: 404 })
    }

    // Check if click is still within attribution window
    if (new Date() > click.expiresAt) {
      return new NextResponse('Attribution window expired', { status: 400 })
    }

    const link = click.link

    // Calculate commission
    const saleAmount = parseFloat(amount)
    const commissionRate = parseFloat(link.product.commissionRate.toString())
    const commission = (saleAmount * commissionRate) / 100

    // Create transaction
    await prisma.transaction.create({
      data: {
        type: 'SALE',
        brandId: link.product.brandId,
        creatorId: link.creatorId,
        productId: link.productId,
        linkId: link.id,
        amount: saleAmount,
        commission,
        orderId,
        attributionSource: 'LINK',
        clickId,
        status: 'COMPLETED',
      },
    })

    // Update click as converted
    await prisma.click.update({
      where: { clickId },
      data: { converted: true },
    })

    // Update link stats
    await prisma.affiliateLink.update({
      where: { id: link.id },
      data: {
        conversions: { increment: 1 },
        revenue: { increment: saleAmount },
        commission: { increment: commission },
      },
    })

    // Update product stats
    await prisma.product.update({
      where: { id: link.productId },
      data: {
        totalConversions: { increment: 1 },
        totalRevenue: { increment: saleAmount },
      },
    })

    // Update creator stats
    await prisma.creatorProfile.update({
      where: { id: link.creatorId },
      data: {
        totalConversions: { increment: 1 },
        totalEarnings: { increment: commission },
      },
    })

    // Return 1x1 transparent pixel
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    )

    return new NextResponse(pixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    })
  } catch (error) {
    console.error('Pixel tracking error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}

