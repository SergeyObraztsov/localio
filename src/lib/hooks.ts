import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

type WebAppUser = {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};
export type TelegramUser = WebAppUser & {
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
};

const useUser = () => {
  const [user, setUser] = useState<WebAppUser | null>(null);

  useEffect(() => {
    const userData = WebApp.initDataUnsafe?.user;
    setUser(userData ?? null);
  }, []);

  return user;
};

export default useUser;
