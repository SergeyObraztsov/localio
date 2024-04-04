'use client';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type ImageWithFallbackProps = ImageProps & {
  fallback: string;
};

export default function ImageWithFallback({
  fallback = '',
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [imageSource, setImageSource] = useState<string | StaticImport>(src);

  return <Image alt={alt} onError={() => setImageSource(fallback)} src={imageSource} {...props} />;
}
