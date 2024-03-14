import type { TelegramUserData } from '@telegram-auth/server';
import { db } from './index';
import { users } from './schema';

export async function createUserOrUpdate(user: TelegramUserData) {
  return await db
    .insert(users)
    .values({
      id: user.id,
      username: user.first_name + user.last_name,
      image: user.photo_url
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        username: user.first_name + user.last_name,
        image: user.photo_url
      }
    });
}
