-- Таблица контента
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id),
    title TEXT,
    description TEXT,
    mux_playback_id TEXT, -- ID для видеоплеера
    visibility TEXT CHECK (visibility IN ('public', 'subscriber', 'ppv')),
    required_tier INTEGER DEFAULT 0,
    price_ppv DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Поля для алгоритма ранжирования
    boost_factor FLOAT DEFAULT 1.0,
    engagement_score FLOAT DEFAULT 0.0
);

-- Индекс для ленты (для быстрого поиска)
CREATE INDEX idx_content_recent_rank ON content (created_at DESC, boost_factor DESC);