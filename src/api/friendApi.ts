// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type GetFriendPayload = {
  continuationToken?: string;
}

type SearchFriendPayload = {
  name?: string;
  continuationToken?: string;
}

type CreateFriendInvitationPayload = {
  friend_user_ids: string[];
  message: string;
}

export type Friend = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  auth_date: number;
  created_at: string;
  updated_at: string;
}

type FriendResponse = {
  friends: Friend[];
  continuationToken: string;
}

// Define a service using a base URL and expected endpoints
export const friendApi = createApi({
  reducerPath: 'friendApi',
  baseQuery,
  tagTypes: ['Friends'],
  endpoints: builder => ({
    getFriends: builder.query<FriendResponse, GetFriendPayload>({
      query: payload => ({
        url: '/friend',
        params: payload,
      }),
      transformResponse: (response: { data: FriendResponse }) => response.data,
      providesTags: ['Friends'],
    }),
    searchFriends: builder.query<FriendResponse, SearchFriendPayload>({
      query: payload => ({
        url: '/friend/search',
        params: payload,
      }),
      transformResponse: (response: { data: FriendResponse }) => response.data,
      providesTags: ['Friends'],
    }),
    createFriendInvatation: builder.mutation<void, CreateFriendInvitationPayload>({
      query: payload => ({
        url: '/friend',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Friends'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetFriendsQuery, useLazySearchFriendsQuery, useCreateFriendInvatationMutation } = friendApi;