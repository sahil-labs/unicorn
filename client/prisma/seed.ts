import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@microcreator.app' },
    update: {},
    create: {
      email: 'admin@microcreator.app',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  console.log('Created admin user:', admin.email)

  // Create brand user
  const brandUser = await prisma.user.upsert({
    where: { email: 'brand@example.com' },
    update: {},
    create: {
      email: 'brand@example.com',
      name: 'Test Brand',
      role: 'BRAND',
      emailVerified: new Date(),
    },
  })

  // Create brand profile
  const brand = await prisma.brandProfile.upsert({
    where: { userId: brandUser.id },
    update: {},
    create: {
      userId: brandUser.id,
      businessName: 'Test Brand Co.',
      description: 'A test brand for development',
      website: 'https://testbrand.com',
      subscriptionTier: 'FREE',
    },
  })

  console.log('Created brand:', brand.businessName)

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        brandId: brand.id,
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        slug: 'premium-wireless-headphones',
        price: 2999,
        salePrice: 2499,
        productUrl: 'https://testbrand.com/products/headphones',
        commissionRate: 15,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'tech'],
        isActive: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        brandId: brand.id,
        name: 'Smart Fitness Watch',
        description: 'Track your fitness goals with this smart watch',
        slug: 'smart-fitness-watch',
        price: 4999,
        salePrice: 3999,
        productUrl: 'https://testbrand.com/products/watch',
        commissionRate: 20,
        category: 'Fitness',
        tags: ['fitness', 'smart', 'wearable'],
        isActive: true,
        featured: true,
      },
    }),
    prisma.product.create({
      data: {
        brandId: brand.id,
        name: 'Organic Skincare Set',
        description: 'Natural and organic skincare products',
        slug: 'organic-skincare-set',
        price: 2499,
        productUrl: 'https://testbrand.com/products/skincare',
        commissionRate: 25,
        category: 'Beauty',
        tags: ['beauty', 'organic', 'skincare'],
        isActive: true,
      },
    }),
  ])

  console.log(`Created ${products.length} products`)

  // Create creator users
  const creator1User = await prisma.user.upsert({
    where: { email: 'creator1@example.com' },
    update: {},
    create: {
      email: 'creator1@example.com',
      name: 'Sarah Kumar',
      role: 'CREATOR',
      emailVerified: new Date(),
    },
  })

  const creator1 = await prisma.creatorProfile.upsert({
    where: { userId: creator1User.id },
    update: {},
    create: {
      userId: creator1User.id,
      bio: 'Fashion and lifestyle content creator',
      instagram: '@sarahkumar',
      niche: ['Fashion', 'Lifestyle'],
      kycVerified: true,
    },
  })

  const creator2User = await prisma.user.upsert({
    where: { email: 'creator2@example.com' },
    update: {},
    create: {
      email: 'creator2@example.com',
      name: 'Rahul Tech',
      role: 'CREATOR',
      emailVerified: new Date(),
    },
  })

  const creator2 = await prisma.creatorProfile.upsert({
    where: { userId: creator2User.id },
    update: {},
    create: {
      userId: creator2User.id,
      bio: 'Tech reviewer and gadget enthusiast',
      instagram: '@rahultech',
      youtube: '@rahultech',
      niche: ['Technology', 'Gadgets'],
      kycVerified: true,
    },
  })

  console.log('Created 2 creator profiles')

  // Create affiliate links
  for (const product of products) {
    // Link for creator 1
    const link1 = await prisma.affiliateLink.create({
      data: {
        creatorId: creator1.id,
        productId: product.id,
        slug: nanoid(10),
        fullUrl: `http://localhost:3000/r/${nanoid(10)}`,
        isActive: true,
      },
    })

    // Link for creator 2
    const link2 = await prisma.affiliateLink.create({
      data: {
        creatorId: creator2.id,
        productId: product.id,
        slug: nanoid(10),
        fullUrl: `http://localhost:3000/r/${nanoid(10)}`,
        isActive: true,
      },
    })

    console.log(`Created affiliate links for ${product.name}`)
  }

  // Create some sample transactions
  const link = await prisma.affiliateLink.findFirst({
    where: { creatorId: creator1.id },
  })

  if (link) {
    await prisma.transaction.create({
      data: {
        type: 'SALE',
        brandId: brand.id,
        creatorId: creator1.id,
        productId: link.productId,
        linkId: link.id,
        amount: 2499,
        commission: 374.85,
        orderId: 'ORD-' + nanoid(8),
        attributionSource: 'LINK',
        status: 'COMPLETED',
      },
    })

    console.log('Created sample transaction')
  }

  // Create feature flags
  await prisma.featureFlag.upsert({
    where: { name: 'enable_instagram_integration' },
    update: {},
    create: {
      name: 'enable_instagram_integration',
      description: 'Enable Instagram auto-posting feature',
      enabled: false,
    },
  })

  await prisma.featureFlag.upsert({
    where: { name: 'enable_crypto_payouts' },
    update: {},
    create: {
      name: 'enable_crypto_payouts',
      description: 'Enable cryptocurrency payout option',
      enabled: false,
    },
  })

  console.log('Created feature flags')

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

