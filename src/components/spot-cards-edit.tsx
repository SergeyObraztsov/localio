'use client';
import Image from 'next/image';
import type { SpotListItem } from '~/types/common';
import { Button } from './ui/button';

export default function SpotCardEdit({ list }: { list: SpotListItem[] }) {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      {list.map((item) => (
        <SpotRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function SpotRow({ item }: { item: SpotListItem }) {
  return (
    <div className="w-full flex items-center gap-3 py-2 px-3 border-b border-white/15 bg-gray-light last:border-none">
      <Image src={item.imageSrc} alt="" width={32} height={32} />
      <div className="flex flex-col gap-1">
        <h3 className="text-sm">{item.name}</h3>
        <p className="text-[10px] text-white/40">{item.location}</p>
      </div>
      <Button variant="ghost" size="icon" className="flex-1 justify-end">
        <Image src="/icons/Delete.svg" alt="" width={24} height={24} />
      </Button>
    </div>
  );
}
