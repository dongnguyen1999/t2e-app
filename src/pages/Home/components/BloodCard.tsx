import { Stack, Typography, useTheme } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import useBloodStatus from '@/hooks/useBloodStatus';
import BloodBagImage from './BloodBagImage';
import BloodProgressBar from './BloodProgressBar';
import ClaimButton from './ClaimButton';
import useBloodProgress from '@/hooks/useBloodProgress';
import { CountdownContext } from '..';
import { BloodStatus } from '@/constants';
import { round } from 'lodash';

const BloodCard: FC = () => {
  const theme = useTheme();
  const { point = 0, status } = useBloodStatus();
  const { currentProgress } = useContext(CountdownContext);
  const { mainMessage } = useBloodProgress(status, currentProgress);

  const rewardPoint = useMemo(() => {
    if (status == BloodStatus.CHARGING) {
      return point;
    }
    if (status == BloodStatus.DRAINING) {
      return currentProgress * point / 100;
    }
    return 0;
  }, [currentProgress, status, point]);

  return <Stack
    direction="column"
    p={4}
    gap={5}
    borderRadius={3}
    border={`2px solid ${theme.palette.common.white}`}
    bgcolor="background.paper"
    height="100%"
    maxHeight="60vh"
  >
    <Typography variant="body-14-medium" color="text.primary" textAlign="center">{mainMessage}</Typography>
    <BloodBagImage />
    <BloodProgressBar />
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="column" gap={1}>
        <Typography variant="caption-12-regular" color="text.secondary" >Bag full, claim your reward</Typography>
        <Stack direction="row" gap={1} alignItems="baseline">
          {rewardPoint != point && <Typography
            variant="subtitle-18-medium"
            color="text.disabled"
            sx={{
              textDecoration: 'line-through',
            }}
          >{round(point, 3)}</Typography>}
          <Typography variant="subtitle-18-medium" color="text.primary" >{round(rewardPoint == point ? point : rewardPoint, 3) || '0.00'}</Typography>
          <Typography variant="caption-12-regular" color="text.secondary" >X points</Typography>
        </Stack>
      </Stack>
      <ClaimButton disabled={status != BloodStatus.DRAINING} />
    </Stack>
  </Stack>;
};

export default BloodCard;