import { AuthTabs } from './enums';

export type PeopleListItem = {
  id: number;
  imageSrc: string;
  name: string;
  job_title: string;
};

export type SpotListItem = {
  id: number;
  imageSrc: string;
  name: string;
  location: string;
};

export type UserCreateData = {
  phoneNumber: string;
};

export type SMSRuCodeCallResponse = {
  status: string;
  status_code: number;
  sms: Record<string, unknown>;
  balance: number;
};

export type AuthState = {
  message: string;
  isSuccessful: boolean;
  tab: AuthTabs;
};
