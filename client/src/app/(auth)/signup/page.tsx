'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chrome } from 'lucide-react'
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Micro-Creator
            </span>
          </Link>
          <h1 className="text-2xl font-bold">
            Join as a {role === 'brand' ? 'Brand' : 'Creator'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {role === 'brand' 
              ? 'List your products and reach thousands of creators'
              : 'Start earning commissions by promoting products you love'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Get started in less than a minute
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full gap-2"
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
                />
                <p className="text-xs text-muted-foreground">
                  Min 8 characters, must include uppercase, lowercase, and number
                </p>
              </div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up with Email'}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{' '}
              <Link href="/legal/terms" className="underline hover:text-foreground">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="text-sm">
            <span className="text-muted-foreground">
              Already have an account?{' '}
            </span>
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>

          {role === 'creator' ? (
            <div className="text-sm">
              <span className="text-muted-foreground">
                Are you a brand?{' '}
              </span>
              <Link href="/signup?role=brand" className="font-medium text-primary hover:underline">
                Sign up as brand
              </Link>
            </div>
          ) : (
            <div className="text-sm">
              <span className="text-muted-foreground">
                Are you a creator?{' '}
              </span>
              <Link href="/signup?role=creator" className="font-medium text-primary hover:underline">
                Sign up as creator
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

