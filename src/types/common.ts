export type UserCreateData = {
  phoneNumber: string;
};

export type SMSRuCodeCallResponse = {
  status: string;
  status_code: number;
  status_text: string;
  code?: string | number;
  sms: Record<string, unknown>;
  balance: number;
};

export type FormState = {
  message: string;
  isSuccessful: boolean;
};

export type Spot = {
  id: string;
  name: string | null;
  image: string | null;
  description: string | null;
  location: string | null;
  typeId: number;
  subscriptions: SpotSubscription[];
};

export type SpotSubscription = {
  id: number;
  user: SpotUser | null;
};

export type SpotUser = {
  id: number;
  name: string | null;
  image: string | null;
  usersProfile: UsersProfile | null;
};

export type UsersProfile = {
  id: string;
  userId: string;
  position: string | null;
};

export type UserSpot = {
  id: number;
  spot: {
    id: string;
    name: string | null;
    location: string | null;
    types: {
      image: string | null;
    };
  };
};

export type User = {
  email: string | null;
  name: string | null;
  id: number;
  image: string | null;
  phoneNumber: string | null;
  telegramUsername: string | null;
  usersProfile: {
    description: string | null;
    position: string | null;
  } | null;
};

export type WebAppUser = {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};
export type TelegramUser = WebAppUser & {
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
};