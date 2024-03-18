'use client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '~/components/ui/input-otp';
import Steps from '~/components/steps';

import Image from 'next/image';
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
          <div className="rounded-lg overflow-hidden">
            <Input
              className="rounded-none border-b border-b-gray-light"
              type="text"
              id="name"
              name="name"
              placeholder="Ваше имя"
              required
            />
            <Input
              className="rounded-none border-b border-b-gray-light"
              type="text"
              id="job_title"
              name="job_title"
              placeholder="Должность"
              required
            />
            <Input
              className="rounded-none"
              type="text"
              id="job_place"
              name="job_place"
              placeholder="Место работы"
              required
            />
          </div>
          <Label className="text-[#ffffff66]">
            Заполнить информацию полностью можно потом в вашем профиле. Если хотите сделать это
            сейчас,{' '}
            <Button variant="link" size="inline" className="inline text-white text-[10px]">
              нажмите сюда
            </Button>
          </Label>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Steps total={3} currentStepIndex={1} />
      </div>
      <Button className="rounded-full w-full">Далее</Button>
    </>
  );
}
