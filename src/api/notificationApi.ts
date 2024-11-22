// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type GetNotificationsPayload = {
  pageSize: number;
  user_id: string;
}

// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery,
  endpoints: builder => ({
    getNotifications: builder.query<void, GetNotificationsPayload>({
      query: payload => ({
        url: '/notification',
        params: payload,
      }),
      // transformResponse: (response: { data:  }) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetNotificationsQuery, useGetNotificationsQuery } = notificationApi;