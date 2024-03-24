'use server';
import { z } from 'zod';

import axios from 'axios';
import { generate4DigitCode } from '~/lib/utils';
import type { AuthState, SMSRuCodeCallResponse } from '~/types/common';

import { env } from '~/env';
import { AuthTabs } from '~/types/enums';

const SmsRuBaseUrl = 'https://sms.ru/sms/send';
const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export async function sendSmsWithCode(prevState: AuthState, formData: FormData) {
  const schema = z.object({
    telephone: z.string().regex(phoneRegex, 'Неправильный номер!')
  });
  const parse = schema.safeParse({
    telephone: formData.get('telephone')
  });

  if (!parse.success) {
    const message = parse.error.flatten().fieldErrors.telephone?.join('; ') ?? '';
    return { ...prevState, message, isSuccessful: false };
  }

  const data = parse.data;

  try {
    // отправка сообщения с кодом
    const smsResponse = await axios.get<SMSRuCodeCallResponse>(SmsRuBaseUrl, {
      params: {
        api_id: env.SMS_RU_TOKEN,
        to: data.telephone,
        msg: generate4DigitCode(),
        json: 1,
        test: 1
      }
    });

    if (smsResponse.data.status !== 'OK') {
      return { ...prevState, message: smsResponse.statusText, isSuccessful: false };
    }

    return {
      ...prevState,
      message: `Смс с кодом на ${data.telephone} отправлено`,
      isSuccessful: true,
      tab: AuthTabs.numberCheck
    };
  } catch (e) {
    return { ...prevState, message: 'Не удалось отправить смс', isSuccessful: false };
  }
}
