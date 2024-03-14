import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import AuthProvider from './auth-provider';
import Nav from '~/components/nav';

const inter = Inter({
  subsets: ['cyrillic'],
  variable: '--font-sans'
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
        <body className={`font-sans ${inter.variable} flex justify-center bg-gray-800`}>
          <div className="max-w-md w-full h-screen bg-white">
            <Nav />
            <main>{children}</main>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
