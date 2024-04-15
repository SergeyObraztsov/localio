'use client';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { imageLoader } from '~/lib/image-loader';
import { cn, morph } from '~/lib/utils';
import type { SpotSubscription, SpotUser } from '~/types/common';

export default function PeopleList({
  list,
  authtorized
}: {
  list: SpotSubscription[];
  authtorized?: boolean;
}) {
  const router = useRouter();
  const clickHandler = (id?: number) => {
    if (!authtorized || !id) return;
    router.push(`/profile/${id}`);
  };

  return (
    <div>
      <p className="font-bold">
        {list.length} {morph(list.length, ['подписчик', 'подписчика', 'подписчиков'])} на споте
      </p>
      <ul>
        {list
          .filter((item) => !!item.user)
          .map((item) => (
            <PeopleListItem
              key={item.id}
              item={item.user!}
              authtorized={authtorized}
              onClick={() => clickHandler(item.user?.id)}
            />
          ))}
      </ul>
    </div>
  );
}

function PeopleListItem({
  item,
  authtorized,
  onClick
}: {
  item: SpotUser;
  authtorized?: boolean;
  onClick: () => void;
}) {
  const name = item.name ?? '';
  return (
    <li onClick={onClick} className="flex items-center gap-4">
      <Avatar className={cn(!authtorized && 'blur-sm')}>
        <AvatarImage src={imageLoader({ src: item.image ?? '', width: 48 })} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-1 border-b border-white/10 py-3">
        <p className={cn('select-none text-sm font-semibold', !authtorized && 'blur-sm')}>
          {item.name}
        </p>
        <p className="text-xs">{item.usersProfile?.position}</p>
      </div>
    </li>
  );
}
