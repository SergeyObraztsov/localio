import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getUserProfile, getUserSpots } from '~/actions/user-actions';
import SpotCardList from '~/components/spot-cards-list';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { imageLoader } from '~/lib/image-loader';
import type { UserSpot } from '~/types/common';

import TelegramIcon from '~/assets/telegram.svg';

const ProfileHeader = dynamic(() => import('./profile-header'), {
  ssr: false
});

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getUserProfile(Number(id));
  const spots = await getUserSpots(Number(id));
  return (
    <div className="relative flex h-full min-h-dvh flex-shrink flex-col">
      <ProfileHeader />

      <AspectRatio ratio={1} className="relative w-full bg-white/10">
        <Image
          loader={imageLoader}
          src={user?.image ?? ''}
          alt=""
          draggable={false}
          className="object-cover"
          fill
          loading="eager"
          quality={100}
        />
        <h1 className="absolute bottom-2 left-4 z-10 text-3xl font-bold">{user?.name}</h1>
        <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#141516] to-[#15161700]" />
      </AspectRatio>

      <main className="flex flex-col gap-6">
        <p className="px-4">{user?.usersProfile?.position}</p>
        <Button className="mx-4 rounded-full bg-[#3290EC] font-light hover:bg-[#3290EC]/90" asChild>
          <a href={`https://t.me/${user?.telegramUsername}`} rel="noreferrer" target="_blank">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <Image src={TelegramIcon} alt={''} width={21} height={17} className="mr-2" />
            Написать в Телеграм
          </a>
        </Button>
        {!!spots.length && <SpotCardList list={spots as UserSpot[]} />}

        <div className="flex flex-col gap-4 px-4">
          <h2 className="font-bold">О себе</h2>
          <div className="h-fit resize-none rounded-lg bg-white/10 px-3 py-2 text-sm">
            <p className="whitespace-pre-line">{user?.usersProfile?.description ?? ''}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4">
          <h2 className="font-bold">Контакты в других соцсетях</h2>
          <div className="overflow-hidden rounded-lg">
            <Input
              type="text"
              readOnly
              className="rounded-none border-b border-b-white/10 read-only:border-b"
              label="Телеграм"
              defaultValue={'@' + (user?.telegramUsername ?? '')}
            />
            <Input
              type="text"
              readOnly
              className="rounded-none"
              label="Мобильный"
              value={user?.phoneNumber ?? ''}
            />
          </div>
        </div>
        <div className="px-4 pb-4">{/* <SignOutButton /> */}</div>
      </main>
    </div>
  );
}
