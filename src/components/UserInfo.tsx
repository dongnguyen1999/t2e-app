import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import Avatar from '@/assets/images/avatar.svg?react';
import MedxToken from '@/assets/images/medx-token.svg?react';

const UserInfo: FC = () => {
  const theme = useTheme();
  return (<Stack
    direction="row"
    gap={3}
    p={3}
    borderRadius={8}
    border={`solid 2px ${theme.palette.common.white}`}
    bgcolor="background.paper"
  >
    <Stack direction="row" gap={1.5}>
      <Box
        width={34}
        height={34}
        borderRadius="50%"
        border={`solid 1px ${theme.palette.grey[500]}`}
        boxSizing="border-box"
        mt={-0.5}
      >
        <Avatar />
      </Box>
      <Stack direction="column" gap={0.5}>
        <Typography variant="caption-8-regular" color="text.disabled" >Total Assets</Typography>
        <Stack direction="row" alignItems="baseline" gap={0.5}>
          <Typography variant="body-14-medium" color="text.primary" >0.2560</Typography>
          <Typography variant="caption-8-regular" color="text.disabled" >X points</Typography>
        </Stack>
      </Stack>
    </Stack>
    <Stack direction="column" gap={0.5}>
      <Typography variant="caption-8-regular" color="text.disabled" >Total tokens</Typography>
      <Stack direction="row">
        <MedxToken style={{ marginTop: -2 }} />
        <Stack direction="row" gap={0.5} alignItems="baseline">
          <Typography variant="body-14-medium" color="text.primary" >15</Typography>
          <Typography variant="caption-8-regular" color="text.disabled" >MEDX</Typography>
        </Stack>
      </Stack>
    </Stack>
  </Stack>);
};

export default UserInfo;