'use client';

import { ImageLoaderProps } from 'next/image';

export function imageLoader({ src }: ImageLoaderProps) {
  return '/api/static?fileName=' + src;
}
