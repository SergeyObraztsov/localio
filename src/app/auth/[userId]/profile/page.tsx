'use client';
import WebApp from '@twa-dev/sdk';
import { BackButton } from '@twa-dev/sdk/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { editUserProfile } from '~/actions/user-actions';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import type { FormState } from '~/types/common';
import SubmitButton from '../../submit-button';

const initialState: FormState = {
  message: '',
  isSuccessful: true
};

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = useParams<{ userId: string }>();

  const [state, formAction] = useFormState(editUserProfile, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const telegramUser = WebApp.initDataUnsafe.user;
  const hasPhoto = !!telegramUser?.photo_url || !!avatarFile;

  return (
    <form
      ref={formRef}
      className="relative flex h-full min-h-svh flex-shrink flex-col gap-4 p-4"
      action={formAction}
    >
      <input name="userId" defaultValue={userId} hidden />
      <BackButton onClick={() => router.back()} />
      {/* <div className="flex w-full justify-between">
        <Button variant="ghost" size="icon" className="text-4xl" asChild>
        <Link href={`/auth/${userId}`}>&#8249;</Link>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-3xl" asChild>
        <Link href="/">&times;</Link>
        </Button>
      </div> */}

      <h1 className="text-2xl font-bold">Расскажите о себе</h1>

      <div className="flex w-full flex-1 flex-col items-start gap-6">
        <div className="w-full">
          <Label htmlFor="image" className="flex flex-col items-center justify-center gap-2">
            <div className="relative flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white/10">
              {hasPhoto ? (
                <Image
                  src={avatarFile ? URL.createObjectURL(avatarFile) : telegramUser?.photo_url ?? ''}
                  alt="image"
                  fill
                  className="object-cover"
                  draggable={false}
                />
              ) : (
                <Image
                  src={'/icons/camera.svg'}
                  alt="camera-icon"
                  width={38}
                  height={34}
                  draggable={false}
                />
              )}
            </div>
            <p className="text-sm font-normal">{hasPhoto ? 'Изменить фото' : 'Добавить фото'}</p>
          </Label>
          <Input
            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            max={1}
            type="file"
            id="image"
            name="image"
            className="hidden"
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <div className="overflow-hidden rounded-lg">
            <Input
              className="rounded-none border-b border-[#ffffff26]"
              type="text"
              id="name"
              name="name"
              label="Имя и фамилия"
              defaultValue={telegramUser?.first_name ?? '' + telegramUser?.last_name ?? ''}
              required
            />
            <Input
              className="rounded-none"
              type="text"
              id="position"
              name="position"
              label="Должность и место работы"
              required
            />
          </div>
          {!state.isSuccessful && (
            <Label className="pt-2 text-[10px] text-red">{state.message}</Label>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Textarea
            className="resize-none"
            id="description"
            name="description"
            label="О себе"
            maxLength={500}
            required
          />
          <Label htmlFor="description">
            Расскажите как можно более подробно о себе, что вам интересно чем можете быть полезны и
            что хотите получить от других людей
          </Label>
        </div>
      </div>

      <SubmitButton onClick={() => formRef.current?.requestSubmit()} />

      <div className="sticky bottom-4 left-0 flex w-full flex-col gap-4">
        <div className="absolute -bottom-4 left-0 -z-10 h-[116px] w-full bg-gradient-to-t from-[#14151600] from-20%" />
        {/* <div className="flex w-full justify-center">
          <Steps total={Object.keys(AuthTabs).length / 2} currentStepIndex={2} />
        </div> */}
        {/* <SubmitButton /> */}
      </div>
    </form>
  );
}
