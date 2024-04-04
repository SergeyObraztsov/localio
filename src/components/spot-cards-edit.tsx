'use client';
import Image from 'next/image';
import type { UserSpot } from '~/types/common';
import { Button } from './ui/button';

export default function SpotCardEdit({ list }: { list: UserSpot[] }) {
  return (
    <div className="w-full overflow-hidden rounded-lg">
      {list.map((item) => (
        <SpotRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function SpotRow({ item }: { item: UserSpot }) {
  return (
    <div className="flex w-full items-center gap-3 border-b border-white/15 bg-white/10 px-3 py-2 last:border-none">
      <Image src={item.spot.types.image ?? ''} alt="" width={32} height={32} />
      <div className="flex flex-col gap-1">
        <h3 className="text-sm">{item.spot.name}</h3>
        <p className="text-[10px] text-white/40">{item.spot.location}</p>
      </div>
      <Button variant="ghost" size="icon" className="flex-1 justify-end">
        <Image src="/icons/Delete.svg" alt="" width={24} height={24} />
      </Button>
    </div>
  );
}
