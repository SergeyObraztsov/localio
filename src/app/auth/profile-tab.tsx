import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import type { AuthState } from '~/types/common';

type NumberCheckTabProps = {
  formState: AuthState;
};

export default function ProfileTab({ formState }: NumberCheckTabProps) {
  return (
    <>
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
            label="Имя и фамилия"
            required
          />
          <Input
            className="rounded-none"
            type="text"
            id="job_title"
            name="job_title"
            label="Должность и место работы"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Textarea
          className="resize-none"
          id="about_me"
          name="about_me"
          label="О себе"
          maxLength={5}
          required
        />
        <Label htmlFor="about_me">
          Расскажите как можно более подробно о себе, что вам интересно чем можете быть полезны и
          что хотите получить от других людей
        </Label>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full border-[#3290EC] text-[#3290EC]"
        >
          Привязать Телеграм
        </Button>
        <Label>
          Для того чтобы другие пользователи могли связаться с вами в телеграм и мы знали что это вы
          (текст ещё думаем, написал смысл)
        </Label>
      </div>
    </>
  );
}
