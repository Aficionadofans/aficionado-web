"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EnrollMFA({ onComplete }: { onComplete: () => void }) {
  const supabase = createClientComponentClient();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCodeUri, setQrCodeUri] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 1. Инициируем привязку фактора при монтировании
  useEffect(() => {
    async function startEnroll() {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "My Authenticator App",
      });

      if (error) {
        setError(error.message);
        return;
      }

      setFactorId(data.id);
      setQrCodeUri(data.totp.uri); // URI для генерации QR-кода
    }
    startEnroll();
  }, [supabase]);

  // 2. Верифицируем введенный пользователем код из приложения
  const handleVerify = async () => {
    if (!factorId) return;
    setError(null);

    // Создаем запрос-вызов (challenge)
    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
      setError(challenge.error.message);
      return;
    }

    // Проверяем код пользователя
    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code,
    });

    if (verify.error) {
      setError("Неверный код. Попробуйте еще раз.");
    } else {
      onComplete(); // Успешно подключено!
    }
  };

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl max-w-md mx-auto space-y-6">
      <h3 className="text-xl font-semibold">Настройка 2FA</h3>
      <p className="text-sm text-zinc-400">
        Сканируйте QR-код в вашем приложении аутентификации (Google Authenticator, Authy):
      </p>

      {qrCodeUri && (
        <div className="bg-white p-3 rounded-lg inline-block mx-auto">
          <QRCodeSVG value={qrCodeUri} size={200} />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs text-zinc-400 uppercase font-bold">Код подтверждения</label>
        <Input
          type="text"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-center text-lg tracking-widest"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button onClick={handleVerify} className="w-full bg-indigo-600 hover:bg-indigo-700">
        Подтвердить и включить
      </Button>
    </div>
  );
}