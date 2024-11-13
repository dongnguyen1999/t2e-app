// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export type AuthUserPayload = {
  id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  auth_date?: number;
  hash?: string;
}

export type AuthUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  auth_date: number;
  wallet: Wallet;
  resource: Resource;
  mission: Mission;
}

export type Wallet = {
  id: string;
  status: number;
  assets: number;
  token: number;
}

export type Resource = {
  name: string;
  description: string;
  total_tokens: number;
  total_assets: number;
  ratio: number;
}

export type Mission = {
  id: string;
  name: string;
  description: string;
  status: number;
  point: number;
  type: number;
  cooldown_period: number;
  completed_at: string;
}

export type AuthResponseData = {
  user: AuthUser;
  token: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: builder => ({
    getAuthenticatedUser: builder.query<AuthResponseData, AuthUserPayload>({
      query: payload => ({
        url: '/auth',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: AuthResponseData }) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthenticatedUserQuery } = userApi;