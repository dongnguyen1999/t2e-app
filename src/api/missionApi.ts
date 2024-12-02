// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type ClaimMissionPayload = {
  mission_id: string;
  user_id: string;
}

type GetMissionsPayload = {
  type: number;
  pageSize: number;
  continuationToken?: string;
}

export type Mission = {
  id: string;
  name: string;
  description: string;
  status: number;
  type: number;
  point: number;
  user_mission_status?: number;
  completed_at?: string;
  cooldown_period?: number;
}

export type GetMissionsResponse = {
  missions: Mission[];
  continuationToken: string;
}

// Define a service using a base URL and expected endpoints
export const missionApi = createApi({
  reducerPath: 'missionApi',
  baseQuery,
  endpoints: builder => ({
    claimMission: builder.mutation<void, ClaimMissionPayload>({
      query: payload => ({
        url: '/mission/user',
        method: 'POST',
        body: payload,
      }),
      // transformResponse: (response: { data:  }) => response.data,
    }),
    getMissions: builder.query<GetMissionsResponse, GetMissionsPayload>({
      query: payload => ({
        url: '/mission',
        params: payload,
      }),
      transformResponse: (response: { data: GetMissionsResponse }) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useClaimMissionMutation, useLazyGetMissionsQuery } = missionApi;