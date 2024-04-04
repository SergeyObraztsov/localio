import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getTelegramData } from '~/actions/user-actions';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

type TelegramData = {
  telegramChatId: string | null;
  telegramUsername: string | null;
};

export default function TelegramAuth() {
  const { userId } = useParams<{ userId: string }>();
  const [telegramData, setTelegramData] = useState<null | TelegramData>(null);

  const fetchData = useCallback(async () => {
    const data = await getTelegramData(userId);
    setTelegramData(data as TelegramData);
  }, [userId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handlePageFocus = () => {
      void fetchData();
    };
    window.addEventListener('focus', handlePageFocus);
    return () => {
      window.removeEventListener('focus', handlePageFocus);
    };
  }, [fetchData]);

  const isTelegramLinked = telegramData?.telegramChatId && telegramData.telegramUsername;

  if (isTelegramLinked) return <p>Телеграм успешно привязан</p>;
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        size="lg"
        className="rounded-full border-[#3290EC] text-[#3290EC]"
        asChild
      >
        <a
          href={`https://t.me/localio_bot?start=${userId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Привязать Телеграм
        </a>
      </Button>
      <Label>
        Для того чтобы другие пользователи могли связаться с вами в телеграм и мы знали что это вы
        (текст ещё думаем, написал смысл)
      </Label>
    </div>
  );
}
