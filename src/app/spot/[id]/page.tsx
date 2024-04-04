import Image from 'next/image';
import Link from 'next/link';
import { getSpot } from '~/actions/user-actions';
import ImageWithFallback from '~/components/image-with-fallback';
import InfoCards from '~/components/info-cards';
import PeopleList from '~/components/people-list';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { getServerAuthSession } from '~/server/auth';
import type { SpotSubscription } from '~/types/common';

export default async function SpotPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const spotInfo = await getSpot(id);
  const session = await getServerAuthSession();
  console.log(session);

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
    <div className="flex h-full min-h-dvh flex-shrink flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-1 text-ellipsis text-2xl font-bold">{spotInfo?.name}</h1>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/geotag.svg"
              alt="geo-icon"
              width={24}
              height={24}
              draggable={false}
            />
            <p className="line-clamp-1 text-ellipsis text-sm font-normal">{spotInfo?.location}</p>
          </div>
        </div>
        <Link href="/profile" passHref>
          <Avatar>
            <AvatarImage src={spotInfo?.image ?? undefined} />
            <AvatarFallback>{spotInfo?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
      </header>

      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-white/40">
        <ImageWithFallback
          src={spotInfo?.image ?? ''}
          fallback=""
          alt="place-image"
          fill
          draggable={false}
          className="object-cover"
        />
      </AspectRatio>

      <PeopleList list={(spotInfo?.subscriptions as SpotSubscription[]) ?? []} />

      <div className="flex-1" />

      <InfoCards />
      <Button className="w-full rounded-full" asChild>
        <Link href="/auth">Хочу общаться</Link>
      </Button>
    </div>
  );
}
