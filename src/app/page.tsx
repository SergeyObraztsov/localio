'use client';
import WebApp from '@twa-dev/sdk';
import { BackButton, MainButton } from '@twa-dev/sdk/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    WebApp.expand();
    WebApp.setBackgroundColor('#141516');
    WebApp.setHeaderColor('#141516');
  }, []);

  return (
    <>
      <BackButton onClick={() => router.push('/spot/40c676dc-7fa7-45a7-99d3-2fd094d88891')} />
      <MainButton
        onClick={() => WebApp.showScanQrPopup({}, () => {})}
        color="#00D021"
        textColor="#fff"
        text={'Отсканировать QR'}
      />
    </>
  );
}
