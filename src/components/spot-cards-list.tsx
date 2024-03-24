'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SpotListItem } from '~/types/common';
// Import Swiper styles
import 'swiper/css';

export default function SpotCardList({ list }: { list: SpotListItem[] }) {
  return (
    <div className="w-full">
      <Swiper spaceBetween={8} slidesPerView={'auto'}>
        {list.map((item) => (
          <SwiperSlide key={item.id} className="!w-32">
            <SpotCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function SpotCard({ item }: { item: SpotListItem }) {
  return (
    <div className="h-32 flex flex-col items-center justify-center py-4 px-2 rounded-lg bg-gray-light">
      <Image src={item.imageSrc} alt="" width={48} height={48} className="pt-2" />
      <h3 className="font-bold mt-auto text-sm">{item.name}</h3>
    </div>
  );
}
