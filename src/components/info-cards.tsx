'use client';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Button } from './ui/button';

const Cards: { id: number; title: string; description: React.ReactNode; imageSrc: string }[] = [
  {
    id: 1,
    title: 'Зарегистрируйтесь',
    description: 'Чтобы увидеть подписчиков спота',
    imageSrc: '/icons/enter.svg'
  },
  {
    id: 2,
    title: 'Привяжите телеграм',
    description: (
      <>
        Просто{' '}
        <Button variant="link" size="inline">
          нажмите сюда
        </Button>
      </>
    ),
    imageSrc: '/icons/telegram.svg'
  }
];

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
        {Cards.map((card) => (
          <SwiperSlide key={card.id} className="rounded-xl bg-[#2B2C2D]">
            <div className="w-full h-full flex items-center p-4 gap-5">
              <Image src={card.imageSrc} alt="enter" width={32} height={32} />
              <div className="flex flex-col">
                <p className="text-sm font-bold">{card.title}</p>
                <p className="text-sm">{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
