'use client';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import Steps from '~/components/steps';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { sendSmsWithCode } from './actions';
import { AuthTabs } from '~/types/enums';
import type { AuthState } from '~/types/common';
import NumberTab from './number-tab';
import NumberCheckTab from './number-check-tab';
import ProfileTab from './profile-tab';

const TITLES = {
  [AuthTabs.number]: 'Регистрация',
  [AuthTabs.numberCheck]: 'Подтверждение',
  [AuthTabs.profile]: 'Расскажите о себе'
};

const initialState: AuthState = {
  message: '',
  isSuccessful: false,
  tab: AuthTabs.number
};

export default function AuthPage() {
  const [state, formAction] = useFormState(sendSmsWithCode, initialState);
  const title = TITLES[state.tab] ?? '';

  const currentTab = useMemo(() => {
    switch (state.tab) {
      case AuthTabs.number:
        return <NumberTab formState={state} />;
      case AuthTabs.numberCheck:
        return <NumberCheckTab formState={state} />;
      case AuthTabs.profile:
        return <ProfileTab formState={state} />;
      default:
        return null;
    }
  }, [state]);

  return (
    <form className="flex flex-col flex-shrink h-full min-h-screen p-4 gap-4" action={formAction}>
      <div className="flex w-full justify-between">
        {state.tab !== AuthTabs.number ? (
          <Button variant="ghost" size="icon">
            &#8249;
          </Button>
        ) : (
          <div />
        )}
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">&times;</Link>
        </Button>
      </div>

      <h1 className="font-bold text-2xl">{title}</h1>

      {currentTab}

      <div className="flex justify-center w-full">
        <Steps total={3} currentStepIndex={state.tab} />
      </div>
      <Button type="submit" className="rounded-full w-full">
        Далее
      </Button>
    </form>
  );
}
