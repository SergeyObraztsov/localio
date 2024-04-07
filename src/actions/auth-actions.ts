'use server';

import type { FormState } from '~/types/common';

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~/server/db';
import { users, usersProfiles } from '~/server/db/schema';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export async function createUser(prevState: FormState, formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    name: z.string(),
    position: z.string(),
    description: z.string(),
    image: z
      .instanceof(File)
      .refine((file) => {
        if (!file.size) return true;
        file?.size ?? 0 <= MAX_FILE_SIZE;
      }, `Max file size is 5MB.`)
      .refine((file) => {
        if (!file.size) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file?.type ?? '');
      }, '.jpg, .jpeg, .png and .webp files are accepted.')
  });

  const parse = schema.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
    position: formData.get('position'),
    description: formData.get('description'),
    image: formData.get('image')
  });
  if (!parse.success) {
    const message = Object.values(parse.error.flatten().fieldErrors).join('; ') ?? '';
    return { message, isSuccessful: false };
  }

  const { userId, name, position, description, image } = parse.data;

  try {
    await db
      .insert(users)
      .values({ id: Number(userId), name })
      .onConflictDoUpdate({
        set: { name },
        target: users.id
      });
  } catch (e) {
    console.log(e);
    return { message: 'Не удалось обновить данные пользователя', isSuccessful: false };
  }

  try {
    await db
      .insert(usersProfiles)
      .values({ userId: Number(userId), position, description })
      .onConflictDoUpdate({
        set: { position, description },
        target: usersProfiles.userId
      });
  } catch (e) {
    console.log(e);
    await db.delete(users).where(eq(users.id, Number(userId)));
    return { message: 'Не удалось обновить данные профиля', isSuccessful: false };
  }
  return { message: 'Пользователь успешно создан', isSuccessful: true };
}
