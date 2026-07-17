import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import WaitlistForm from './waitlist-form';
import { Sparkles, Lock, CheckCircle2 } from 'lucide-react';

export default async function VIPDropPage({ params }: { params: { username: string } }) {
  const supabase = createClient();

  // 1. Fetch the creator's profile
  const { data: creator } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio')
    .eq('username', params.username)
    .single();

  if (!creator) notFound();

  // 2. Count current subscribers to show social proof
  const { count } = await supabase
    .from('creator_waitlists')
    .select('*', { count: 'exact', head: true })
    .eq('creator_id', creator.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center backdrop-blur-xl shadow-2xl space-y-6">
        
        {/* Creator Avatar */}
        <div className="relative w-24 h-24 mx-auto">
          <img 
            src={creator.avatar_url || '/default-avatar.png'} 
            alt={creator.username} 
            className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
          />
          <span className="absolute bottom-0 right-0 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-zinc-900">
            <Sparkles className="w-3 h-3" /> VIP
          </span>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Join @{creator.username}'s VIP Circle
          </h1>
          <p className="text-sm text-zinc-400">
            {creator.bio || "I'm launching exclusive, behind-the-scenes content soon. Join the waitlist to get early access and 20% off my first drop."}
          </p>
        </div>

        {/* Social Proof Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {count || 0} fans already waiting
        </div>

        {/* The Interactive Form (Client Component) */}
        <WaitlistForm creatorId={creator.id} />

        {/* Perks list */}
        <div className="pt-4 border-t border-zinc-800/80 text-left space-y-2">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">VIP Perks Include:</p>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>20% off the first paid subscription drop</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Exclusive "Founding Fan" profile badge</span>
          </div>
        </div>

      </div>
    </div>
  );
}