'use client'

import React, { useState, useTransition } from 'react'
import { createPortal } from 'react-dom'
import { User, Shield, CreditCard, DollarSign, Wallet, Plus, Trash2, Check, X, Lock, Sparkles, AlertCircle } from 'lucide-react'
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

export interface PaymentCard {
  id: string
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'
  last4: string
  expMonth: string
  expYear: string
  nameOnCard: string
  isDefault: boolean
}

function getCardBrand(number: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' {
  const clean = number.replace(/\D/g, '')
  if (/^4/.test(clean)) return 'visa'
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard'
  if (/^3[47]/.test(clean)) return 'amex'
  if (/^(6011|65|64[4-9])/.test(clean)) return 'discover'
  return 'unknown'
}

function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 16)
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) {
    return `${clean.slice(0, 2)}/${clean.slice(2)}`
  }
  return clean
}

function PaymentTab() {
  const [cards, setCards] = useState<PaymentCard[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAddCard = (newCard: PaymentCard) => {
    setCards(prev => {
      let updated = [...prev]
      if (newCard.isDefault || prev.length === 0) {
        updated = updated.map(c => ({ ...c, isDefault: false }))
        newCard.isDefault = true
      }
      return [...updated, newCard]
    })
    setIsAddModalOpen(false)
    setToastMessage('Payment method added successfully.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleDeleteCard = (id: string) => {
    setCards(prev => {
      const filtered = prev.filter(c => c.id !== id)
      if (filtered.length > 0 && !filtered.some(c => c.isDefault)) {
        filtered[0].isDefault = true
      }
      return filtered
    })
    setToastMessage('Payment method removed.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleSetDefault = (id: string) => {
    setCards(prev =>
      prev.map(c => ({
        ...c,
        isDefault: c.id === id,
      }))
    )
    setToastMessage('Default payment method updated.')
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Methods
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your saved credit and debit cards for subscriptions and tips.
          </p>
        </div>
        {cards.length > 0 && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-primary-foreground bg-primary transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ boxShadow: '0 0 16px rgba(0,212,200,0.25)' }}
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="mb-4 p-3 rounded-xl text-xs font-medium text-primary flex items-center gap-2 animate-fade-in-up"
          style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.25)' }}>
          <Check className="w-4 h-4 flex-shrink-0" />
          {toastMessage}
        </div>
      )}

      {cards.length === 0 ? (
        <div className="p-8 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(0,212,200,0.08)', border: '1px solid rgba(0,212,200,0.2)' }}>
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">No payment methods yet</h3>
          <p className="text-xs text-muted-foreground mb-5 max-w-sm mx-auto">
            Add a credit or debit card to subscribe to aficionados or send tips seamlessly.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
              boxShadow: '0 0 16px rgba(0,212,200,0.25)',
            }}
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map(card => (
            <div
              key={card.id}
              className="p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)]"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-8 rounded-md flex items-center justify-center font-bold text-[10px] uppercase tracking-wider text-foreground"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {card.brand}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground tracking-wide">
                      •••• •••• •••• {card.last4}
                    </span>
                    {card.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-primary"
                        style={{ background: 'rgba(0,212,200,0.12)', border: '1px solid rgba(0,212,200,0.3)' }}>
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.nameOnCard} · Expires {card.expMonth}/{card.expYear}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!card.isDefault && (
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.06)] transition-all"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  aria-label="Remove card"
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddCardModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCard={handleAddCard}
        />
      )}
    </div>
  )
}

function AddCardModal({
  isOpen,
  onClose,
  onAddCard,
}: {
  isOpen: boolean
  onClose: () => void
  onAddCard: (card: PaymentCard) => void
}) {
  const [nameOnCard, setNameOnCard] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [isDefault, setIsDefault] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Bleeding-edge keyboard listener (ESC to close)
  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const brand = getCardBrand(cardNumber)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanCard = cardNumber.replace(/\D/g, '')
    if (cleanCard.length < 15 || cleanCard.length > 16) {
      setError('Please enter a valid 15 or 16-digit card number.')
      return
    }

    if (!nameOnCard.trim()) {
      setError('Please enter the cardholder name.')
      return
    }

    const expParts = expiry.split('/')
    if (expParts.length !== 2 || !expParts[0] || !expParts[1] || expParts[0].length !== 2 || expParts[1].length !== 2) {
      setError('Please enter a valid expiration date (MM/YY).')
      return
    }

    const monthNum = parseInt(expParts[0], 10)
    if (monthNum < 1 || monthNum > 12) {
      setError('Expiration month must be between 01 and 12.')
      return
    }

    const cleanCvc = cvc.replace(/\D/g, '')
    if (cleanCvc.length < 3 || cleanCvc.length > 4) {
      setError('Please enter a valid 3 or 4-digit CVC code.')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      onAddCard({
        id: `card_${Date.now()}`,
        brand,
        last4: cleanCard.slice(-4),
        expMonth: expParts[0],
        expYear: expParts[1],
        nameOnCard: nameOnCard.trim(),
        isDefault,
      })
      setIsSubmitting(false)
    }, 400)
  }

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-card-dialog-title"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 relative overflow-hidden text-foreground animate-scale-up"
        style={{
          background: 'rgba(20, 22, 28, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,212,200,0.1)', border: '1px solid rgba(0,212,200,0.25)' }}>
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <h3 id="add-card-dialog-title" className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
              Add Payment Method
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.06)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card visual preview */}
        <div className="mb-5 p-4 rounded-xl relative overflow-hidden flex flex-col justify-between h-36"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,200,0.15) 0%, rgba(20,22,28,0.8) 100%)',
            border: '1px solid rgba(0,212,200,0.3)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Aficionado Card</span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground px-2 py-0.5 rounded bg-[rgba(255,255,255,0.1)]">
              {brand !== 'unknown' ? brand : 'Card'}
            </span>
          </div>

          <div className="font-mono text-base tracking-widest text-foreground my-auto">
            {cardNumber ? formatCardNumber(cardNumber) : '•••• •••• •••• ••••'}
          </div>

          <div className="flex justify-between items-end text-[11px] font-medium text-foreground/80">
            <div>
              <span className="block text-[9px] text-muted-foreground uppercase">Card Holder</span>
              <span className="uppercase">{nameOnCard || 'YOUR NAME'}</span>
            </div>
            <div>
              <span className="block text-[9px] text-muted-foreground uppercase">Expires</span>
              <span>{expiry || 'MM/YY'}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="card-name" className="text-xs font-medium text-foreground/80 block">Cardholder Name</label>
            <input
              id="card-name"
              type="text"
              required
              autoComplete="cc-name"
              value={nameOnCard}
              onChange={e => setNameOnCard(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full rounded-xl px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="card-number" className="text-xs font-medium text-foreground/80 block">Card Number</label>
            <div className="relative">
              <input
                id="card-number"
                type="text"
                required
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={19}
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4532 0000 0000 0000"
                className="w-full rounded-xl pl-3.5 pr-10 py-2.5 text-sm font-mono text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary uppercase">
                {brand !== 'unknown' && brand}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="card-expiry" className="text-xs font-medium text-foreground/80 block">Expires</label>
              <input
                id="card-expiry"
                type="text"
                required
                inputMode="numeric"
                autoComplete="cc-exp"
                maxLength={5}
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm font-mono text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="card-cvc" className="text-xs font-medium text-foreground/80 block">CVC / CVV</label>
              <input
                id="card-cvc"
                type="text"
                required
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                className="w-full rounded-xl px-3.5 py-2.5 text-sm font-mono text-foreground outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,200,0.15)]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="set-default-card"
              checked={isDefault}
              onChange={e => setIsDefault(e.target.checked)}
              className="rounded accent-primary w-4 h-4 cursor-pointer"
            />
            <label htmlFor="set-default-card" className="text-xs text-muted-foreground cursor-pointer">
              Set as default payment method
            </label>
          </div>

          {error && (
            <div className="p-3 rounded-xl text-xs text-destructive flex items-center gap-2"
              style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>256-bit SSL Encrypted</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  boxShadow: '0 0 14px rgba(0,212,200,0.25)',
                }}
              >
                {isSubmitting ? 'Saving Card…' : 'Save Card'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  const [mounted, setMounted] = useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof document === 'undefined') {
    return null
  }

  return createPortal(modalContent, document.body)
}


// ── Helpers ────────────────────────────────────────────────────────────────

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
