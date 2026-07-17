import { createClient } from '@/lib/supabase/server';
import PostCard from '@/components/feed/post-card';
import { redirect } from 'next/navigation';

export default async function FeedPage() {
  const supabase = createClient();

  // 1. Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  // 2. Fetch posts. 
  // RLS ensures they only get full data for creators they subscribe to.
  const { data: posts, error } = await supabase
    .from('content')
    .select(`
      id,
      title,
      description,
      visibility,
      mux_playback_id,
      created_at,
      author_id,
      profiles ( username, avatar_url )
    `)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    return <div className="p-4 text-red-500">Failed to load feed.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold text-zinc-100 mb-6">Your Feed</h1>
      
      {posts.length === 0 ? (
        <div className="text-zinc-400 text-center py-12">
          You aren't following anyone yet. Discover creators!
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}