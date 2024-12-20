import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import CirularProgressIcon from '@/assets/icons/icon-circular-progress.svg?react';
import MedxToken from '@/assets/images/medx-token.svg?react';
import InformationCircleIcon from '@/assets/icons/icon-outline-information-circle.svg?react';
import useUserData from '@/hooks/useUserData';
import { round } from 'lodash';

const MintedProgress: FC = () => {
  const { user } = useUserData();
  const resource = user?.resource;
  const minetedProgress = round(resource?.total_tokens ? ((resource.total_assets * resource.ratio) / resource.total_tokens) * 100 : 0);
  return (<Stack direction="row" gap={3} bgcolor="background.paper" borderRadius={3}>
    <Box
      p={1.5}
      position="relative"
      width={49}
      height={48}
      bgcolor="common.white"
      sx={{
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
      }}
    >
      <CirularProgressIcon />
      <CircularProgress
        variant="determinate"
        value={minetedProgress}
        size={29}
        thickness={8}
        sx={{
          color: theme => theme.palette.primary.main,
          position: 'absolute',
          top: 9,
          left: 10
        }}
      />
    </Box>
    <Stack direction="column" gap={1.5} justifyContent="center">
      <Stack direction="row">
        <Typography variant="caption-12-medium" color="primary.main" >{minetedProgress}%</Typography>
        <MedxToken width={16} height={16} />
        <Typography variant="caption-12-medium" color="primary.main" >MEDX minted!</Typography>
      </Stack>
      <Stack direction="row" gap={2}>
        <Typography variant="caption-10-regular" color="text.secondary" >Earning to teach 100% to launchon exchanges</Typography>
        <InformationCircleIcon />
      </Stack>
    </Stack>
  </Stack>);
};

export default MintedProgress;