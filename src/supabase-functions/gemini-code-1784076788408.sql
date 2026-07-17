-- Политика для таблицы content
CREATE POLICY "Пользователи могут видеть только контент, на который подписаны"
ON content
FOR SELECT
USING (
  -- 1. Если контент публичный
  visibility = 'public'
  OR 
  -- 2. ИЛИ если пользователь — автор контента
  auth.uid() = author_id
  OR
  -- 3. ИЛИ если у пользователя активная подписка на автора
  EXISTS (
    SELECT 1 FROM subscriptions
    WHERE subscriptions.fan_id = auth.uid()
    AND subscriptions.creator_id = content.author_id
    AND subscriptions.status = 'active'
    AND subscriptions.expires_at > NOW()
  )
);