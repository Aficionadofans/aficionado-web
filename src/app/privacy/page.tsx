import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <Link href="/login" className="inline-flex items-center gap-2 text-bio-teal hover:text-bio-emerald transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_20px_rgba(0,240,181,0.2)]">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
            <p>
              We collect information you provide directly to us, including your name, email address, password, and Zip Code. 
              We use this information to operate, maintain, and provide the features and functionality of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Location Data (Zip Codes)</h2>
            <p>
              To power our Local Square communities, we require a verified Zip Code upon registration. 
              This data is strictly used to segregate local feeds and is never sold to third-party advertisers. 
              Your specific physical location beyond the Zip Code is not tracked by Aficionado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. 
              Your data is encrypted in transit and at rest using industry-standard protocols via our infrastructure providers.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
