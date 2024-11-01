import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import HeartPoint from "@/assets/images/heart-point.svg?react";
import MissionItem from "./MissionItem";

const data = [
  {
    id: 1,
    title: 'Complete 3 missions',
    description: 'Complete 3 missions to earn 3 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image1.png',
    coin: 2,
  },
  {
    id: 2,
    title: 'Complete 5 missions',
    description: 'Complete 5 missions to earn 5 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image2.png',
    coin: 2,
  },
  {
    id: 3,
    title: 'Complete 10 missions',
    description: 'Complete 10 missions to earn 10 heart points',
    point: 0.002,
    image: 'src/assets/images/mission-image3.png',
    coin: 2,
  }
]

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
        maxHeight="64vh"
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          } as React.CSSProperties,
          msOverflowStyle: 'none' as React.CSSProperties,
          scrollbarWidth: 'none' as React.CSSProperties,
        }}
      >
        {data.map((item) => <MissionItem 
          key={item.id}
          title={item.title}
          image={item.image}
          point={item.point}
          coin={item.coin}
        />)}
      </Stack>
    </Stack>
  );
}

export default MissionList;