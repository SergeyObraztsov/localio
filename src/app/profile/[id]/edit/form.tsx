'use client';
import { Label } from '@radix-ui/react-label';
import WebApp from '@twa-dev/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editUserProfile } from '~/actions/user-actions';
import SpotCardEdit from '~/components/spot-cards-edit';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import type { FormState, User, UserSpot } from '~/types/common';

const initialState: FormState = {
  message: '',
  isSuccessful: false
};

type FormProps = { user: User; spots: UserSpot[] };

export default function Form({ user, spots }: FormProps) {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const telegramUser = WebApp.initDataUnsafe.user;

  const editUserHandler = async (prevState: FormState, formData: FormData) => {
    const result = await editUserProfile(prevState, formData);
    if (result.isSuccessful) {
      router.push(`/profile/${telegramUser?.id}`);
    }
    return result;
  };

  const [state, formAction] = useFormState(editUserHandler, initialState);
  return (
    <form className="relative flex h-full min-h-dvh flex-col gap-6 p-4" action={formAction}>
      <input name="userId" defaultValue={telegramUser?.id} hidden />
      <header className="flex w-full justify-between">
        <Button variant="ghost" size="sm" className="text-sm font-normal" asChild>
          <Link href={`/profile/${telegramUser?.id}`}>Отмена</Link>
        </Button>
        <Button type="submit" variant="ghost" size="sm" className="rounded-full text-sm font-bold">
          Готово
        </Button>
      </header>

      <div className="flex w-full flex-col items-center justify-center">
        <Label htmlFor="image" className="flex flex-col items-center justify-center gap-2">
          <Image
            className="overflow-hidden rounded-full object-cover"
            src={avatarFile ? URL.createObjectURL(avatarFile) : user?.image ?? ''}
            width={100}
            height={100}
            alt=""
            draggable={false}
            loading="eager"
            quality={100}
          />
          <p className="text-sm font-normal">Изменить фото</p>
        </Label>
        <Input
          onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
          type="file"
          id="image"
          name="image"
          className="hidden"
        />
      </div>

      <div className="overflow-hidden rounded-lg">
        <Input
          className="rounded-none border-b border-b-white/10"
          type="text"
          defaultValue={user?.name ?? ''}
          name="name"
          label="Имя и фамилия"
        />
        <Input
          className="rounded-none"
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
          defaultValue={'@' + (telegramUser?.username ?? '')}
          readOnly
          label="Телеграм"
        />
        <Input
          className="rounded-none border-b border-b-white/10"
          type="text"
          defaultValue={user?.phoneNumber ?? ''}
          name="phone"
          label="Мобильный"
        />
        <Input
          className="rounded-none border-b border-b-white/10"
          type="text"
          defaultValue={user?.email ?? ''}
          name="email"
          label="Э-почта"
        />
        <Textarea
          className="resize-none rounded-none"
          name="description"
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
