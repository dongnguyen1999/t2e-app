import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import BloodBagShadow from '@/assets/images/blood-bag-shadow.svg?react';
import BloodBagVector from '@/assets/images/blood-bag-vector.svg?react';
import useBloodProgress from '@/hooks/useBloodProgress';
import { CountdownContext } from '..';
import useBloodStatus from '@/hooks/useBloodStatus';
import { zeroPad } from 'react-countdown';
import HourglassIcon from '@/assets/icons/icon-hourglass.svg?react';
import { BloodStatus } from '@/constants';

const BloodBagImage: FC = () => {
  const { status } = useBloodStatus();
  const { currentProgress, hours, minutes, seconds, total } = useContext(CountdownContext);
  const { BloodBagImage } = useBloodProgress(status, currentProgress);

  return (<Stack direction="column" justifyContent="center"
    sx={{
      flex: 1,
      borderRadius: 3,
      background: 'linear-gradient(180deg, #CBCCD0 0%, #E7E7E7 54.5%, #E4E4E4 100%)',
      boxShadow: '0px 24px 48px 0px rgba(49, 79, 124, 0.08)',
      position: 'relative',
    }}
  >
    <BloodBagVector width="100%" />
    <Stack
      direction="column"
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <BloodBagImage />
    </Stack>
    <BloodBagShadow style={{ position: 'absolute', bottom: 0, left: 50 }} />
    {(total != 0 && status != BloodStatus.CHARGING) && <Stack
      direction="row"
      gap={0.5}
      px={3}
      py={2}
      position="absolute"
      bottom={12}
      left={12}
      bgcolor="rgba(16, 6, 31, 0.60)"
      borderRadius={6}
      alignItems="center"
    >
      <HourglassIcon style={{ marginTop: -3 }} />
      <Typography variant="body-14-medium" color="text.white" >{hours ? zeroPad(hours) + ' : ' : ''}{minutes ? zeroPad(minutes) + ' : ' : ''}{zeroPad(seconds)} s</Typography>
    </Stack>}
  </Stack>);
};

export default BloodBagImage;