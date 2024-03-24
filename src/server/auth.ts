import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions, User } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';

import { env } from '~/env';
import { db } from '~/server/db';
import { createTable } from '~/server/db/schema';
import { createUser, createUserOrUpdate } from './db/seed';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    CredentialsProvider({
      id: 'phone-login',
      name: 'Phone Login',
      credentials: {},
      //@ts-expect-error
      async authorize(credentials, req) {
        const phoneNumber = req.query?.phone as string;
        if (!phoneNumber) return null;

        const user = await createUser({ phoneNumber });
        if (!user) return null;
        //@ts-ignore
        return user;
      }
    }),
    CredentialsProvider({
      id: 'telegram-login',
      name: 'Telegram Login',
      credentials: {},
      async authorize(credentials, req) {
        const validator = new AuthDataValidator({
          botToken: `${env.BOT_TOKEN}`
        });

        const data = objectToAuthDataMap(req.query ?? {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const returned = {
            id: user.id.toString(),
            email: user.id.toString(),
            name: [user.first_name, user.last_name ?? ''].join(' '),
            image: user.photo_url
          };

          try {
            await createUserOrUpdate(user);
          } catch {
            console.log('Something went wrong while creating the user.');
          }

          return returned;
        }
        return null;
      }
    })
  ]
};

export const getServerAuthSession = () => getServerSession(authOptions);
