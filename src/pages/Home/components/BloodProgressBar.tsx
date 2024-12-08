import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC, useContext } from 'react';
import BloodBarProgress from '@/assets/images/blood-bar-progress.svg?react';
import { zeroPad } from 'react-countdown';
import { CountdownContext } from '..';
import useBloodProgress from '@/hooks/useBloodProgress';
import useBloodStatus from '@/hooks/useBloodStatus';
import { get } from 'lodash';
import { BloodStatus } from '@/constants';

const BloodProgressBar: FC = () => {
  const theme = useTheme();
  const { status } = useBloodStatus();
  const { hours, minutes, seconds, currentProgress, total } = useContext(CountdownContext);
  const { claimMessage, progressColor, progressBgColor } = useBloodProgress(status, currentProgress);

  return (<Stack direction="column" gap={2}>
    <Stack direction="row" gap={1}>
      <Typography variant="body-14-regular" color="text.primary" >{claimMessage}</Typography>
      {(total != 0 && status == BloodStatus.CHARGING) && <Typography variant="body-14-medium" color="primary.main">
        {hours ? zeroPad(hours) + ' : ' : ''}{minutes ? zeroPad(minutes) + ' : ' : ''}{zeroPad(seconds)} s
      </Typography>}
    </Stack>
    <Box border="solid 2px white" borderRadius={8} bgcolor={progressBgColor} height={28}>
      <Stack direction="row" gap={0}>
        <Box
          sx={{
            width: `${Math.min(currentProgress + 3, 100)}%`,
            height: 24,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            borderTopRightRadius: currentProgress === 100 ? 32 : 0,
            borderBottomRightRadius: currentProgress === 100 ? 32 : 0,
            bgcolor: progressColor,
            transition: 'width 0.5s ease-in-out', // Added transition for smooth animation
          }}
        />
        {currentProgress < 100 && <BloodBarProgress height={31} style={{ marginTop: -5, marginLeft: -1, fill: get(theme.palette, progressColor) }} />}
      </Stack>
    </Box>
  </Stack>);
};

export default BloodProgressBar;