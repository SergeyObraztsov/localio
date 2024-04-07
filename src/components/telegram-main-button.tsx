'use client';

import { MainButton } from '@twa-dev/sdk/react';

interface MainButtonProps {
  disabled?: boolean;
  progress?: boolean;
  color?: string;
  textColor?: string;
  onClick: VoidFunction;
  text: string;
}

export default function TelegramMainButton({
  color = '#00D021',
  textColor = '#fff',
  ...props
}: MainButtonProps) {
  return <MainButton color={color} textColor={textColor} {...props} />;
}
