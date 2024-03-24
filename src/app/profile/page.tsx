import Image from 'next/image';
import Link from 'next/link';
import SpotCardList from '~/components/spot-cards-list';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import type { SpotListItem } from '~/types/common';

const SPOTS: SpotListItem[] = [
  {
    id: 1,
    name: 'МилзБук',
    imageSrc: '/icons/Book.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 2,
    name: 'МилзВорк',
    imageSrc: '/icons/Laptop.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 3,
    name: 'МилзКоффи',
    imageSrc: '/icons/Coffee.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 4,
    name: 'МилзКоффи',
    imageSrc: '/icons/Coffee.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 5,
    name: 'МилзКоффи',
    imageSrc: '/icons/Coffee.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 6,
    name: 'МилзКоффи',
    imageSrc: '/icons/Coffee.svg',
    location: 'Ул. Пушкина, д. 69'
  },
  {
    id: 7,
    name: 'МилзКоффи',
    imageSrc: '/icons/Coffee.svg',
    location: 'Ул. Пушкина, д. 69'
  }
];

export default function ProfilePage() {
  return (
    <div className="relative flex flex-col flex-shrink h-full min-h-screen">
      <header className="absolute px-4 top-4 left-0 w-full flex justify-between z-10">
        <Button
          variant="transparent"
          className="rounded-full text-3xl font-light"
          size="icon"
          asChild
        >
          <Link href="/">&#8249;</Link>
        </Button>
        <Button variant="transparent" size="sm" className="rounded-full" asChild>
          <Link href="/profile/edit">Редактировать</Link>
        </Button>
      </header>

      <AspectRatio ratio={1} className="w-full relative">
        <Image
          src={`https://github.com/shadcn.png`}
          alt="avatar"
          draggable={false}
          objectFit="cover"
          layout="fill"
          loading="eager"
          quality={100}
        />
        <h1 className="font-bold text-3xl absolute bottom-2 left-4 z-10">Женя Бондарь</h1>
        <div className="w-full h-16 absolute bottom-0 left-0 bg-gradient-to-t from-[#141516] to-[#15161700]" />
      </AspectRatio>

      <main className="flex flex-col gap-6 px-4">
        <p>Дизайнер интерфейсов в Pelpy</p>
        <SpotCardList list={SPOTS} />
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">О себе</h2>
          <Input type="text" value="Тестировщик Локалио" readOnly />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">Контакты в других соцсетях</h2>
          <div className="rounded-lg overflow-hidden">
            <Input
              type="text"
              readOnly
              className="rounded-none border-b-gray-light border-b"
              label="Телеграм"
              value="@by_bondar"
            />
            <Input
              type="text"
              readOnly
              className="rounded-none"
              label="Мобильный"
              value="+7 902 475 2100"
            />
          </div>
        </div>
        <Button variant="link" size={'inline'} className="mt-auto self-start text-white/40">
          Выйти из аккаунта
        </Button>
      </main>
    </div>
  );
}
