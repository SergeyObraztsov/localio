'use client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp';
import Steps from '~/components/steps';

import Image from 'next/image';
import { Textarea } from '~/components/ui/textarea';
// import CameraIcon from '';

export default function AuthPage() {
  return (
    <>
      <div className="flex w-full justify-between">
        {true && (
          <Button variant="ghost" size="icon">
            {'<'}
          </Button>
        )}
        <Button variant="ghost" size="icon">
          &times;
        </Button>
      </div>
      <h1 className="font-bold text-2xl">Регистрация</h1>
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid w-full items-center gap-2">
          <Input
            type="tel"
            id="telephone"
            name="telephone"
            pattern="\+7 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}"
            placeholder="+7 900 000 00 00"
            required
          />
          <Label htmlFor="telephone" className="text-[#ffffff66]">
            Введите свой номер телефона
          </Label>
        </div>
        <div className="grid w-full items-center gap-2">
          <InputOTP
            id="otp"
            maxLength={4}
            render={({ slots }) => (
              <>
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}{' '}
                </InputOTPGroup>
              </>
            )}
          />
          <Label htmlFor="otp" className="text-[#ffffff66]">
            Мы отправили на ваш номер 4-х значный шифр
          </Label>
        </div>
        <div className="w-full">
          <Label htmlFor="avatar" className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-gray-light">
              <Image
                src="/icons/camera.svg"
                alt="camera-icon"
                width={38}
                height={34}
                draggable={false}
              />
            </div>
            <p className="font-normal text-sm">Добавить фото</p>
          </Label>
          <Input type="file" id="avatar" name="avatar" className="hidden" />
        </div>
        <div className="grid w-full items-center gap-2">
          <h3 className="font-bold text-sm">Основное</h3>
          <div className="rounded-lg overflow-hidden">
            <Input
              className="rounded-none border-b border-b-gray-light"
              type="text"
              id="name"
              name="name"
              placeholder="Ваше имя"
              label="Имя"
              required
            />
            <Input
              className="rounded-none border-b border-b-gray-light"
              type="text"
              id="job_title"
              name="job_title"
              placeholder="Должность"
              label="Должность"
              required
            />
            <Input
              className="rounded-none"
              type="text"
              id="job_place"
              name="job_place"
              placeholder="Город"
              label="Город"
              required
            />
          </div>
          <Button variant="outline" size="lg" className="rounded-full">
            Привязать Телеграм
          </Button>
          <Label className="text-[#ffffff66] max-w-64">
            При нажатии вы перейдёте в Телеграм-бота, где привяжете свой аккаунт
          </Label>

          <div className="grid w-full items-center gap-2">
            <h3 className="font-bold text-sm">Дополнительное</h3>
            <div className="rounded-lg overflow-hidden">
              <Input
                className="rounded-none border-b border-b-gray-light"
                type="text"
                id="name"
                name="name"
                placeholder="Ваше"
                label="Ищу"
                required
              />
              <Input
                className="rounded-none border-b border-b-gray-light"
                type="text"
                id="job_title"
                name="job_title"
                placeholder="Должность"
                label="Чем могу помочь"
                required
              />
              <Input
                className="rounded-none border-b border-b-gray-light"
                type="text"
                id="job_place"
                name="job_place"
                placeholder="Место работы"
                label="Город"
                required
              />
              <Textarea
                className="rounded-none resize-none"
                id="job_place"
                name="job_place"
                placeholder="Место работы"
                label="О себе"
                required
              />
            </div>
          </div>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="oleg@mail.ru"
            label="Э-почта"
            required
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Steps total={3} currentStepIndex={1} />
      </div>
      <Button className="rounded-full w-full">Далее</Button>
    </>
  );
}
