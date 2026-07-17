import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'; // Ваш админский клиент

// Конфигурация сканеров
const SIGHTENGINE_USER = process.env.SIGHTENGINE_USER!;
const SIGHTENGINE_SECRET = process.env.SIGHTENGINE_SECRET!;

export async function POST(req: Request) {
  const { contentId, mediaUrl, textPayload, type } = await req.json();
  const supabase = createClient(); // Используйте Service Role Key для записи!

  try {
    let nsfwScore = 0.0;
    let isFlagged = false;

    // ШАГ 1: Сканирование текста (заголовки, описание)
    if (textPayload) {
      const textRes = await fetch('https://api.openai.com/v1/moderations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ input: textPayload }),
      });
      const textData = await textRes.json();
      
      // OpenAI возвращает флаг true, если текст содержит sexual/minors/violence контент
      if (textData.results[0].categories.sexual) {
        isFlagged = true;
        nsfwScore = Math.max(nsfwScore, 0.9); // Форсируем высокий скор для текста
      }
    }

    // ШАГ 2: Сканирование визуального контента (Изображения или Кадры из видео)
    if (mediaUrl && !isFlagged) {
      // Для видео передаем URL первого кадра (thumbnail) из Mux
      const imageToScan = type === 'video' 
        ? `https://image.mux.com/${mediaUrl}/thumbnail.jpg?time=2` 
        : mediaUrl;

      const visualRes = await fetch(
        `https://api.sightengine.com/1.0/check.json?models=nudity-2.0&api_user=${SIGHTENGINE_USER}&api_secret=${SIGHTENGINE_SECRET}&url=${encodeURIComponent(imageToScan)}`
      );
      const visualData = await visualRes.json();

      if (visualData.status === 'success') {
        // Sightengine возвращает вероятность разных типов наготы
        const { safe, explicit } = visualData.nudity;
        // Нам интересна вероятность явного (explicit) контента
        nsfwScore = explicit; 
      }
    }

    // ШАГ 3: Применение матрицы решений
    let finalStatus = 'approved';
    
    if (nsfwScore > 0.85) {
      finalStatus = 'rejected';
      // Опционально: Запуск логики выдачи страйка автору
      await issueCreatorStrike(contentId, supabase);
    } else if (nsfwScore >= 0.50) {
      finalStatus = 'pending_review';
    }

    // ШАГ 4: Обновление статуса в базе данных
    await supabase
      .from('content')
      .update({ 
        moderation_status: finalStatus,
        nsfw_score: nsfwScore 
      })
      .eq('id', contentId);

    return NextResponse.json({ success: true, status: finalStatus, score: nsfwScore });

  } catch (error: any) {
    console.error('Moderation error:', error);
    // При падении сканера лучше отправить контент на ручное ревью, чтобы не пропустить порнографию
    await supabase.from('content').update({ moderation_status: 'pending_review' }).eq('id', contentId);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Вспомогательная функция для наказания злостных нарушителей
async function issueCreatorStrike(contentId: string, supabase: any) {
  // Получаем ID автора
  const { data } = await supabase.from('content').select('author_id').eq('id', contentId).single();
  if (data?.author_id) {
    // Увеличиваем счетчик страйков. Если больше 3 — блокировка аккаунта.
    await supabase.rpc('increment_creator_strike', { target_user_id: data.author_id });
  }
}