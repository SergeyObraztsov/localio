import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';
import type { SpotSubscription, SpotUser } from '~/types/common';

export default function PeopleList({
  list,
  isBlurred
}: {
  list: SpotSubscription[];
  isBlurred?: boolean;
}) {
  return (
    <div>
      <p className="font-bold">{list.length} подписчиков на споте</p>
      <ul>
        {list
          .filter((item) => !!item.user)
          .map((item) => (
            <PeopleListItem key={item.id} item={item.user!} isBlurred={isBlurred} />
          ))}
      </ul>
    </div>
  );
}

function PeopleListItem({ item, isBlurred }: { item: SpotUser; isBlurred?: boolean }) {
  const name = item.name ?? '';
  return (
    <Link href={`/profile/${item.id}`}>
      <li className="flex items-center gap-4">
        <Avatar className={cn(isBlurred && 'blur-sm')}>
          <AvatarImage src={item.image ?? undefined} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-1 border-b border-white/10 py-3">
          <p className={cn('select-none text-sm font-semibold', isBlurred && 'blur-sm')}>
            {item.name}
          </p>
          <p className="text-xs">{item.usersProfile?.position}</p>
        </div>
      </li>
    </Link>
  );
}
