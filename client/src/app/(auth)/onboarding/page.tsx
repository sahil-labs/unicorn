'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserCircle, Building2 } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get('role')
  
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand' | null>(
    initialRole as 'creator' | 'brand' | null
  )

  const handleRoleSelect = (role: 'creator' | 'brand') => {
    setSelectedRole(role)
    setStep(2)
  }

  const handleComplete = async () => {
    // TODO: Save profile to database
    if (selectedRole === 'brand') {
      router.push('/brand')
    } else {
      router.push('/creator')
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-background">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Choose Your Path</h1>
            <p className="text-muted-foreground">
              How would you like to use Micro-Creator?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="cursor-pointer hover:border-purple-600 transition-colors"
              onClick={() => handleRoleSelect('creator')}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <UserCircle className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>I'm a Creator</CardTitle>
                <CardDescription>
                  Promote products and earn commissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Instant access to products
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Generate affiliate links
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Track earnings in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Weekly payouts
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => handleRoleSelect('creator')}>
                  Continue as Creator
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-purple-600 transition-colors"
              onClick={() => handleRoleSelect('brand')}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>I'm a Brand</CardTitle>
                <CardDescription>
                  List products and work with creators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    List unlimited products
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Access to 5,000+ creators
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Track performance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    Automated payouts
                  </li>
                </ul>
                <Button className="w-full mt-6" onClick={() => handleRoleSelect('brand')}>
                  Continue as Brand
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Let's set up your {selectedRole} account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Tell us a bit about yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleComplete(); }}>
              {selectedRole === 'brand' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Your Company Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">About Your Brand</Label>
                    <textarea
                      id="description"
                      className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell creators about your brand..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell brands about yourself and your audience..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      placeholder="@yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Niche/Category</Label>
                    <Input
                      id="niche"
                      placeholder="e.g., Fashion, Tech, Lifestyle"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" size="lg">
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

