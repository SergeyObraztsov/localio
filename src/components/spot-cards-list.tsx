'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { UserSpot } from '~/types/common';
// Import Swiper styles
import Link from 'next/link';
import 'swiper/css';
import { imageLoader } from '~/lib/image-loader';

export default function SpotCardList({ list }: { list: UserSpot[] }) {
  return (
    <div className="w-full">
      <Swiper spaceBetween={8} slidesPerView={'auto'} className="!px-4">
        {list.map((item) => (
          <SwiperSlide key={item.id} className="!w-32">
            <SpotCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function SpotCard({ item }: { item: UserSpot }) {
  return (
    <Link href={`/spot/${item.spot.id}`}>
      <div className="flex h-32 flex-col items-center justify-center rounded-lg bg-white/10 px-2 py-4">
        <Image
          loader={imageLoader}
          src={item.spot.types.image ?? ''}
          alt=""
          width={48}
          height={48}
          className="pt-2"
        />
        <h3 className="mt-auto text-sm font-bold">{item.spot.name}</h3>
      </div>
    </Link>
  );
}
