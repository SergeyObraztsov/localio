import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import type { SpotSubscription, SpotUser } from '~/types/common';

export default function PeopleList({ list }: { list: SpotSubscription[] }) {
  return (
    <div>
      <p className="font-bold">{list.length} подписчиков на споте</p>
      <ul>
        {list
          .filter((item) => !!item.user)
          .map((item) => (
            <PeopleListItem key={item.id} item={item.user!} />
          ))}
      </ul>
    </div>
  );
}

function PeopleListItem({ item }: { item: SpotUser }) {
  const name = item.name ?? '';
  return (
    <li className="flex items-center gap-4 overflow-auto">
      <Avatar>
        <AvatarImage src={item.image ?? undefined} />
        <AvatarFallback>
          {name.charAt(0)} {name.charAt(1)}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-1 border-b border-white/10 py-3">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs">{item.usersProfile?.position}</p>
      </div>
    </li>
  );
}
