import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import HeartPoint from '@/assets/images/heart-point.svg?react';
import { useLazyGetMissionsQuery } from '@/api/missionApi';
import MissionImage1 from '@/assets/images/mission-image1.svg?react';
import MissionImage2 from '@/assets/images/mission-image2.svg?react';
import MissionImage3 from '@/assets/images/mission-image3.svg?react';
import { debounce, map } from 'lodash';
import MissionItem from './MissionItem';

const missionImpagePool = [MissionImage1, MissionImage2, MissionImage3];

const MissionList: FC = () => {
  const [getMissions, { isLoading, data }] = useLazyGetMissionsQuery();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMissions({
      type: 1,
      pageSize: 10
    });
  }, []);

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        onScrollEnd();
      }
    }
  };

  const onScrollEnd = () => {
    if (data?.continuationToken) {
      getMissions({
        type: 1,
        pageSize: 10,
        continuationToken: data.continuationToken
      });
    }
  };

  return (
    <Stack direction="column" gap={3} flex={1}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="body-14-regular" color="text.primary" textAlign="center">
          Complete them for future benefits
        </Typography>
        <HeartPoint />
      </Stack>
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
        onScroll={debounce(handleScroll, 500)}
        ref={listRef}
      >
        {isLoading && (
          <Stack width="100%" height="50vh" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {!isLoading && !!data && map(data.missions, (mission, index) => {
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