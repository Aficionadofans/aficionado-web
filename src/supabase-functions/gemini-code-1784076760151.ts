// app/content/[id]/page.tsx
async function ContentPage({ params }) {
  const content = await getProtectedContent(params.id); 
  // Функция проверяет RLS (права доступа) перед возвратом данных

  return (
    <div className="player-container">
      <MuxPlayer 
        playbackId={content.mux_playback_id}
        metadata={{
          video_title: content.title,
          viewer_user_id: currentUserId,
        }}
      />
    </div>
  );
}