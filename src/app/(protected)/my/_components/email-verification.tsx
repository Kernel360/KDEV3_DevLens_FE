"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailVerificationProps {
  // email: string;
  disabled?: boolean;
}

export function EmailVerification({
  // email,
  disabled }: EmailVerificationProps) {
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleSendVerification = () => {
    // TODO: API 호출하여 인증 메일 발송
    setVerificationSent(true);
    setTimer(180);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleSendVerification}
          disabled={disabled || (verificationSent && timer > 0)}
        >
          인증 메일 발송
        </Button>
        {verificationSent && timer > 0 && (
          <span className="py-2 text-sm text-muted-foreground">
            {formatTime(timer)}
          </span>
        )}
      </div>
      {verificationSent && (
        <Input
          placeholder="인증번호 6자리를 입력해주세요"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          maxLength={6}
        />
      )}
    </div>
  );
}
