// Концептуальная структура контента
interface Content {
  id: uuid;
  author_id: uuid;
  type: 'post' | 'media' | 'message';
  visibility: 'public' | 'subscriber_only' | 'ppv';
  price_ppv: decimal | null; // Если контент платный разово
  tier_required: int | null; // Какой уровень подписки нужен
  media_urls: string[]; // Массив ссылок на CDN
  status: 'published' | 'draft' | 'archived';
  metrics: {
    views: int;
    likes: int;
    tips_sum: decimal;
  };
}