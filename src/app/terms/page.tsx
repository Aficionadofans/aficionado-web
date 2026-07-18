import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <Link href="/login" className="inline-flex items-center gap-2 text-bio-teal hover:text-bio-emerald transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-bio-teal/20 flex items-center justify-center border border-bio-teal/50 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
            <Shield className="w-6 h-6 text-bio-teal" />
          </div>
          <h1 className="text-4xl font-black text-white">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Aficionado, you accept and agree to be bound by the terms and provision of this agreement. 
              Aficionado is designed to be an anti-dopamine, healing social network, and we expect all users to adhere to this mission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Strict Prohibition of Adult Content</h2>
            <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 mb-4">
              <strong className="text-red-400 block mb-2">ZERO TOLERANCE POLICY</strong>
              <p className="text-sm">
                Aficionado strictly prohibits the uploading, sharing, or distribution of pornography or explicit adult content. 
                Our platform utilizes advanced AI moderation to detect such content. Any violation will result in immediate and permanent account termination.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Local Communities & Zip Codes</h2>
            <p>
              By using our "Local Square" feature, you agree to provide an accurate and truthful Zip Code during registration. 
              Falsifying your location to gain access to other neighborhoods is a violation of these terms and may result in a ban.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Conduct</h2>
            <p>
              You agree to use the platform for its intended purpose: to heal, connect, and grow. Harassment, hate speech, and spam are strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
