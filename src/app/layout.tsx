import '~/styles/globals.css';

import localFont from 'next/font/local';
import AuthProvider from './auth-provider';

const pragmaticaFont = localFont({
  src: [
    {
      path: '../../public/fonts/Pragmatica-Black.ttf',
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
  description: 'ННетворкинг надо?',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="ru">
        <body
          className={`${pragmaticaFont.className} font-sans flex justify-center bg-green backdrop-contrast-50 text-white`}
        >
          {/* <Nav /> */}
          <main className="max-w-md w-full overflow-hidden bg-gray-dark">
            <div className="flex flex-col flex-shrink h-full min-h-screen p-4 gap-4">
              {children}
            </div>
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
