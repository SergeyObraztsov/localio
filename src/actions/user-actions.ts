'use server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { FormState } from '~/types/common';
import { db } from '../server/db/index';
import { spotSubscriptions, users, usersProfiles } from '../server/db/schema';
import { saveFileInBucket } from './static-files-actions';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export async function getUser(userId: number) {
  return await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.id, userId);
    }
  });
}

export async function getUserProfile(userId: number) {
  return await db.query.users.findFirst({
    with: {
      usersProfile: {
        columns: {
          description: true,
          position: true
        }
      }
    },
    columns: {
      createdAt: false
    },
    where(users, { eq }) {
      return eq(users.id, userId);
    }
  });
}

export async function getUserSpots(userId: number) {
  return await db.query.spotSubscriptions.findMany({
    with: {
      spot: {
        with: {
          types: {
            columns: {
              image: true
            }
          }
        },
        columns: {
          id: true,
          name: true,
          location: true
        }
      }
    },
    columns: {
      id: true
    },
    where(spotSubscriptions, { eq }) {
      return eq(spotSubscriptions.userId, userId);
    }
  });
}

export async function getSpot(spotId: string) {
  return await db.query.spots.findFirst({
    with: {
      subscriptions: {
        with: {
          user: {
            with: {
              usersProfile: {
                columns: {
                  position: true
                }
              }
            },
            columns: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        columns: {
          id: true
        }
      }
    },
    columns: {
      createdAt: false
    },
    where(spots, { eq }) {
      return eq(spots.id, spotId);
    }
  });
}

export const deleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
};

export async function editUserProfile(prevState: FormState, formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    name: z.string(),
    position: z.string(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    description: z.string(),
    image: z
      .instanceof(File)
      .refine((file) => {
        if (!file.size) return true;
        return file?.size ?? 0 <= MAX_FILE_SIZE;
      }, `Max file size is 5MB. `)
      .refine((file) => {
        if (!file.size) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file?.type ?? '');
      }, '.jpg, .jpeg, .png and .webp files are accepted.')
  });

  const parse = schema.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
    position: formData.get('position'),
    email: formData.get('email'),
    description: formData.get('description'),
    phoneNumber: formData.get('phone'),
    image: formData.get('image')
  });

  if (!parse.success) {
    const message = Object.values(parse.error.flatten().fieldErrors).join('; ') ?? '';
    return { message, isSuccessful: false };
  }

  const { userId, name, position, email, description, phoneNumber, image } = parse.data;
  let fileName;

  try {
    fileName = await saveFileInBucket(image);
  } catch (e) {
    console.log(e);
    return { message: 'Не удалось загрузить изображаение', isSuccessful: false };
  }

  try {
    await db
      .update(users)
      .set({
        name,
        email,
        phoneNumber,
        image: fileName
      })
      .where(eq(users.id, Number(userId)));
  } catch (e) {
    console.log(e);
    return { message: 'Не удалось обновить данные пользователя', isSuccessful: false };
  }

  try {
    await db
      .update(usersProfiles)
      .set({
        position,
        description
      })
      .where(eq(usersProfiles.userId, Number(userId)));
  } catch (e) {
    console.log(e);
    return { message: 'Не удалось обновить данные профиля', isSuccessful: false };
  }
  revalidatePath('/profile/' + userId);
  return { message: 'Профиль успешно обновлен.', isSuccessful: true };
}

export const exitFromSpot = async (userId: number, spotId: string) => {
  await db
    .delete(spotSubscriptions)
    .where(and(eq(spotSubscriptions.userId, userId), eq(spotSubscriptions.spotId, spotId)));
  revalidatePath(`/spot/${spotId}`);
};

export const enterSpot = async (userId: number, spotId: string) => {
  await db.insert(spotSubscriptions).values({ userId, spotId });
  revalidatePath(`/spot/${spotId}`);
};
