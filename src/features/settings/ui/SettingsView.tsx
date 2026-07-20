'use client'

import React, { useState, useTransition } from 'react'
import { User, Shield, CreditCard, DollarSign, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/shared/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Tab = 'profile' | 'subscriptions' | 'payment' | 'monetization' | 'security'

interface SettingsViewProps {
  userType: 'aficionado' | 'fan' | null
  email?: string
  username?: string
  bio?: string
  avatarUrl?: string
  zipCode?: string
}

export function SettingsView({ userType, email, username, bio, avatarUrl, zipCode }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const fanTabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'subscriptions', label: 'Subscriptions', icon: <StarIcon className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ]

  const aficionadoTabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'monetization', label: 'Monetization', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ]

  const tabs = userType === 'fan' ? fanTabs : aficionadoTabs

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 min-h-[80dvh] pb-20 md:pb-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 animate-fade-in-up">
        <h1 className="text-3xl font-black text-off-white mb-6 tracking-tight drop-shadow-md">Settings</h1>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                activeTab === tab.id
                  ? 'liquid-glass border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-off-white'
              )}
            >
              <div className={cn(
                'w-7 h-7 rounded-xl flex items-center justify-center transition-colors',
                activeTab === tab.id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-white/5 text-muted-foreground'
              )}>
                {tab.icon}
              </div>
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 liquid-glass rounded-3xl p-6 md:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
        {activeTab === 'profile' && (
          <ProfileTab
            username={username}
            bio={bio}
            zipCode={zipCode}
          />
        )}
        {activeTab === 'monetization' && <MonetizationTab />}
        {activeTab === 'subscriptions' && <SubscriptionsTab />}
        {activeTab === 'payment' && <PaymentTab />}
        {activeTab === 'security' && <SecurityTab email={email} />}
      </main>
    </div>
  )
}

// ── Profile Tab ────────────────────────────────────────────────────────────

function ProfileTab({ username, bio, zipCode }: { username?: string; bio?: string; zipCode?: string }) {
  const [usernameVal, setUsernameVal] = useState(username ?? '')
  const [bioVal, setBioVal] = useState(bio ?? '')
  const [zipVal, setZipVal] = useState(zipCode ?? '')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSave = () => {
    setMessage('')
    setError('')

    if (usernameVal && !/^[a-z0-9_]{3,30}$/.test(usernameVal)) {
      setError('Username: 3–30 chars, letters/numbers/underscores only')
      return
    }
    if (zipVal && !/^\d{5}(-\d{4})?$/.test(zipVal)) {
      setError('Invalid zip code format')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: err } = await supabase.auth.updateUser({
        data: {
          ...(usernameVal ? { username: usernameVal } : {}),
          ...(zipVal ? { zip_code: zipVal } : {}),
        },
      })
      // Also update profiles table directly
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').update({
          bio: bioVal,
          ...(usernameVal ? { username: usernameVal } : {}),
          ...(zipVal ? { zip_code: zipVal } : {}),
        }).eq('id', user.id)
      }

      if (err) {
        setError(err.message)
      } else {
        setMessage('Profile updated successfully.')
      }
    })
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-black text-off-white mb-6 tracking-tight">Profile Information</h2>
      <div className="space-y-6 max-w-md">
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Username</label>
          <input
            type="text"
            value={usernameVal}
            onChange={e => setUsernameVal(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            placeholder="your_username"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400 transition-all text-sm font-medium"
          />
          <p className="text-xs text-muted-foreground mt-1.5">Used for your public profile URL</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Bio</label>
          <textarea
            rows={3}
            value={bioVal}
            onChange={e => setBioVal(e.target.value)}
            maxLength={300}
            placeholder="Tell your community about yourself…"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400 transition-all text-sm font-medium resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1.5">{bioVal.length}/300</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Zip Code</label>
          <input
            type="text"
            value={zipVal}
            onChange={e => setZipVal(e.target.value)}
            placeholder="12345"
            maxLength={10}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400 transition-all text-sm font-medium"
          />
          <p className="text-xs text-muted-foreground mt-1.5">Used for local neighborhood communities</p>
        </div>

        {error && <p className="text-destructive text-xs sm:text-sm font-semibold p-3.5 bg-destructive/10 border border-destructive/20 rounded-2xl animate-fade-in-up">{error}</p>}
        {message && <p className="text-primary text-xs sm:text-sm font-semibold p-3.5 bg-primary/10 border border-primary/20 rounded-2xl animate-fade-in-up">{message}</p>}

        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold hover:bg-amber-400 transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

// ── Security Tab ───────────────────────────────────────────────────────────

function SecurityTab({ email }: { email?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleResetPassword = () => {
    if (!email) return
    startTransition(async () => {
      const supabase = createClient()
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      if (err) {
        setError(err.message)
      } else {
        setMessage('Password reset email sent. Check your inbox.')
      }
    })
  }

  const handleSignOutAll = () => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut({ scope: 'global' })
      router.replace('/login')
    })
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-black text-off-white mb-6 tracking-tight">Security &amp; Login</h2>
      <div className="space-y-6 max-w-md">
        <div>
          <label className="text-sm font-semibold text-muted-foreground block mb-2">Account Email</label>
          <input
            type="email"
            value={email ?? ''}
            readOnly
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-off-white/50 cursor-not-allowed text-sm font-medium"
          />
        </div>

        {error && <p className="text-destructive text-xs sm:text-sm font-semibold p-3.5 bg-destructive/10 border border-destructive/20 rounded-2xl animate-fade-in-up">{error}</p>}
        {message && <p className="text-primary text-xs sm:text-sm font-semibold p-3.5 bg-primary/10 border border-primary/20 rounded-2xl animate-fade-in-up">{message}</p>}

        <div className="space-y-3">
          <button
            onClick={handleResetPassword}
            disabled={isPending || !email}
            className="w-full px-6 py-3.5 rounded-full border border-white/20 text-off-white font-bold hover:bg-white/10 transition-all duration-300 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isPending ? 'Sending…' : 'Send Password Reset Email'}
          </button>
          <button
            onClick={handleSignOutAll}
            disabled={isPending}
            className="w-full px-6 py-3.5 rounded-full border border-destructive/40 text-destructive font-bold hover:bg-destructive/15 transition-all duration-300 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
          >
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Monetization Tab ───────────────────────────────────────────────────────

function MonetizationTab() {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-black text-off-white mb-6 flex items-center gap-2 tracking-tight">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-amber-400" />
        </div>
        <span>Monetization Dashboard</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-3xl shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400/90">Available to Payout</span>
          <div className="text-4xl font-black text-amber-400 mt-2">$0.00</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Connect Stripe to enable direct payouts</p>
          <button className="mt-5 px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-widest w-full hover:bg-amber-400 transition-all opacity-50 cursor-not-allowed" disabled>
            Withdraw to Bank
          </button>
        </div>
        <div className="liquid-glass border border-white/10 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">Stripe Account</span>
            <span className="text-off-white font-semibold flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4 text-bio-teal" /> Not connected
            </span>
          </div>
          <button className="px-5 py-2.5 rounded-full border border-white/20 text-off-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Subscriptions Tab ──────────────────────────────────────────────────────

function SubscriptionsTab() {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-black text-off-white mb-6 tracking-tight">Active Subscriptions</h2>
      <div className="p-8 rounded-3xl liquid-glass border border-white/10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
          <StarIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm font-medium">No active subscriptions yet.</p>
      </div>
    </div>
  )
}

// ── Payment Tab ────────────────────────────────────────────────────────────

function PaymentTab() {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-black text-off-white mb-6 tracking-tight">Payment Methods</h2>
      <div className="p-8 rounded-3xl liquid-glass border border-white/10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm mb-5 font-medium">No payment methods added.</p>
        <button className="px-6 py-2.5 rounded-full bg-off-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Add Card
        </button>
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
