import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import HeartPoint from '@/assets/images/heart-point.svg?react';
import MissionItem from './MissionItem';

const data = [
  {
    id: 1,
    title: 'Complete 3 missions',
    description: 'Complete 3 missions to earn 3 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    token: 2,
  },
  {
    id: 2,
    title: 'Complete 5 missions',
    description: 'Complete 5 missions to earn 5 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image2.png',
    token: 2,
  },
  {
    id: 3,
    title: 'Complete 10 missions',
    description: 'Complete 10 missions to earn 10 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image3.png',
    token: 2,
  },
  {
    id: 4,
    title: 'Complete 15 missions',
    description: 'Complete 15 missions to earn 15 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    token: 2,
  },
  {
    id: 5,
    title: 'Complete 20 missions',
    description: 'Complete 20 missions to earn 20 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image2.png',
    token: 2,
  },
  {
    id: 6,
    title: 'Complete 25 missions',
    description: 'Complete 25 missions to earn 25 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image3.png',
    token: 2,
  },
  {
    id: 7,
    title: 'Complete 30 missions',
    description: 'Complete 30 missions to earn 30 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    token: 2,
  },
  {
    id: 8,
    title: 'Complete 35 missions',
    description: 'Complete 35 missions to earn 35 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image2.png',
    token: 2,
  },
  {
    id: 9,
    title: 'Complete 40 missions',
    description: 'Complete 40 missions to earn 40 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image3.png',
    token: 2,
  },
  {
    id: 10,
    title: 'Complete 45 missions',
    description: 'Complete 45 missions to earn 45 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    token: 2,
  },
  {
    id: 11,
    title: 'Complete 50 missions',
    description: 'Complete 50 missions to earn 50 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image2.png',
    token: 2,
  },
  {
    id: 12,
    title: 'Complete 55 missions',
    description: 'Complete 55 missions to earn 55 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image3.png',
    token: 2,
  },
  {
    id: 13,
    title: 'Complete 60 missions',
    description: 'Complete 60 missions to earn 60 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    token: 2,
  }
];

const MissionList: FC = () => {
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
        maxHeight="calc(100vh - 422px)"
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          } as React.CSSProperties,
          msOverflowStyle: 'none' as React.CSSProperties,
          scrollbarWidth: 'none' as React.CSSProperties,
        }}
      >
        {data.map(item => <MissionItem
          key={item.id}
          title={item.title}
          image={item.image}
          point={item.point}
          token={item.token}
        />)}
      </Stack>
    </Stack>
  );
};

export default MissionList;