'use client';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
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
    <div className="flex w-full justify-start">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        cardsEffect={{ rotate: false, slideShadows: true, perSlideOffset: 10 }}
        className="!ml-0 h-16 w-11/12"
      >
        {Cards.map((card) => (
          <SwiperSlide key={card.id} className="rounded-xl bg-[#2B2C2D]">
            <div className="flex h-full w-full items-center gap-5 p-4">
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
