import React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function CreatorAgreementPage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <Link href="/login" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <FileText className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-4xl font-black text-white">Creator Monetization Agreement</h1>
        </div>

        <div className="space-y-8 text-white/80 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Eligibility</h2>
            <p>
              To become an Aficionado (Creator) and monetize your content, you must agree to these supplemental terms. 
              You represent and warrant that you own or have the necessary licenses for all content you upload.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Liability & Prohibited Content</h2>
            <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 mb-4">
              <strong className="text-red-400 block mb-2">STRICT PORNOGRAPHY BAN</strong>
              <p className="text-sm">
                Aficionado strictly prohibits the uploading of adult or pornographic material. As a Creator, you assume full legal and financial liability for any content you upload. Uploading prohibited content will result in immediate termination of your account, forfeiture of any pending payouts, and potential legal action.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Revenue & Payouts</h2>
            <p>
              Creators earn revenue through Fan Subscriptions, Tips, and Drops. Aficionado takes a standard platform fee to cover transaction and hosting costs. Payouts are processed on a monthly schedule. 
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
