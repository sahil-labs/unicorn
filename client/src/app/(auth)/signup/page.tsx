'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chrome, Sparkles, ArrowLeft, Check } from 'lucide-react'
import { register } from '@/lib/auth-api'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'creator'
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isCreator = role === 'creator'
  const isBrand = role === 'brand'

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: `/onboarding?role=${role}` })
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    
    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and number')
      return
    }

    setIsLoading(true)

    try {
      // Convert URL role to uppercase format for backend
      const userRole = role === 'brand' ? 'BRAND' : 'CREATOR'
      
      const response = await register({ 
        name, 
        email, 
        password,
        role: userRole as 'CREATOR' | 'BRAND'
      })
      
      if (response.success && response.data) {
        // Redirect to appropriate dashboard based on role
        const registeredRole = response.data.user.role
        
        if (registeredRole === 'BRAND') {
          router.push('/brand')
        } else {
          router.push('/creator')
        }
        
        // Force page refresh to update auth state
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-5xl">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Branding & Benefits */}
          <div className="space-y-6">
            {/* Logo & Heading */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">
                  CreatorAds
                </span>
              </Link>
              
              <div>
                <Badge variant={isCreator ? "secondary" : "default"} className={`mb-3 ${isBrand ? 'bg-accent' : ''}`}>
                  {isCreator ? 'For Creators' : 'For Brands'}
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight mb-3">
                  {isCreator ? 'Start Earning Per Click' : 'Launch Your Campaign'}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {isCreator 
                    ? 'Join 12,000+ creators earning from their influence'
                    : 'Reach 12,000+ creators instantly on CPC'}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isCreator ? 'Why Creators Love CreatorAds' : 'Why Brands Choose CreatorAds'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isCreator ? (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Earn ₹5-₹15 per click</div>
                        <div className="text-muted-foreground">No sales pressure, just traffic</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Instant approval</div>
                        <div className="text-muted-foreground">Start promoting in 30 seconds</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Weekly payouts via UPI</div>
                        <div className="text-muted-foreground">No minimum threshold</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Real-time tracking</div>
                        <div className="text-muted-foreground">Watch earnings grow live</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Pay only for verified clicks</div>
                        <div className="text-muted-foreground">Advanced fraud detection</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Launch in 5 minutes</div>
                        <div className="text-muted-foreground">Set your CPC, go live instantly</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Reach 12,000+ creators</div>
                        <div className="text-muted-foreground">No DMs, no negotiations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">Real-time analytics</div>
                        <div className="text-muted-foreground">Track ROI and performance</div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Signup Form */}
          <div className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>
                  Get started in less than 60 seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full gap-2 border-2"
                  size="lg"
                >
                  <Chrome className="h-5 w-5" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleEmailSignup}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="border-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Min 8 characters, must include uppercase, lowercase, and number
                    </p>
                  </div>
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border-2 border-red-200 dark:border-red-900/50">
                      {error}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className={`w-full ${isCreator ? 'bg-secondary hover:bg-secondary/90' : 'bg-accent hover:bg-accent/90'}`}
                    size="lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{' '}
                  <Link href="/legal/terms" className="underline hover:text-foreground">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Additional Links */}
            <div className="text-center space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{' '}
                </span>
                <Link href="/login" className="font-semibold text-secondary hover:text-secondary/80 transition-colors">
                  Sign in
                </Link>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">
                  {isCreator ? 'Are you a brand? ' : 'Are you a creator? '}
                </span>
                <Link 
                  href={isCreator ? '/signup?role=brand' : '/signup?role=creator'} 
                  className={`font-semibold ${isCreator ? 'text-accent' : 'text-secondary'} hover:opacity-80 transition-opacity`}
                >
                  {isCreator ? 'Sign up as brand' : 'Sign up as creator'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
