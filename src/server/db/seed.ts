import type { TelegramUserData } from '@telegram-auth/server';
import { db } from './index';
import { users } from './schema';
import type { UserCreateData } from '~/types/common';

export async function createUser(user: UserCreateData) {
  return await db.insert(users).values({
    phoneNumber: user.phoneNumber
  });
}

export async function createUserOrUpdate(user: TelegramUserData) {
  return await db
    .insert(users)
    .values({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      image: user.photo_url
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        firstName: user.first_name,
        lastName: user.last_name,
        image: user.photo_url
      }
    });
}
