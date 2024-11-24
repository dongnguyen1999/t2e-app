// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { unionBy } from 'lodash';

type GetUsersPayload = {
  pageSize: number;
  continuationToken?: string;
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
  endpoints: builder => ({
    getAllUsers: builder.query<GetUsersResponse, GetUsersPayload>({
      query: payload => ({
        url: '/user',
        params: payload,
      }),
      transformResponse: (response: { data: GetUsersResponse }) => response.data,
      merge(currentCacheData, responseData) {
        const mergedMissions = unionBy(
          currentCacheData?.users || [],
          responseData.users,
          'id'
        );

        return {
          ...responseData,
          users: mergedMissions,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery } = userApi;