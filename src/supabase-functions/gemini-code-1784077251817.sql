-- Применяем строгую политику для финансовой таблицы кошельков авторов
CREATE POLICY "Enforce MFA for wallet access"
ON creator_wallets
AS RESTRICTIVE -- Пометка RESTRICTIVE заставляет СУБД проверять это правило НАД остальными
TO authenticated
USING (
  -- Проверяем, что в текущем JWT-токене уровень аутентификации равен aal2
  (select auth.jwt()->>'aal') = 'aal2'
);