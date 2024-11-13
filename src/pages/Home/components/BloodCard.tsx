import { Stack, Typography, useTheme } from '@mui/material';
import { FC, useMemo } from 'react';
import BloodBagImage from './BloodBagImage';
import BloodProgressBar from './BloodProgressBar';
import useBloodStatus from '@/hooks/useBloodStatus';
import ClaimButton from './ClaimButton';

const BloodCard: FC = () => {
  const theme = useTheme();
  const { point, countdownValue, progress } = useBloodStatus();

  const message = useMemo(() => {
    if (progress < 50) {
      return 'Donation just started. Blood is being collected to save a life!';
    }
    if (progress < 100) {
      return 'You’re almost there! Keep donating to help save the patient and earn your points.';
    }
    return 'Your donate is complete 🥳 Please Claim within 6 hours to get 100% rewards.';
  } , [progress]);

  return (
    <Stack
      direction="column"
      p={4}
      gap={5}
      borderRadius={3}
      border={`2px solid ${theme.palette.common.white}`}
      bgcolor="background.paper"
      height="100%"
      maxHeight="60vh"
    >
      <Typography variant="body-14-medium" color="text.primary" textAlign="center">{message}</Typography>
      <BloodBagImage />
      <BloodProgressBar />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="column" gap={1}>
          <Typography variant="caption-12-regular" color="text.secondary" >Bag full, claim your reward</Typography>
          <Stack direction="row" gap={1} alignItems="baseline">
            <Typography variant="subtitle-18-medium" color="text.primary" >{point}</Typography>
            <Typography variant="caption-12-regular" color="text.secondary" >X points</Typography>
          </Stack>
        </Stack>
        <ClaimButton disabled={!!countdownValue} />
      </Stack>
    </Stack >);
};

export default BloodCard;