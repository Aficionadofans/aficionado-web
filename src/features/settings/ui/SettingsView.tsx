'use client'

import React, { useState, useTransition } from 'react'
import { User, Shield, CreditCard, DollarSign, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/shared/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { SectionHeader } from '@/shared/ui/core'
import { RevealSection } from '@/shared/ui/motion/RevealSection'

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
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6 min-h-[80dvh] pb-20 md:pb-8">
      {/* Sidebar */}
      <aside className="w-full md:w-56 flex-shrink-0 animate-fade-in-up">
        <SectionHeader
          variant="editorial"
          number="01"
          label="ACCOUNT"
          title="Settings"
          icon={<User className="w-5 h-5" />}
          className="mb-4"
        />
        {userType && (
          <span className="inline-flex items-center px-3 py-1 rounded-full glass-pill border-primary/40 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            {userType === 'aficionado' ? 'Aficionado ✦' : 'Fan'}
          </span>
        )}
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:bg-[rgba(255,255,255,0.04)] hover:text-foreground',
              )}
              style={
                activeTab === tab.id
                  ? { background: 'rgba(0,212,200,0.08)', border: '1px solid rgba(0,212,200,0.25)' }
                  : { border: '1px solid transparent' }
              }
            >
              <div className={cn(
                'w-6 h-6 rounded-lg flex items-center justify-center transition-colors flex-shrink-0',
                activeTab === tab.id
                  ? 'bg-primary/15 text-primary'
                  : 'bg-[rgba(255,255,255,0.05)] text-muted-foreground',
              )}>
                {tab.icon}
              </div>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <RevealSection delay={100} className="flex-1">
        <main className="flex-1 trend-card rounded-[var(--radius-xl)] p-6 md:p-8 relative overflow-hidden">
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
      </RevealSection>
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
      <h2 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Profile Information
      </h2>
      <div className="space-y-5 max-w-md">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/75 block">Username</label>
          <input
            type="text"
            value={usernameVal}
            onChange={e => setUsernameVal(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
            placeholder="your_username"
            className="w-full rounded-[var(--radius-md)] px-3.5 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <p className="text-xs text-muted-foreground">Used for your public profile URL</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/75 block">Bio</label>
          <textarea
            rows={3}
            value={bioVal}
            onChange={e => setBioVal(e.target.value)}
            maxLength={300}
            placeholder="Tell your community about yourself…"
            className="w-full rounded-[var(--radius-md)] px-3.5 py-3 text-sm text-foreground outline-none transition-all duration-200 resize-none focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <p className="text-xs text-muted-foreground">{bioVal.length}/300</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/75 block">Zip Code</label>
          <input
            type="text"
            value={zipVal}
            onChange={e => setZipVal(e.target.value)}
            placeholder="12345"
            maxLength={10}
            className="w-full rounded-[var(--radius-md)] px-3.5 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <p className="text-xs text-muted-foreground">Required for local neighborhood communities</p>
        </div>

        {error && (
          <p className="text-xs text-destructive p-3 rounded-xl animate-fade-in-up"
            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
            {error}
          </p>
        )}
        {message && (
          <p className="text-xs text-primary p-3 rounded-xl animate-fade-in-up"
            style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.2)' }}>
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            boxShadow: '0 0 16px rgba(0,212,200,0.25)',
          }}
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
      if (err) setError(err.message)
      else setMessage('Password reset email sent. Check your inbox.')
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
      <h2 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Security &amp; Login
      </h2>
      <div className="space-y-5 max-w-md">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/75 block">Account Email</label>
          <input
            type="email"
            value={email ?? ''}
            readOnly
            className="w-full rounded-[var(--radius-md)] px-3.5 py-3 text-sm text-muted-foreground cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          />
        </div>

        {error && (
          <p className="text-xs text-destructive p-3 rounded-xl" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
            {error}
          </p>
        )}
        {message && (
          <p className="text-xs text-primary p-3 rounded-xl" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.2)' }}>
            {message}
          </p>
        )}

        <div className="space-y-2.5">
          <button
            onClick={handleResetPassword}
            disabled={isPending || !email}
            className="w-full px-5 py-2.5 rounded-full text-sm font-medium text-foreground transition-all duration-200 disabled:opacity-40 hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            {isPending ? 'Sending…' : 'Send Password Reset Email'}
          </button>
          <button
            onClick={handleSignOutAll}
            disabled={isPending}
            className="w-full px-5 py-2.5 rounded-full text-sm font-medium text-destructive transition-all duration-200 disabled:opacity-40 hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40"
            style={{ border: '1px solid rgba(244,63,94,0.3)' }}
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
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-monetization-glow)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <DollarSign className="w-4 h-4 text-[var(--color-monetization)]" />
        </div>
        Monetization Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Payout card — amber: payment context */}
        <div className="p-5 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-monetization)]/80">Available to Payout</span>
          <div className="text-4xl font-bold mt-1.5 mb-1 text-[var(--color-monetization)]" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            $0.00
          </div>
          <p className="text-xs text-muted-foreground mb-4">Connect Stripe to enable payouts</p>
          <button
            disabled
            className="w-full py-2 rounded-full text-xs font-semibold opacity-40 cursor-not-allowed"
            style={{ background: 'var(--color-monetization)', color: 'var(--color-monetization-foreground)' }}
          >
            Withdraw to Bank
          </button>
        </div>

        {/* Stripe card */}
        <div className="p-5 rounded-xl flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Stripe Account</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-primary" /> Not connected
            </span>
          </div>
          <button
            className="px-4 py-2 rounded-full text-xs font-semibold text-foreground transition-all hover:bg-[rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

function SubscriptionsTab() {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Active Subscriptions
      </h2>
      <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <StarIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No active subscriptions yet.</p>
      </div>
    </div>
  )
}

function PaymentTab() {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
        Payment Methods
      </h2>
      <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <CreditCard className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">No payment methods added yet.</p>
        <button
          className="px-5 py-2 rounded-full text-sm font-medium text-foreground hover:bg-[rgba(255,255,255,0.06)] transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        >
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
