'use client';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { enterSpot, exitFromSpot, getUser } from '~/actions/user-actions';
import PeopleList from '~/components/people-list';
import TelegramMainButton from '~/components/telegram-main-button';
import { Button } from '~/components/ui/button';
import { imageLoader } from '~/lib/image-loader';
import type { Spot, User } from '~/types/common';

import Geotag from '~/assets/geotag.svg';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export default function Spot({ spot }: { spot: Spot }) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = WebApp.initDataUnsafe?.user;

  const [userData, setUserData] = useState<Omit<User, 'usersProfile'> | null>(null);
  const [isProfileFetching, setProfileFetching] = useState(false);
  const [isEnteringSpot, setEnteringSpot] = useState(false);

  useEffect(() => {
    WebApp.expand();
    WebApp.setBackgroundColor('#141516');
    WebApp.setHeaderColor('#000000');
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      setProfileFetching(true);
      const userData = await getUser(user?.id);
      setUserData(userData as Omit<User, 'usersProfile'>);
      setProfileFetching(false);
    };
    void fetchProfile();
  }, [user?.id]);

  const exitSpotHandler = async () => {
    if (!user?.id) return;
    setEnteringSpot(true);
    await exitFromSpot(user.id, id);
    setEnteringSpot(false);
  };

  const enterSpotHandler = async () => {
    if (userData) {
      setEnteringSpot(true);
      await enterSpot(Number(user?.id), id);
      setEnteringSpot(false);
    } else {
      router.push(`/auth/${id}/profile`);
    }
  };

  const isSubscribed = spot.subscriptions.some((sub) => sub.user?.id === user?.id);
  const showEnterButton = !isProfileFetching && !isSubscribed;

  return (
    <div className="flex h-full min-h-dvh flex-shrink flex-col gap-4 px-4 pb-2 pt-4">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-1 text-ellipsis text-2xl font-bold">{spot?.name}</h1>
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <Image src={Geotag} alt="geo-icon" width={24} height={24} draggable={false} />
            <p className="line-clamp-1 text-ellipsis text-sm font-normal">{spot?.location}</p>
          </div>
        </div>
        {userData && (
          <Link href={`/profile/${user?.id}`} passHref>
            <Avatar>
              <AvatarImage src={imageLoader({ src: userData.image ?? '', width: 48 })} />
              <AvatarFallback>{spot?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </header>

      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-white/40">
        <Image
          loader={imageLoader}
          src={spot?.image ?? ''}
          alt="place-image"
          fill
          draggable={false}
          className="object-cover"
        />
      </AspectRatio>

      <PeopleList list={spot?.subscriptions ?? []} authtorized={!!userData && isSubscribed} />

      <div className="flex-1 pb-4" />

      {/* <InfoCards /> */}
      {showEnterButton ? (
        <>
          <div className="fixed bottom-0 left-0 w-full text-center">
            <p className="py-2 text-white/40">
              {!!spot?.subscriptions.length
                ? 'Нажав на кнопку, ты увидишь подписчиков'
                : 'Нажав на кнопку, ты будешь первым на споте'}
            </p>
            <div className="absolute bottom-0 left-0 -z-10 h-12 w-full bg-gradient-to-t from-gray-dark from-80%" />
          </div>
          <TelegramMainButton
            text="Хочу общаться"
            onClick={enterSpotHandler}
            progress={isEnteringSpot}
          />
        </>
      ) : !isProfileFetching ? (
        <Button
          variant="link"
          size="inline"
          className="mt-auto self-start text-white/40"
          onClick={exitSpotHandler}
          disabled={isEnteringSpot}
        >
          Выйти со спота
        </Button>
      ) : null}
      {/* <Button className="w-full rounded-full" asChild>
        <Link href="/auth">Хочу общаться</Link>
      </Button> */}
    </div>
  );
}
