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
  name: string;
  email: string;
  avatar: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: builder => ({
    getAuthenticatedUser: builder.query<AuthUser, AuthUserPayload>({
      query: payload => ({
        url: '/auth',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAuthenticatedUserQuery } = userApi;