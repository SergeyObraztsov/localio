import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { createTable, users } from '~/server/db/schema';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
      phone_number: string;
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
    signIn: '/auth'
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    CredentialsProvider({
      id: 'phone-login',
      name: 'Phone Login',
      credentials: { otp: { label: 'otp', type: 'text' } },
      async authorize(credentials, req) {
        const userId = req.query?.userId as string;
        const otp = credentials?.otp;
        if (!userId || !otp) return null;

        try {
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, userId)
          });

          if (otp !== user?.otp) {
            return null;
          }
          await db.update(users).set({ isActivated: true, otp: null }).where(eq(users.id, userId));
          return user;
        } catch (e) {
          return null;
        }
      }
    })
    // CredentialsProvider({
    //   id: 'telegram-login',
    //   name: 'Telegram Login',
    //   credentials: {},
    //   async authorize(credentials, req) {
    //     const validator = new AuthDataValidator({
    //       botToken: `${env.BOT_TOKEN}`
    //     });

    //     const data = objectToAuthDataMap(req.query ?? {});
    //     const user = await validator.validate(data);

    //     if (user.id && user.first_name) {
    //       const returned = {
    //         id: user.id.toString(),
    //         email: user.id.toString(),
    //         name: [user.first_name, user.last_name ?? ''].join(' '),
    //         image: user.photo_url
    //       };

    //       try {
    //         await createUserOrUpdate(user);
    //       } catch {
    //         console.log('Something went wrong while creating the user.');
    //       }

    //       return returned;
    //     }
    //     return null;
    //   }
    // })
  ]
};

export const getServerAuthSession = () => getServerSession(authOptions);
