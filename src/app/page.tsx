import { db } from '~/server/db';
import { getServerAuthSession } from '~/server/auth';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import PeopleList from '~/components/people-list';
import type { PeopleListItem } from '~/types/common';
import InfoCards from '~/components/info-cards';

const PEOPLES_ON_A_SPOT: PeopleListItem[] = [
  {
    id: 1,
    name: 'Женя Топычканова',
    job_title: 'PR — менеджер',
    imageSrc: 'https://github.com/shadcn.png'
  },
  {
    id: 2,
    name: 'Женя Топычканова',
    job_title: 'PR — менеджер',
    imageSrc: 'https://github.com/shadcn.png'
  },
  {
    id: 3,
    name: 'Женя Топычканова',
    job_title: 'PR — менеджер',
    imageSrc: 'https://github.com/shadcn.png'
  },
  {
    id: 4,
    name: 'Женя Топычканова',
    job_title: 'PR — менеджер',
    imageSrc: 'https://github.com/shadcn.png'
  }
];

export default async function Home() {
  const session = await getServerAuthSession();

  // if (!session) {
  //   return <div className="flex justify-center mt-10">Not logged in to see this</div>;
  // }

  // const user = await db.query.users.findFirst({
  //   where: (posts, { eq }) => eq(posts.id, Number(session.user.id))
  // });

  return (
    // <div className="flex flex-col items-center mt-10">
    //   <h1>{user?.username}</h1>
    //   <h1 className="truncate max-w-[300px]">{user?.image}</h1>
    //   <h1>{user?.id}</h1>
    //   <h1>{user?.createdAt.getTime()}</h1>
    // </div>
    <>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Мята Lounge</h1>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/geotag.svg"
              alt="geo-icon"
              width={24}
              height={24}
              draggable={false}
            />
            <p className="text-sm font-normal">пр. Ильюшина д. 5 к.1</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>

      <AspectRatio ratio={16 / 9}>
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="place-image"
          fill
          draggable={false}
          className="rounded-md object-cover"
        />
      </AspectRatio>

      <PeopleList list={PEOPLES_ON_A_SPOT} />
      <div className="flex-1"></div>
      <InfoCards />
      <Button className="rounded-full w-full">Хочу общаться</Button>
    </>
  );
}
