'use server';

import axios from 'axios';
import { generate4DigitCode } from '~/lib/utils';
import type { FormState, SMSRuCodeCallResponse } from '~/types/common';

import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '~/env';
import { db } from '~/server/db';
import { users, usersProfiles } from '~/server/db/schema';

const SmsRuBaseUrl = 'https://sms.ru/code/call';

export async function sendSmsWithCode(prevState: FormState, formData: FormData) {
  const headersList = headers();
  const telephone = (formData.get('telephone') as string) ?? '';

  if (!isValidPhoneNumber(telephone)) {
    return { message: 'Неправильный номер!', isSuccessful: false };
  }

  const phoneNumber = parsePhoneNumber(telephone, 'RU');

  if (phoneNumber.country !== 'RU') {
    return { message: 'Введите номер в Российском формате!', isSuccessful: false };
  }

  let userId: string | undefined;

  try {
    // const code = generate4DigitCode();
    // отправка сообщения с кодом
    const smsResponse = await axios.get<SMSRuCodeCallResponse>(SmsRuBaseUrl, {
      params: {
        api_id: env.SMS_RU_TOKEN,
        phone: phoneNumber.formatInternational(),
        ip: '94.25.168.131'
        // msg: code,
        // json: 1,
        // test: 1
      }
    });
    const code = String(smsResponse.data.code);
    console.log(smsResponse.data);

    if (smsResponse.data.status !== 'OK') {
      return { ...prevState, message: smsResponse.data.status_text, isSuccessful: false };
    }

    const insertedUsers = await db
      .insert(users)
      .values({ otp: code, phoneNumber: phoneNumber.formatInternational() })
      .onConflictDoUpdate({
        target: users.phoneNumber,
        set: { otp: code }
      })
      .returning({ userId: users.id });
    userId = insertedUsers[0]?.userId;

    if (!userId) {
      return {
        ...prevState,
        message: 'Не удалось создать пользователя, повторите попытку',
        isSuccessful: false
      };
    }
    await db.insert(usersProfiles).values({ userId: userId }).onConflictDoNothing();
  } catch (e) {
    return { ...prevState, message: 'Не удалось отправить смс', isSuccessful: false };
  }
  redirect('/auth/' + userId);
}

export async function sendSmsWithCodeAgain(userId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId)
  });

  if (!user?.phoneNumber) {
    throw new Error('Пользователь не найден');
  }

  try {
    const code = generate4DigitCode();
    // отправка сообщения с кодом
    const smsResponse = await axios.get<SMSRuCodeCallResponse>(SmsRuBaseUrl, {
      params: {
        api_id: env.SMS_RU_TOKEN,
        to: user.phoneNumber,
        msg: code,
        json: 1,
        test: 1
      }
    });

    if (smsResponse.data.status !== 'OK') {
      throw new Error('Не удалось отправить смс повторите попытку позже.');
    }

    await db
      .insert(users)
      .values({ id: userId, otp: code })
      .onConflictDoUpdate({
        target: users.id,
        set: { otp: code }
      });
  } catch (e) {
    throw new Error('Не удалось отправить смс повторите попытку позже.');
  }
  redirect('/auth/' + userId);
}
