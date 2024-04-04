'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';

export default function SignOutButton() {
  const router = useRouter();
  const signOutHandler = async () => {
    await signOut();
    router.replace('/auth');
  };
  return (
    <Button
      variant="link"
      size={'inline'}
      className="mt-auto self-start text-white/40"
      onClick={signOutHandler}
    >
      Выйти из аккаунта
    </Button>
  );
}
