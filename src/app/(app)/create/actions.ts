'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const content = formData.get('content') as string
  const contentId = formData.get('content_id') as string | null

  // At least text or media must be provided
  if ((!content || content.trim().length === 0) && !contentId) {
    throw new Error('Post content cannot be empty')
  }

  const aiTone = formData.get('ai_tone') as string | null
  if (aiTone) {
    await supabase.from('profiles').update({ ai_tone: aiTone }).eq('id', user.id)
  }

  // If a content_id was provided, look up the mux_playback_id to use as media_url
  let mediaUrl: string | null = null
  if (contentId) {
    const { data: contentRecord } = await supabase
      .from('content')
      .select('mux_playback_id')
      .eq('id', contentId)
      .single()

    if (contentRecord?.mux_playback_id) {
      mediaUrl = `mux:${contentRecord.mux_playback_id}`
    }
  }

  const { error } = await supabase.from('posts').insert({
    author_id: user.id,
    content: content?.trim() || '',
    ...(mediaUrl && { media_url: mediaUrl }),
  })

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('Could not create post')
  }

  revalidatePath('/home')
  redirect('/home')
}
