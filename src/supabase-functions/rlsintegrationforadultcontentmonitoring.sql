-- Пользователи могут видеть контент ТОЛЬКО если он прошел модерацию
CREATE POLICY "Fans can view approved content" 
ON content 
FOR SELECT 
USING (
    moderation_status = 'approved' -- КРИТИЧЕСКОЕ УСЛОВИЕ
    AND
    (
        visibility = 'public' 
        OR 
        auth.uid() = author_id 
        OR 
        EXISTS (
            SELECT 1 FROM subscriptions
            WHERE fan_id = auth.uid()
            AND creator_id = content.author_id
            AND status = 'active'
        )
    )
);