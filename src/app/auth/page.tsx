'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import Steps from '~/components/steps';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { FormState } from '~/types/common';
import { AuthTabs } from '~/types/enums';
import { sendSmsWithCode } from '../../actions/auth-actions';
import SubmitButton from './submit-button';

const initialState: FormState = {
  message: '',
  isSuccessful: false
};

export default function NumberPage() {
  const [state, formAction] = useFormState(sendSmsWithCode, initialState);

  return (
    <form
      className="relative flex h-full min-h-svh flex-shrink flex-col gap-4 p-4"
      action={formAction}
    >
      <div className="flex w-full justify-end">
        <Button variant="ghost" size="icon" className="text-3xl" asChild>
          <Link href="/">&times;</Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold">Регистрация</h1>

      <div className="flex w-full flex-1 flex-col items-start gap-2">
        <Label htmlFor="telephone">Введдите свой номер телефона</Label>
        <Input type="tel" id="telephone" name="telephone" placeholder="+7 900 000 00 00" required />
        <Label htmlFor="telephone">Мы пришлем вам код для продолжения регистрации</Label>
        {!state.isSuccessful && (
          <Label className="pt-2 text-[10px] text-red">{state.message}</Label>
        )}
      </div>

      <div className="sticky bottom-4 left-0 flex w-full flex-col gap-4">
        <div className="absolute -bottom-4 left-0 -z-10 h-[116px] w-full bg-gradient-to-t from-[#14151600] from-20%" />
        <div className="flex w-full justify-center">
          <Steps total={Object.keys(AuthTabs).length / 2} currentStepIndex={0} />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
