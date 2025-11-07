import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function BrandProductsPage() {
  // Mock data - will be replaced with real data from database
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 2999,
      commission: 15,
      clicks: 234,
      conversions: 12,
      isActive: true,
      image: null,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 4999,
      commission: 20,
      clicks: 567,
      conversions: 34,
      isActive: true,
      image: null,
    },
    {
      id: '3',
      name: 'Portable Bluetooth Speaker',
      price: 1499,
      commission: 12,
      clicks: 156,
      conversions: 8,
      isActive: false,
      image: null,
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Link href="/brand/products/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>
                {products.length} products in your catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-purple-600 font-medium">{product.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>₹{product.price}</span>
                          <span>•</span>
                          <span>{product.commission}% commission</span>
                          <span>•</span>
                          <span>{product.clicks} clicks</span>
                          <span>•</span>
                          <span>{product.conversions} sales</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.isActive ? (
                        <Button variant="ghost" size="sm" className="gap-2 text-green-600">
                          <Eye className="h-4 w-4" />
                          Active
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                          <EyeOff className="h-4 w-4" />
                          Inactive
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

