import type { Viewport } from 'next';
import '~/styles/globals.css';

import localFont from 'next/font/local';
import AuthProvider from './auth-provider';

const pragmaticaFont = localFont({
  src: [
    {
      path: '../../public/fonts/PragmaticaExtended-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Pragmatica-Book.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-pragmatic'
});

export const metadata = {
  title: 'Localio',
  description: 'Нетворкинг',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="ru">
        <body className={`${pragmaticaFont.className} flex justify-center bg-gray-dark text-white`}>
          {/* <Nav /> */}
          <main className="w-full max-w-md overflow-hidden sm:border-x">
            <div>{children}</div>
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
