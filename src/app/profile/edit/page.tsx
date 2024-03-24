import Image from 'next/image';
import Link from 'next/link';
import SpotCardEdit from '~/components/spot-cards-edit';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
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
    <div className="relative p-4 flex flex-col gap-6 h-full min-h-screen">
      <header className="w-full flex justify-between">
        <Button variant="ghost" size="sm" className="font-normal text-sm" asChild>
          <Link href="/profile">Отмена</Link>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full font-bold text-sm">
          Готово
        </Button>
      </header>

      <div className="flex flex-col w-full items-center justify-center">
        <Image
          className="rounded-full overflow-hidden"
          src={`https://github.com/shadcn.png`}
          width={100}
          height={100}
          alt="avatar"
          draggable={false}
          objectFit="cover"
          loading="eager"
          quality={100}
        />
        <Button variant="link">Изменить фото</Button>
      </div>

      <div className="rounded-lg overflow-hidden">
        <Input
          className="rounded-none border-b-gray-light border-b"
          type="text"
          value="Женя Бондарь"
          label="Имя и фамилия"
        />
        <Input
          className="rounded-none"
          type="text"
          value="Дизайнер в Pelpy"
          label="Должность и место работы"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold">Споты</h2>
        <div className="flex flex-col gap-2">
          <SpotCardEdit list={SPOTS} />
          <Label>Вы можете выйти из спота, нажав на «минус»</Label>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <Input
          className="rounded-none border-b-gray-light border-b"
          type="text"
          value="@by_bondar"
          label="Телеграм"
        />
        <Input
          className="rounded-none border-b-gray-light border-b"
          type="text"
          value="+7 902 475 2100"
          label="Мобильный"
        />
        <Input
          className="rounded-none border-b-gray-light border-b"
          type="text"
          value="by_bondar@mail.ru"
          label="Э-почта"
        />
        <Textarea className="rounded-none resize-none" label="О себе" maxLength={500} />
      </div>

      <Button variant="link" size={'inline'} className="mt-auto self-start text-white/40">
        Удалить аккаунт
      </Button>
    </div>
  );
}
