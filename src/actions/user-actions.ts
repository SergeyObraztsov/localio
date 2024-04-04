'use server';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { FormState, UserCreateData } from '~/types/common';
import { db } from '../server/db/index';
import { users, usersProfiles } from '../server/db/schema';
import { saveFileInBucket } from './static-files-actions';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export async function createUser(user: UserCreateData) {
  return await db.insert(users).values({
    phoneNumber: user.phoneNumber
  });
}

// export async function createUserOrUpdate(user: TelegramUserData) {
//   return await db
//     .insert(users)
//     .values({
//       id: String(user.id),
//       firstName: user.first_name,
//       lastName: user.last_name,
//       image: user.photo_url
//     })
//     .onConflictDoUpdate({
//       target: users.id,
//       set: {
//         firstName: user.first_name,
//         lastName: user.last_name,
//         image: user.photo_url
//       }
//     });
// }

export async function getUserProfile(userId: string) {
  return await db.query.users.findFirst({
    with: {
      usersProfile: {
        columns: {
          description: true,
          position: true,
          telegramUsername: true
        }
      }
    },
    columns: {
      createdAt: false,
      emailVerified: false,
      otp: false
    },
    where(users, { eq }) {
      return eq(users.id, userId);
    }
  });
}

export async function getUserSpots(userId: string) {
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

export async function getTelegramData(userId: string) {
  return await db.query.usersProfiles.findFirst({
    columns: {
      telegramChatId: true,
      telegramUsername: true
    },
    where(usersProfiles, { eq }) {
      return eq(usersProfiles.userId, userId);
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

export const deleteUser = async (id: string) => {
  await db.delete(users).where(eq(users.id, id));
};

export async function editUserProfile(prevState: FormState, formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    name: z.string(),
    position: z.string(),
    email: z.string().nullable(),
    description: z.string(),
    image: z
      .instanceof(File)
      .refine((file) => file?.size ?? 0 <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type ?? ''),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      )
  });

  const parse = schema.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
    position: formData.get('position'),
    email: formData.get('email'),
    description: formData.get('description'),
    image: formData.get('image')
  });

  if (!parse.success) {
    const message = Object.values(parse.error.flatten().fieldErrors).join('; ') ?? '';
    return { message, isSuccessful: false };
  }

  const { userId, name, position, email, description, image } = parse.data;

  try {
    const imageBuffer = image ? await bufferFromFile(image) : null;
    if (imageBuffer) {
      await saveFileInBucket({
        bucketName: 'main',
        fileName: image?.name ?? '',
        file: imageBuffer
      });
    }
    await db
      .update(users)
      .set({
        name,
        email
      })
      .where(eq(users.id, userId));
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
      .where(eq(usersProfiles.userId, userId));
  } catch (e) {
    return { message: 'Не удалось обновить данные профиля', isSuccessful: false };
  }

  redirect('/profile/' + userId);
}

async function bufferFromFile(filePath: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
