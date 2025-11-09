'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Copy, ExternalLink, Instagram, CheckCircle2, AlertCircle } from 'lucide-react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  salePrice?: number
  category: string
  images: string[]
  brandId: any
}

interface TrackingLinkModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function TrackingLinkModal({ product, isOpen, onClose }: TrackingLinkModalProps) {
  const [step, setStep] = useState<'guidelines' | 'link'>('guidelines')
  const [trackingLink, setTrackingLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [brandName, setBrandName] = useState('')

  const handleAcceptGuidelines = async () => {
    if (!product) return
    
    setIsGenerating(true)
    
    try {
      const response = await fetch('http://localhost:8000/api/creator/links/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId: product._id }),
      })

      const result = await response.json()

      if (result.success && result.data) {
        setTrackingLink(result.data.trackingUrl)
        setBrandName(result.data.brandName || 'Brand')
        setStep('link')
      } else {
        alert('Failed to generate tracking link. Please try again.')
      }
    } catch (error) {
      console.error('Error generating tracking link:', error)
      alert('Failed to generate tracking link. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleClose = () => {
    setStep('guidelines')
    setTrackingLink('')
    setIsCopied(false)
    onClose()
  }

  if (!product) return null

  const cpc = product.salePrice || product.price

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        {step === 'guidelines' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Campaign Guidelines</DialogTitle>
              <DialogDescription>
                Please review these guidelines before getting your tracking link
              </DialogDescription>
            </DialogHeader>

            {/* Product Info */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg p-4 border-2 mt-4">
              <div className="flex gap-4">
                {product.images && product.images[0] && (
                  <div className="w-20 h-20 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-18 h-18 object-contain rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <Badge variant="outline" className="mb-2">{product.category}</Badge>
                  <div className="flex items-center gap-4">
                    <div className="text-accent font-bold text-lg">
                      Earn ₹{cpc}/click
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="space-y-4 mt-4">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-secondary" />
                Follow These Guidelines to Get Rewards:
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Create Engaging Content</p>
                    <p className="text-sm text-muted-foreground">
                      Create an ad/post for this product or service that resonates with your audience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Post on Social Media</p>
                    <p className="text-sm text-muted-foreground">
                      Share on Instagram, YouTube, Facebook, or any platform where you have followers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Maximize Traffic</p>
                    <p className="text-sm text-muted-foreground">
                      Your goal is to get maximum engagement and clicks through your tracking link
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border-2 border-accent/20">
                  <Instagram className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-accent">Required for Instagram Reels:</p>
                    <ul className="text-sm space-y-1 mt-1 text-muted-foreground">
                      <li>• Tag <strong>@creatorads</strong> (CreatorAds official account)</li>
                      <li>• Tag the brand's Instagram account</li>
                      <li>• <strong>Invite both as collaborators</strong> on your reel</li>
                      <li>• This is mandatory to be eligible for reward payouts</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg border-2 border-secondary/20">
                  <ExternalLink className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-secondary">Include Your Tracking Link</p>
                    <p className="text-sm text-muted-foreground">
                      Add your unique tracking link in your bio, story link, or video description
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAcceptGuidelines}
                disabled={isGenerating}
                className="flex-1 bg-accent hover:bg-accent/90"
              >
                {isGenerating ? 'Generating...' : 'Yes, I Will Follow Guidelines'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Check className="h-6 w-6 text-accent" />
                Tracking Link Generated!
              </DialogTitle>
              <DialogDescription>
                Your unique tracking link is ready. Copy and start promoting!
              </DialogDescription>
            </DialogHeader>

            {/* Product Info */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-4 border-2 border-accent/20">
              <div className="flex gap-4">
                {product.images && product.images[0] && (
                  <div className="w-20 h-20 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-18 h-18 object-contain rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{brandName}</p>
                  <div className="text-accent font-bold">
                    Earn ₹{cpc} per click
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Link */}
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium">Your Tracking Link:</label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border-2 font-mono text-sm break-all">
                  {trackingLink}
                </div>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {isCopied && (
                <p className="text-sm text-accent flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Link copied to clipboard!
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-secondary/10 rounded-lg p-4 border-2 border-secondary/20 mt-4">
              <h4 className="font-semibold mb-2">Next Steps:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">1.</span>
                  Create engaging content for this product
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">2.</span>
                  Add this tracking link to your bio/post/story
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">3.</span>
                  Follow all guidelines to be eligible for payouts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">4.</span>
                  Track your clicks and earnings in "My Links" section
                </li>
              </ul>
            </div>

            {/* Action */}
            <Button
              onClick={handleClose}
              className="w-full bg-accent hover:bg-accent/90 mt-4"
            >
              Got It! Start Promoting
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

