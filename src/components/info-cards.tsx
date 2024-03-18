'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Image from 'next/image';

export default function InfoCards() {
  return (
    <div className="flex justify-start w-full">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        cardsEffect={{ rotate: false, slideShadows: true, perSlideOffset: 10 }}
        className="w-11/12 h-16 !ml-0"
      >
        {Array(4)
          .fill(1)
          .map((_, idx) => (
            <SwiperSlide key={idx} className="rounded-xl bg-[#2B2C2D]">
              <div className="w-full h-full flex items-center p-4 gap-5">
                <Image src="/icons/enter.svg" alt="enter" width={23} height={30} />
                <div className="flex flex-col">
                  <p className="text-sm font-bold">Зарегистрируйтесь</p>
                  <p className="text-sm">Чтобы увидеть подписчиков спота</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
