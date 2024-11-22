import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import SwitchHorizontalIcon from '@/assets/icons/icon-outline-switch-horizontal.svg?react';
import MedxToken from '@/assets/images/medx-token.svg?react';

type Props = {
  title: string;
  image: ReactNode;
  point: number;
  token: number;
}

const MissionItem: FC<Props> = ({ title, image, point, token } : Props) => {
  return (<Box p={3} borderRadius={3} bgcolor="background.paper" border="solid 2px white">
    <Stack direction="row" gap={3}>
      <Box
        height={48}
        width={48}
        borderRadius="50%"
        bgcolor="grey.200"
      >
        {image}
      </Box>
      <Stack direction="column">
        <Typography variant="body-16-regular" color="text.primary">{title}</Typography>
        <Stack direction="row" gap={3} alignItems="center">
          <Typography variant="body-14-regular" color="text.secondary">+{point} P</Typography>
          <SwitchHorizontalIcon />
          <Stack direction="row" gap={1} alignItems="center">
            <MedxToken width={16} height={16} style={{ marginTop: -4 }} />
            <Typography variant="body-14-medium" color="primary">{token}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Box>);
};

export default MissionItem;