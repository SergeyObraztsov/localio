'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import Steps from '~/components/steps';
import { Button } from '~/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';
import { AuthTabs } from '~/types/enums';
import { sendSmsWithCodeAgain } from '../../../actions/auth-actions';
import SubmitButton from '../submit-button';

export default function NumberCheckPage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [setTimeRemaining]);

  const sendSmsOtpAgain = async () => {
    setTimeRemaining(60);
    await sendSmsWithCodeAgain(userId);
  };

  const confirmOtp = async (formData: FormData) => {
    const schema = z.object({
      otp: z.string(),
      userId: z.string()
    });
    const parse = schema.safeParse({
      otp: formData.get('otp'),
      userId: formData.get('userId')
    });

    if (!parse.success) {
      const message = Object.values(parse.error.flatten().fieldErrors).join('; ') ?? '';
      setError(message);
      return;
    }

    const res = await signIn(
      'phone-login',
      { redirect: false, otp: parse.data.otp },
      { userId: parse.data.userId }
    );

    if (!res?.ok || res.error) {
      console.log(res);
      setError('Не удалось подтвердить код. Повторите попытку');
      return;
    }
    router.push(`/auth/${userId}/profile`);
  };

  return (
    <form
      className="relative flex h-full min-h-svh flex-shrink flex-col gap-4 p-4"
      action={confirmOtp}
    >
      <div className="flex w-full justify-between">
        <Button variant="ghost" size="icon" className="text-4xl" asChild>
          <Link href="/auth">&#8249;</Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-3xl" asChild>
          <Link href="/">&times;</Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold">Подтверждение</h1>

      <div className="flex w-full flex-1 flex-col items-start gap-2">
        <input type="text" value={userId} name="userId" hidden />
        <Label htmlFor="otp">Мы отправили на ваш номер 4-х значный шифр</Label>
        <InputOTP
          id="otp"
          maxLength={4}
          name="otp"
          render={({ slots }) => (
            <>
              <InputOTPGroup className={cn(!!error && 'text-red')}>
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
          <Button variant="link" size="inline" onClick={sendSmsOtpAgain}>
            Отправить сообщение еще раз
          </Button>
        )}
        {!!error && <Label className="pt-2 text-[10px] text-red">{error}</Label>}
      </div>

      <div className="sticky bottom-4 left-0 flex w-full flex-col gap-4">
        <div className="absolute -bottom-4 left-0 -z-10 h-[116px] w-full bg-gradient-to-t from-[#14151600] from-20%" />
        <div className="flex w-full justify-center">
          <Steps total={Object.keys(AuthTabs).length / 2} currentStepIndex={1} />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
