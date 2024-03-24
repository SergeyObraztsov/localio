import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { AuthState } from '~/types/common';

type NumberTabProps = {
  formState: AuthState;
};

export default function NumberTab({ formState }: NumberTabProps) {
  return (
    <div className="flex flex-col flex-1 w-full items-start gap-2">
      <Label htmlFor="telephone">Введдите свой номер телефона</Label>
      <Input
        type="tel"
        id="telephone"
        name="telephone"
        pattern="+7 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}"
        placeholder="+7 900 000 00 00"
        required
      />
      <Label htmlFor="telephone">Мы пришлем вам код для продолжения регистрации</Label>
      {!formState.isSuccessful && (
        <Label className="pt-2 text-red text-[10px]">{formState.message}</Label>
      )}
    </div>
  );
}
