"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MFAGate({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const [isReady, setIsReady] = useState(false);
  const [showMFAScreen, setShowMFAScreen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkMFA() {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      
      if (error) {
        setIsReady(true);
        return;
      }

      // Если уровень ассюранса может быть повышен до aal2, заставляем пройти проверку
      if (data.nextLevel === "aal2" && data.nextLevel !== data.currentLevel) {
        setShowMFAScreen(true);
      }
      setIsReady(true);
    }
    checkMFA();
  }, [supabase]);

  const handleChallengeVerify = async () => {
    setError(null);
    const factors = await supabase.auth.mfa.listFactors();
    
    if (factors.error || !factors.data.totp[0]) {
      setError("Факторы безопасности не найдены.");
      return;
    }

    const factorId = factors.data.totp[0].id;
    const challenge = await supabase.auth.mfa.challenge({ factorId });

    if (challenge.error) {
      setError(challenge.error.message);
      return;
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code,
    });

    if (verify.error) {
      setError("Неверный код безопасности.");
    } else {
      setShowMFAScreen(false); // Сессия повышена до aal2, открываем доступ к сайту
    }
  };

  if (!isReady) return <div className="min-h-screen bg-zinc-950" />;

  if (showMFAScreen) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-center">Требуется двухэтапный вход</h2>
          <p className="text-sm text-zinc-400 text-center">
            Введите одноразовый код из приложения для подтверждения вашей личности.
          </p>
          <Input
            type="text"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-center text-lg tracking-widest bg-zinc-800 border-zinc-700"
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button onClick={handleChallengeVerify} className="w-full bg-indigo-600 hover:bg-indigo-700">
            Подтвердить
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}