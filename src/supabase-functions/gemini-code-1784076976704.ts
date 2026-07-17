import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const mux = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playbackId = searchParams.get('playbackId');
  const contentId = searchParams.get('contentId');

  if (!playbackId || !contentId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Проверяем, есть ли доступ к контенту (RLS сделает всю работу за нас)
  const { data: content, error } = await supabase
    .from('content')
    .select('id')
    .eq('id', contentId)
    .single();

  if (error || !content) {
    return NextResponse.json({ error: 'Forbidden or Not Found' }, { status: 403 });
  }

  // Если RLS пропустил запрос, генерируем JWT токен для Mux (действителен 6 часов)
  const token = Mux.jwt.signPlaybackId(playbackId, {
    type: 'video',
    expiration: '6h',
    params: { token_claim: 'playback' }
  });

  return NextResponse.json({ token });
}