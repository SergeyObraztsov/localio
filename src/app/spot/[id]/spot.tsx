'use client';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfile } from '~/actions/user-actions';
import ImageWithFallback from '~/components/image-with-fallback';
import PeopleList from '~/components/people-list';
import TelegramMainButton from '~/components/telegram-main-button';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import type { Spot } from '~/types/common';

export default function Spot({ spot }: { spot: Spot }) {
  const userId = WebApp.initDataUnsafe.user?.id;
  const router = useRouter();

  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile(userId!);
      setHasProfile(!!profile);
    };
    if (userId) void fetchProfile();
  }, [userId]);

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
          <Link href="/profile" passHref>
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
      {!hasProfile ? (
        <>
          <p className="text-center text-white/40">Нажав на кнопку, ты увидишь подписчиков</p>
          <TelegramMainButton
            text="Хочу общаться"
            onClick={() => router.push(`/auth/${userId}/profile`)}
          />
        </>
      ) : null}
      {/* <Button className="w-full rounded-full" asChild>
        <Link href="/auth">Хочу общаться</Link>
      </Button> */}
    </div>
  );
}
