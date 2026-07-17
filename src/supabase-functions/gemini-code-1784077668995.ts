'use client';

import MuxPlayer from '@mux/mux-player-react';
import SubscribeButton from '@/components/subscribe-button';
import { Lock, Heart, MessageCircle, DollarSign } from 'lucide-react'; // icons

export default function PostCard({ post }: { post: any }) {
  // If visibility is subscriber-only but we didn't get a playback ID, 
  // it means RLS blocked access (user is not subscribed).
  const isLocked = post.visibility === 'subscriber' && !post.mux_playback_id;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      {/* 1. Header (Author Info) */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-800 rounded-full overflow-hidden">
          {post.profiles?.avatar_url && (
             <img src={post.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-zinc-100">@{post.profiles?.username}</h3>
          <p className="text-xs text-zinc-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* 2. Content Area (Media or Paywall) */}
      <div className="relative bg-black w-full aspect-square md:aspect-video flex items-center justify-center">
        {isLocked ? (
          // --- THE PAYWALL ---
          <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center p-6 text-center">
            <Lock className="w-12 h-12 text-zinc-400 mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Exclusive Content</h4>
            <p className="text-sm text-zinc-300 mb-6 max-w-sm">
              Subscribe to @{post.profiles?.username} to unlock this video and all other exclusive posts.
            </p>
            <SubscribeButton creatorId={post.author_id} priceId="price_YOUR_STRIPE_ID" />
          </div>
        ) : (
          // --- THE UNLOCKED MEDIA ---
          post.mux_playback_id ? (
            <MuxPlayer
              playbackId={post.mux_playback_id}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-8 text-zinc-400 text-center">
              Media is processing...
            </div>
          )
        )}
      </div>

      {/* 3. Footer (Actions & Description) */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button className="text-zinc-400 hover:text-rose-500 transition"><Heart className="w-6 h-6" /></button>
          <button className="text-zinc-400 hover:text-indigo-500 transition"><MessageCircle className="w-6 h-6" /></button>
          <button className="text-zinc-400 hover:text-emerald-500 transition ml-auto"><DollarSign className="w-6 h-6" /> Tip</button>
        </div>
        <h2 className="font-bold text-zinc-100 mb-1">{post.title}</h2>
        <p className="text-zinc-400 text-sm line-clamp-2">{post.description}</p>
      </div>
    </div>
  );
}