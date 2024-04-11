'use client';

import WebApp from '@twa-dev/sdk';
import { Input } from '~/components/ui/input';

export default function TelegramInput() {
  const telegramUser = WebApp.initDataUnsafe?.user;
  return (
    <Input
      type="text"
      readOnly
      className="rounded-none border-b border-b-white/10 read-only:border-b"
      label="Телеграм"
      value={'@' + telegramUser?.username ?? ''}
    />
  );
}
