// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type GetUsersPayload = {
  pageSize: number;
  continuationToken?: string;
}

type SearchUsersPayload = {
  name?: string;
  pageSize: number;
  continuationToken?: string;
}

type UpsertUserPayload = {
  username: string;
  first_name: string;
  last_name: string;
}

export type User = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  auth_date: number;
  password?: string;
}

type GetUsersResponse = {
  users: User[];
  continuationToken: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['Users', 'User'],
  endpoints: builder => ({
    getUserById: builder.query<User, string>({
      query: id => ({
        url: '/user',
        params: { id },
      }),
      providesTags: ['User'],
    }),
    getAllUsers: builder.query<GetUsersResponse, GetUsersPayload>({
      query: payload => ({
        url: '/user',
        params: payload,
      }),
      transformResponse: (response: { data: GetUsersResponse }) => response.data,
      providesTags: ['Users'],
    }),
    searchUsers: builder.query<GetUsersResponse, SearchUsersPayload>({
      query: payload => ({
        url: '/user/search',
        params: payload,
      }),
      transformResponse: (response: { data: GetUsersResponse }) => response.data,
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User, UpsertUserPayload>({
      query: payload => ({
        url: '/user',
        method: 'POST',
        body: {
          ...payload,
          auth_date: Date.now() / 1000,
        },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useLazySearchUsersQuery, useCreateUserMutation, useGetUserByIdQuery } = userApi;