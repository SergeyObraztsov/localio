'use client';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
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
  const { id } = useParams<{ id: string }>();
  const [state, formAction] = useFormState(editUserProfile, initialState);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const avatarFile = avatarInputRef.current?.files?.[0];
  return (
    <form className="relative flex h-full min-h-dvh flex-col gap-6 p-4" action={formAction}>
      <input name="userId" defaultValue={id} hidden />
      <header className="flex w-full justify-between">
        <Button variant="ghost" size="sm" className="text-sm font-normal" asChild>
          <Link href={`/profile/${id}`}>Отмена</Link>
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
        <Input ref={avatarInputRef} type="file" id="image" name="image" className="hidden" />
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
          defaultValue={'@' + (user?.usersProfile?.telegramUsername ?? '')}
          readOnly
          label="Телеграм"
        />
        <Input
          className="rounded-none border-b border-b-white/10"
          type="text"
          defaultValue={user?.phoneNumber ?? ''}
          readOnly
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
