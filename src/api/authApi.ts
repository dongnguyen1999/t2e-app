// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { Mission } from './missionApi';

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
  token: string;
  count_completed_mission: number;
  count_remaining_mission: number;
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

export type AuthResponseData = {
  user: AuthUser;
}

export type LoginPayload = {
  username: string;
  password: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['AuthUser'],
  endpoints: builder => ({
    getAuthenticatedUser: builder.query<AuthUser, AuthUserPayload>({
      query: payload => ({
        url: '/auth',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: AuthResponseData }) => response.data.user,
      async onCacheEntryAdded(_, { cacheDataLoaded }) {
        const catchedData = await cacheDataLoaded;
        localStorage.setItem('userData', JSON.stringify(catchedData.data));
      },
      providesTags: ['AuthUser'],
    }),
    login: builder.mutation<AuthUser, LoginPayload>({
      query: payload => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: AuthResponseData }) => response.data.user,
      async onCacheEntryAdded(_, { cacheDataLoaded }) {
        const catchedData = await cacheDataLoaded;
        localStorage.setItem('adminData', JSON.stringify(catchedData.data));
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthenticatedUserQuery, useLoginMutation } = authApi;