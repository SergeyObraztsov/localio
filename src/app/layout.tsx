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
          className={`${pragmaticaFont.className} font-sans flex justify-center bg-gray-dark text-white`}
        >
          {/* <Nav /> */}
          <main className="max-w-md w-full sm:border-x overflow-hidden">
            <div>{children}</div>
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
