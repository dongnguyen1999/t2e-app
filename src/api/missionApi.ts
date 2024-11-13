// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

type ClaimMissionPayload = {
  mission_id: string;
  user_id: string;
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useClaimMissionMutation } = missionApi;