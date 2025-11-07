import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link as LinkIcon, Search } from 'lucide-react'

export default function CreatorMarketplacePage() {
  // Mock data - will be replaced with real data from database
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      brand: 'AudioTech',
      price: 2999,
      commission: 15,
      commissionAmount: 450,
      category: 'Electronics',
      image: null,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      brand: 'FitPro',
      price: 4999,
      commission: 20,
      commissionAmount: 1000,
      category: 'Fitness',
      image: null,
    },
    {
      id: '3',
      name: 'Portable Bluetooth Speaker',
      brand: 'SoundMax',
      price: 1499,
      commission: 12,
      commissionAmount: 180,
      category: 'Electronics',
      image: null,
    },
    {
      id: '4',
      name: 'Organic Skincare Set',
      brand: 'PureGlow',
      price: 2499,
      commission: 25,
      commissionAmount: 625,
      category: 'Beauty',
      image: null,
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar role="creator" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Browse products and start promoting</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-4xl text-purple-600 font-bold">{product.name[0]}</span>
                  )}
                </div>
                <CardHeader>
                  <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>
                    <span className="text-sm font-medium text-foreground">₹{product.price}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{product.category}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-green-900 dark:text-green-100">
                      Earn ₹{product.commissionAmount} per sale
                    </div>
                    <div className="text-xs text-green-700 dark:text-green-300">
                      {product.commission}% commission
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Generate Link
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

