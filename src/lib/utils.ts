import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generate4DigitCode() {
  // Generate a random number between 0 and 9999 (inclusive)
  const randomNumber = Math.floor(Math.random() * 10000);

  // Pad the number with leading zeros if necessary to ensure 4 digits
  return randomNumber.toString().padStart(4, '0');
}

export function morph(amount: number, array: string[]) {
  const index: number =
    amount % 100 > 4 && amount % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][amount % 10 < 5 ? amount % 10 : 5]!;

  return array[index];
}
