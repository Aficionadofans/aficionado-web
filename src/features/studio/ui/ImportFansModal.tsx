'use client'

import React, { useState, useRef } from 'react'
import { X, UploadCloud, Link as LinkIcon, CheckCircle2, Users, ArrowRight } from 'lucide-react'
import { processFanImport } from '@/app/(app)/creator/actions/invite'

interface ImportFansModalProps {
  onClose: () => void
  username: string
}

export function ImportFansModal({ onClose, username }: ImportFansModalProps) {
  const [activeTab, setActiveTab] = useState<'csv' | 'link'>('csv')
  const [isUploading, setIsUploading] = useState(false)
  const [parsedEmails, setParsedEmails] = useState<{ email: string; name: string }[]>([])
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Custom link states
  const [sourceName, setSourceName] = useState('patreon')
  const [copied, setCopied] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      if (!text) return

      // Simple CSV parser (no dependencies)
      const lines = text.split('\n')
      const emails: { email: string; name: string }[] = []
      
      lines.forEach(line => {
        const parts = line.split(',')
        if (parts.length > 0) {
          // Look for an email-like string in the parts
          const emailPart = parts.find(p => p.includes('@') && p.includes('.'))?.trim()
          if (emailPart) {
            // Assume the first part might be a name if it's not the email
            const namePart = parts.find(p => p !== emailPart)?.trim() || ''
            emails.push({ email: emailPart.replace(/["']/g, ''), name: namePart.replace(/["']/g, '') })
          }
        }
      })

      setParsedEmails(emails)
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (parsedEmails.length === 0) return
    if (parsedEmails.length > 500) {
      alert('Maximum 500 fans can be imported at once to prevent spam. Please split your CSV into smaller files.')
      return
    }
    setImportStatus('importing')

    try {
      await processFanImport(parsedEmails, 'csv')
      setImportStatus('success')
    } catch (err) {
      console.error(err)
      setImportStatus('idle')
      alert(err instanceof Error ? err.message : 'Failed to import fans. Please try again.')
    }
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${username}?source=${encodeURIComponent(sourceName.toLowerCase())}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0f1115] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Import Fans</h2>
            <p className="text-sm text-muted-foreground mt-1">Migrate your audience to Aficionado</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 gap-6 border-b border-white/5">
          <button
            onClick={() => setActiveTab('csv')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'csv' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-white'
            }`}
          >
            CSV Import
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'link' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-white'
            }`}
          >
            Custom Link
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'csv' ? (
            <div className="flex flex-col gap-6">
              {importStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Import Successful!</h3>
                  <p className="text-muted-foreground mb-6">Successfully imported {parsedEmails.length} fans. They have been added to your invites list.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : parsedEmails.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Preview</span>
                      <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">{parsedEmails.length} fans found</span>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                      {parsedEmails.slice(0, 10).map((u, i) => (
                        <div key={i} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                          <span className="text-white truncate">{u.email}</span>
                          <span className="text-muted-foreground truncate max-w-[100px]">{u.name}</span>
                        </div>
                      ))}
                      {parsedEmails.length > 10 && (
                        <div className="text-xs text-muted-foreground text-center pt-2">
                          + {parsedEmails.length - 10} more
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setParsedEmails([])}
                      className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm"
                      disabled={importStatus === 'importing'}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImport}
                      className="flex-[2] py-3 px-4 rounded-xl bg-primary text-black font-bold hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2"
                      disabled={importStatus === 'importing'}
                    >
                      {importStatus === 'importing' ? 'Importing...' : 'Confirm & Invite'}
                      {importStatus !== 'importing' && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Upload CSV File</h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    Import your Patreon, Substack, or generic email list. Must contain an email column.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-muted-foreground">
                Generate a unique referral link to share with your audience. We'll show a personalized welcome message based on the source.
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Traffic Source</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    placeholder="e.g. patreon, twitter, newsletter"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Custom Link</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/70 font-mono truncate select-all">
                    aficionado.fans/{username}?source={encodeURIComponent(sourceName.toLowerCase())}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all flex-shrink-0 border border-white/5"
                    title="Copy to clipboard"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <LinkIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
