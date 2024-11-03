import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import BloodBagShadow from '@/assets/images/blood-bag-shadow.svg?react';
import BloodBagVector from '@/assets/images/blood-bag-vector.svg?react';
import BloodBadEmpty from '@/assets/images/blood-bag-empty.svg?react';
import HourglassIcon from '@/assets/icons/icon-hourglass.svg?react';

const BloodBagImage: FC = () => {
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
      <BloodBadEmpty />
    </Stack>
    <BloodBagShadow style={{ position: 'absolute', bottom: 0, left: 50 }} />
    <Stack
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
      <Typography variant="body-14-medium" color="text.white" >4h : 40m : 03s</Typography>
    </Stack>
  </Stack>);
};

export default BloodBagImage;