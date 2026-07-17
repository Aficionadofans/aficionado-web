'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRight, Check } from 'lucide-react';

export default function WaitlistForm({ creatorId }: { creatorId: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const { error } = await supabase
      .from('creator_waitlists')
      .insert([{ creator_id: creatorId, fan_email: email.toLowerCase().trim() }]);

    if (error) {
      if (error.code === '23505') { // Postgres unique constraint violation
        setErrorMessage("You're already on the VIP list!");
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
        <Check className="w-5 h-5" />
        You're on the list! Check your inbox soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Enter your email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1.5 shrink-0 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Joining...' : 'Join VIP'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-rose-400 text-left pl-1">{errorMessage}</p>
      )}
    </form>
  );
}