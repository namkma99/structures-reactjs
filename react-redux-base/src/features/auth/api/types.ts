import type { User } from '@/types/common';

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  refreshToken: string;
};
