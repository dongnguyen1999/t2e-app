import { LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import HeartPoint from '@/assets/images/heart-point.svg?react';
import { Mission, useLazyGetMissionsQuery } from '@/api/missionApi';
import MissionImage1 from '@/assets/images/mission-image1.svg?react';
import MissionImage2 from '@/assets/images/mission-image2.svg?react';
import MissionImage3 from '@/assets/images/mission-image3.svg?react';
import { map } from 'lodash';
import MissionItem from './MissionItem';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';

const missionImpagePool = [MissionImage1, MissionImage2, MissionImage3];

// const data = {
//   missions: [
//     {
//       id: '1',
//       name: 'Complete 3 missions',
//       description: 'Complete 3 missions to earn 3 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '2',
//       name: 'Complete 5 missions',
//       description: 'Complete 5 missions to earn 5 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '3',
//       name: 'Complete 10 missions',
//       description: 'Complete 10 missions to earn 10 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '4',
//       name: 'Complete 15 missions',
//       description: 'Complete 15 missions to earn 15 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '5',
//       name: 'Complete 20 missions',
//       description: 'Complete 20 missions to earn 20 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '6',
//       name: 'Complete 25 missions',
//       description: 'Complete 25 missions to earn 25 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '7',
//       name: 'Complete 30 missions',
//       description: 'Complete 30 missions to earn 30 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '8',
//       name: 'Complete 35 missions',
//       description: 'Complete 35 missions to earn 35 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '9',
//       name: 'Complete 40 missions',
//       description: 'Complete 40 missions to earn 40 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '10',
//       name: 'Complete 45 missions',
//       description: 'Complete 45 missions to earn 45 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '11',
//       name: 'Complete 50 missions',
//       description: 'Complete 50 missions to earn 50 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '12',
//       name: 'Complete 55 missions',
//       description: 'Complete 55 missions to earn 55 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     },
//     {
//       id: '13',
//       name: 'Complete 60 missions',
//       description: 'Complete 60 missions to earn 60 heart points',
//       status: 1,
//       type: 1,
//       point: 0.002,
//       user_mission_status: 0,
//       completed_at: null,
//       cooldown_period: null,
//     }
//   ]
// };

type Props = {
  filter: number;
}

const MissionList: FC<Props> = ({ filter }: Props) => {
  const { listRef, isFetching, data } = useInfiniteScroll<Mission>(
    useLazyGetMissionsQuery as UseLazyQuery,
    {
      pageSize: 10,
      type: filter,
    },
    'missions'
  );

  return (
    <Stack direction="column" gap={3} flex={1}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="body-14-regular" color="text.primary" textAlign="center">
          Complete them for future benefits
        </Typography>
        <HeartPoint />
      </Stack>
      {isFetching && (
        <Stack width="100%">
          <LinearProgress />
        </Stack>
      )}
      <Stack
        direction="column"
        gap={3}
        flex={1}
        maxHeight="calc(100vh - 340px)"
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          } as React.CSSProperties,
          msOverflowStyle: 'none' as React.CSSProperties,
          scrollbarWidth: 'none' as React.CSSProperties,
        }}
        ref={listRef}
      >
        {!!data && map(data, (mission, index) => {
          const MissionImage = missionImpagePool[index % 3];
          return (
            <MissionItem
              key={mission.id}
              title={mission.name}
              image={<MissionImage />}
              point={mission.point}
              token={0}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default MissionList;