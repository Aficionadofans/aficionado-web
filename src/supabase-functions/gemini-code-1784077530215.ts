'use client';

import { useState } from 'react';

interface SubscribeButtonProps {
  creatorId: string;
  priceId: string; // Захардкодьте или получайте из БД
}

export default function SubscribeButton({ creatorId, priceId }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creatorId, priceId }),
      });

      const { url, error } = await res.json();

      if (error) throw new Error(error);
      
      // Перенаправляем на Stripe Checkout
      if (url) window.location.href = url;
      
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Что-то пошло не так. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
    >
      {loading ? 'Загрузка...' : 'Подписаться на автора'}
    </button>
  );
}