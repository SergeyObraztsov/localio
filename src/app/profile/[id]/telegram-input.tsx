'use client';

import { Input } from '~/components/ui/input';
import useUser from '~/lib/hooks';

export default function TelegramInput() {
  const telegramUser = useUser();
  return (
    <Input
      type="text"
      readOnly
      className="rounded-none border-b border-b-white/10"
      label="Телеграм"
      value={'@' + telegramUser?.username ?? ''}
    />
  );
}
