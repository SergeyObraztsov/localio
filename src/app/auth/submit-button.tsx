import { useFormStatus } from 'react-dom';
import TelegramMainButton from '~/components/telegram-main-button';

export default function SubmitButton({ onClick }: { onClick: VoidFunction }) {
  const { pending } = useFormStatus();
  return <TelegramMainButton onClick={onClick} text="Далее" progress={pending} />;
}
