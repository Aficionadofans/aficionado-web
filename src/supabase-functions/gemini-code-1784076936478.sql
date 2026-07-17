-- 1. Таблица подписок
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    fan_id UUID REFERENCES auth.users(id) NOT NULL,
    creator_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT NOT NULL, -- 'active', 'past_due', 'canceled'
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Таблица контента
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    mux_playback_id TEXT,
    visibility TEXT CHECK (visibility IN ('public', 'subscriber')) DEFAULT 'subscriber',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- 3. Политика для контента (Секретный соус безопасности)
CREATE POLICY "Fans can view content if active or in grace period" 
ON content 
FOR SELECT 
USING (
    visibility = 'public' 
    OR 
    auth.uid() = author_id 
    OR 
    EXISTS (
        SELECT 1 FROM subscriptions
        WHERE fan_id = auth.uid()
        AND creator_id = content.author_id
        AND (
            status = 'active'
            OR 
            -- Grace Period: если статус past_due, даем еще 48 часов после current_period_end
            (status = 'past_due' AND current_period_end + INTERVAL '48 hours' > NOW())
        )
    )
);