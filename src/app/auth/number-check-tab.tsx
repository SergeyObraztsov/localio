import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import type { AuthState } from '~/types/common';

type NumberCheckTabProps = {
  formState: AuthState;
};

export default function NumberCheckTab({ formState }: NumberCheckTabProps) {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setTimeRemaining]);

  return (
    <div className="flex flex-col items-start flex-1 w-full gap-2">
      <Label htmlFor="otp">Мы отправили на ваш номер 4-х значный шифр</Label>
      <InputOTP
        id="otp"
        maxLength={4}
        render={({ slots }) => (
          <>
            <InputOTPGroup className={cn(!formState.isSuccessful && 'text-red')}>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
          </>
        )}
      />
      {timeRemaining > 0 ? (
        <Label className="max-w-64 text-sm font-normal">
          Отправить сообщение еще раз можно через {timeRemaining} секунд
        </Label>
      ) : (
        <Button variant="link" size="inline">
          Отправить сообщение еще раз
        </Button>
      )}
      {!formState.isSuccessful && (
        <Label className="pt-2 text-red text-[10px]">{formState.message}</Label>
      )}
    </div>
  );
}
