// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type GetNotificationsPayload = {
  pageSize: number;
  user_id: string;
  continuationToken?: string;
}

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  status: number;
  type: number;
  created_at: string;
  updated_at: string;
};

type GetNotificationsResponse = {
  notifications: Notification[];
  continuationToken: string;
};

// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  endpoints: builder => ({
    getNotificationById: builder.query<Notification, string>({
      query: id => ({
        url: '/notification',
        params: { id },
      }),
    }),
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsPayload>({
      query: payload => ({
        url: '/notification',
        params: payload,
      }),
      transformResponse: (response: { data: { notifications: GetNotificationsResponse } }) => response.data.notifications,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetNotificationsQuery, useGetNotificationsQuery, useGetNotificationByIdQuery } = notificationApi;