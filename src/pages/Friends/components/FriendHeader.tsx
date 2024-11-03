import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import PointIcon from '@/assets/icons/icon-point.svg?react';
import SwitchHorizontalIcon from '@/assets/icons/icon-outline-switch-horizontal.svg?react';
import MedxToken from '@/assets/images/medx-token.svg?react';

type Props = {
  data?: {
    avatar: ReactNode,
    point: number,
    token: number
  }
}

const FriendHeader: FC<Props> = ({ data }: Props) => {
  return <Box>
    {data ? <Stack direction="row" gap={3}>
      <Box width={40} height={40}>
        {data.avatar}
      </Box>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={1.5}>
        <Stack direction="row" alignItems="center">
          <PointIcon style={{ marginTop: -6 }} />
          <Typography variant="subtitle-20-medium" color="text.primary">{data.point}</Typography>
        </Stack>
        <SwitchHorizontalIcon />
        <Stack direction="row" alignItems="center">
          <MedxToken style={{ marginTop: -4 }} />
          <Typography variant="subtitle-20-medium" color="primary">{data.token}</Typography>
        </Stack>
      </Stack>
    </Stack> : <Stack direction="column" gap={1}>
      <Typography variant="subtitle-18-medium" color="text.primary">Good Morning, Jay</Typography>
      <Typography variant="code-14-regular" color="text.primary">Let’s receive the point you see!</Typography>
    </Stack>}
  </Box>;
};

export default FriendHeader;