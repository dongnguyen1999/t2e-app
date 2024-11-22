// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { unionBy } from 'lodash';

type ClaimMissionPayload = {
  mission_id: string;
  user_id: string;
}

type GetMissionsPayload = {
  type: number;
  pageSize: number;
  continuationToken?: string;
}

type Mission = {
  id: string;
  name: string;
  description: string;
  status: number;
  type: number;
  point: number;
  user_mission_status: number;
  completed_at: string | null;
  cooldown_period: string | null;
}

type GetMissionsResponse = {
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
      merge(currentCacheData, responseData) {
        const mergedMissions = unionBy(
          currentCacheData?.missions || [],
          responseData.missions,
          'id'
        );

        return {
          ...responseData,
          missions: mergedMissions,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useClaimMissionMutation, useLazyGetMissionsQuery } = missionApi;