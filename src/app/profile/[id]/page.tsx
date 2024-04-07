import Image from 'next/image';
import Link from 'next/link';
import { getUserProfile, getUserSpots } from '~/actions/user-actions';
import SpotCardList from '~/components/spot-cards-list';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import type { UserSpot } from '~/types/common';
import TelegramInput from './telegram-input';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getUserProfile(id);
  const spots = await getUserSpots(id);
  return (
    <div className="relative flex h-full min-h-dvh flex-shrink flex-col">
      <header className="absolute left-0 top-4 z-10 flex w-full justify-between px-4">
        <Button
          variant="transparent"
          className="rounded-full text-3xl font-light"
          size="icon"
          asChild
        >
          <Link href="/">&#8249;</Link>
        </Button>
        <Button variant="transparent" size="sm" className="rounded-full" asChild>
          <Link href={`/profile/${id}/edit`}>Редактировать</Link>
        </Button>
      </header>

      <AspectRatio ratio={1} className="relative w-full bg-white/10">
        <Image
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
        {!!spots.length && <SpotCardList list={spots as UserSpot[]} />}
        <div className="flex flex-col gap-4 px-4">
          <h2 className="font-bold">О себе</h2>
          <Input type="text" value={user?.usersProfile?.description ?? ''} readOnly />
        </div>
        <div className="flex flex-col gap-4 px-4">
          <h2 className="font-bold">Контакты в других соцсетях</h2>
          <div className="overflow-hidden rounded-lg">
            <TelegramInput />
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
