import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { PeopleListItem } from '~/types/common';

export default function PeopleList({ list }: { list: PeopleListItem[] }) {
  return (
    <div>
      <p className="font-bold">{list.length} подписчиков на споте</p>
      <ul>
        {list.map((item) => (
          <PeopleListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function PeopleListItem({ item }: { item: PeopleListItem }) {
  return (
    <li className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={item.imageSrc} />
        <AvatarFallback>{item.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full gap-2 border-b border-gray-light py-3">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs">{item.job_title}</p>
      </div>
    </li>
  );
}
