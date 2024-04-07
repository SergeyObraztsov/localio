'use client';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { exitFromSpot, isUserCreated } from '~/actions/user-actions';
import ImageWithFallback from '~/components/image-with-fallback';
import PeopleList from '~/components/people-list';
import TelegramMainButton from '~/components/telegram-main-button';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import type { Spot } from '~/types/common';

export default function Spot({ spot }: { spot: Spot }) {
  const userId = WebApp.initDataUnsafe.user?.id;
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [hasProfile, setHasProfile] = useState(false);
  const [isProfileFetching, setProfileFetching] = useState(false);

  const fetchProfile = useCallback(async () => {
    setProfileFetching(true);
    const isCreated = await isUserCreated(userId!);
    setHasProfile(isCreated);
    setProfileFetching(false);
  }, [userId]);

  useEffect(() => {
    if (userId) void fetchProfile();
  }, [fetchProfile, userId]);

  const exitHandler = async () => {
    if (!userId) return;
    await exitFromSpot(userId, id);
    await fetchProfile();
  };

  return (
    <div className="flex h-full min-h-dvh flex-shrink flex-col gap-4 px-4 pb-2 pt-4">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-1 text-ellipsis text-2xl font-bold">{spot?.name}</h1>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/geotag.svg"
              alt="geo-icon"
              width={24}
              height={24}
              draggable={false}
            />
            <p className="line-clamp-1 text-ellipsis text-sm font-normal">{spot?.location}</p>
          </div>
        </div>
        {hasProfile && (
          <Link href={`/profile/${userId}`} passHref>
            <Avatar>
              <AvatarImage src={spot?.image ?? undefined} />
              <AvatarFallback>{spot?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </header>

      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-white/40">
        <ImageWithFallback
          src={spot?.image ?? ''}
          fallback=""
          alt="place-image"
          fill
          draggable={false}
          className="object-cover"
        />
      </AspectRatio>

      <PeopleList list={spot?.subscriptions ?? []} isBlurred={!hasProfile} />

      <div className="flex-1" />

      {/* <InfoCards /> */}
      {!hasProfile && !isProfileFetching ? (
        <>
          <p className="text-center text-white/40">Нажав на кнопку, ты увидишь подписчиков</p>
          <TelegramMainButton text="Хочу общаться" onClick={() => router.push(`/auth/profile`)} />
        </>
      ) : (
        <Button
          variant="link"
          size="inline"
          className="mt-auto self-start text-white/40"
          onClick={exitHandler}
        >
          Выйти со спота
        </Button>
      )}
      {/* <Button className="w-full rounded-full" asChild>
        <Link href="/auth">Хочу общаться</Link>
      </Button> */}
    </div>
  );
}
