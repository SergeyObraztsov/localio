'use client';
import WebApp from '@twa-dev/sdk';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editUserProfile } from '~/actions/user-actions';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { imageLoader } from '~/lib/image-loader';
import type { FormState, User, UserSpot } from '~/types/common';

const SpotCardEdit = dynamic(() => import('~/components/spot-cards-edit'), {
  ssr: false
});

const initialState: FormState = {
  message: '',
  isSuccessful: false
};

type FormProps = { user: User; spots: UserSpot[] };

export default function Form({ user, spots }: FormProps) {
  const router = useRouter();
  const telegramUser = WebApp.initDataUnsafe?.user;
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isChanging, setChanging] = useState(false);

  const editUserHandler = async (prevState: FormState, formData: FormData) => {
    try {
      setChanging(true);
      const result = await editUserProfile(prevState, formData);
      setChanging(false);
      if (result.isSuccessful) {
        router.back();
      }
      return result;
    } catch (error) {
      console.log(error);
      return { message: 'Произошла ошибка', isSuccessful: false };
    }
  };

  const [state, formAction] = useFormState(editUserHandler, initialState);
  return (
    <form className="relative flex h-full min-h-dvh flex-col gap-6 p-4" action={formAction}>
      <input name="userId" defaultValue={telegramUser?.id} hidden />
      <header className="flex w-full justify-between">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="text-sm font-normal"
          disabled={isChanging}
          onClick={() => router.back()}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="rounded-full text-sm font-bold"
          disabled={isChanging}
        >
          Готово
        </Button>
      </header>

      <div className="flex w-full flex-col items-center justify-center">
        <Label htmlFor="image" className="flex flex-col items-center justify-center gap-2">
          <AspectRatio ratio={1}>
            {avatarFile ? (
              <Image
                className="overflow-hidden rounded-full object-cover"
                src={URL.createObjectURL(avatarFile)}
                alt=""
                fill
                draggable={false}
                loading="eager"
                quality={100}
              />
            ) : (
              <Image
                className="overflow-hidden rounded-full object-cover"
                loader={imageLoader}
                src={user?.image ?? ''}
                alt=""
                fill
                draggable={false}
                loading="eager"
                quality={100}
              />
            )}
          </AspectRatio>
          <p className="text-sm font-normal">Изменить фото</p>
        </Label>
        <Input
          onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
          disabled={isChanging}
          type="file"
          id="image"
          name="image"
          className="hidden"
        />
      </div>

      <div className="overflow-hidden rounded-lg">
        <Input
          className="rounded-none border-b border-b-white/10"
          disabled={isChanging}
          type="text"
          defaultValue={user?.name ?? ''}
          name="name"
          label="Имя и фамилия"
        />
        <Input
          className="rounded-none"
          disabled={isChanging}
          type="text"
          defaultValue={user?.usersProfile?.position ?? ''}
          name="position"
          label="Должность и место работы"
        />
      </div>

      {!!spots.length && (
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">Споты</h2>
          <div className="flex flex-col gap-2">
            <SpotCardEdit list={spots} />
            <Label>Вы можете выйти из спота, нажав на «минус»</Label>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg">
        <Input
          className="rounded-none border-b border-b-white/10"
          type="text"
          defaultValue={user.telegramUsername ? '@' + user.telegramUsername : ''}
          readOnly
          label="Телеграм"
        />
        <Input
          className="rounded-none border-b border-b-white/10"
          type="phone"
          defaultValue={user?.phoneNumber ?? ''}
          disabled={isChanging}
          name="phone"
          label="Мобильный"
        />
        <Input
          className="rounded-none border-b border-b-white/10"
          type="email"
          defaultValue={user?.email ?? ''}
          disabled={isChanging}
          name="email"
          label="Э-почта"
        />
        <Textarea
          className="resize-none rounded-none"
          name="description"
          defaultValue={user.usersProfile?.description ?? ''}
          disabled={isChanging}
          label="О себе"
          maxLength={500}
        />
      </div>

      {!state.isSuccessful && <Label className="pt-2 text-[10px] text-red">{state.message}</Label>}

      <Button variant="link" size={'inline'} className="mt-auto self-start text-white/40">
        Удалить аккаунт
      </Button>
    </form>
  );
}
