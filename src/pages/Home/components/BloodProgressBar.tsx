import { Box, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import BloodBarProgress from '@/assets/images/blood-bar-progress.svg?react';
import useBloodStatus from '@/hooks/useBloodStatus';
import Countdown from 'react-countdown';

const BloodProgressBar: FC = () => {
  const { countdownValue, progress } = useBloodStatus();

  const message = useMemo(() => {
    if (countdownValue) {
      return 'Blood will ready for use in';
    }
    return 'Blood is ready for use now!';
  }, [countdownValue]);


  return <Countdown
    date={Date.now() + (countdownValue * 60000)}
    renderer={({ hours, minutes, seconds }) => (<Stack direction="column" gap={2}>
      <Stack direction="row" gap={1}>
        <Typography variant="body-14-regular" color="text.primary" >{message}</Typography>
        {countdownValue && <Typography variant="body-14-medium" color="primary.main">
          {hours ? hours + ' : ' : ''}{minutes ? minutes + ' : ' : ''}{seconds} s
        </Typography>}
      </Stack>
      <Box border="solid 2px white" borderRadius={8} bgcolor="error.light" height={28}>
        <Stack direction="row" gap={0}>
          <Box
            sx={{
              width: `${Math.min(progress + 3, 100)}%`,
              height: 24,
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
              borderTopRightRadius: progress === 100 ? 32 : 0,
              borderBottomRightRadius: progress === 100 ? 32 : 0,
              bgcolor: 'error.main',
            }}
          />
          {progress < 100 && <BloodBarProgress height={33} style={{ marginTop: -4, marginLeft: -1 }} />}
        </Stack>
      </Box>
    </Stack>)}
  />;
};

export default BloodProgressBar;