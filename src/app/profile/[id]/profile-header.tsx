'use client';
import WebApp from '@twa-dev/sdk';
import { BackButton } from '@twa-dev/sdk/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';

export default function ProfileHeader() {
  const { id } = useParams<{ id: string }>();
  const user = WebApp.initDataUnsafe?.user;
  const router = useRouter();
  const isMe = Number(id) === user?.id;
  return (
    <header className="absolute left-0 top-4 z-10 flex w-full justify-between px-4">
      <BackButton onClick={() => router.back()} />
      {/* <Button
        onClick={() => router.back()}
        variant="transparent"
        className="rounded-full text-3xl font-light"
        size="icon"
      >
        &#8249;
      </Button> */}
      <div className="flex-1"></div>
      {isMe && (
        <Button variant="transparent" size="sm" className="rounded-full" asChild>
          <Link href={`/profile/${id}/edit`}>Редактировать</Link>
        </Button>
      )}
    </header>
  );
}
