'use client'

import React, { useState } from 'react'
import { User, Shield, CreditCard, DollarSign, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'profile' | 'subscriptions' | 'payment' | 'monetization' | 'security'

export function SettingsView({ userType, email }: { userType: 'aficionado' | 'fan' | null, email?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const fanTabs: { id: Tab, label: string, icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'subscriptions', label: 'Subscriptions', icon: <StarIcon className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ]

  const aficionadoTabs: { id: Tab, label: string, icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'monetization', label: 'Monetization', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ]

  const tabs = userType === 'fan' ? fanTabs : aficionadoTabs

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 min-h-[80dvh]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Display Name</label>
                <input type="text" defaultValue="Aficionado User" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Bio</label>
                <textarea rows={3} placeholder="Tell your fans about yourself..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 resize-none" />
              </div>
              <button className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'monetization' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-amber-500" /> Monetization Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
                <span className="text-sm font-medium text-amber-500/80">Available to Payout</span>
                <div className="text-4xl font-bold text-amber-500 mt-2">$2,450.00</div>
                <button className="mt-4 px-4 py-2 rounded-full bg-amber-500 text-black font-bold text-sm w-full hover:bg-amber-400">
                  Withdraw to Bank
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">Stripe Account</span>
                  <span className="text-white font-medium flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Connected
                  </span>
                </div>
                <button className="px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5">
                  Manage
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Active Subscriptions</h2>
            <div className="space-y-4">
              {/* Mock Subscription Item */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?u=fitness_guru" className="w-12 h-12 rounded-full" alt="" />
                  <div>
                    <h3 className="font-bold text-white">@fitness_guru</h3>
                    <p className="text-sm text-muted-foreground">VIP Inner Circle • $9.99/mo</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5">
                  Manage
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-4">No payment methods added.</p>
              <button className="px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                Add Card
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">Security & Login</h2>
            <div className="space-y-6 max-w-md">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Account Email</label>
                <input type="email" value={email || ''} readOnly className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
              </div>
              <div>
                <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
