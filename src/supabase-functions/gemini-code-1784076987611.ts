import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import MuxPlayer from '@mux/mux-player-react';
import { notFound } from 'next/navigation';

async function getContent(id: string) {
  const supabase = createServerComponentClient({ cookies });
  
  // RLS автоматически заблокирует запрос, если нет подписки или Grace Period истек
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data;
}

async function getMuxToken(playbackId: string, contentId: string) {
  // Вызываем наш API для подписи токена (в реальном приложении лучше вынести логику генерации в отдельную утилиту)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/mux/sign?playbackId=${playbackId}&contentId=${contentId}`);
  const data = await res.json();
  return data.token;
}

export default async function ContentPage({ params }: { params: { id: string } }) {
  const content = await getContent(params.id);

  if (!content) {
    // Пользователь увидит 404, если нет доступа или контента не существует
    notFound(); 
  }

  // Если контент приватный, получаем JWT токен
  let muxToken = undefined;
  if (content.visibility === 'subscriber' && content.mux_playback_id) {
    muxToken = await getMuxToken(content.mux_playback_id, content.id);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        {content.mux_playback_id ? (
          <MuxPlayer
            playbackId={content.mux_playback_id}
            tokens={{ playback: muxToken }}
            metadata={{
              video_title: content.title,
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Медиафайл обрабатывается...
          </div>
        )}
      </div>
    </div>
  );
}