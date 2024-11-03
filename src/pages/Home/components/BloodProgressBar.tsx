import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import BloodBarProgress from '@/assets/images/blood-bar-progress.svg?react';

const BloodProgressBar: FC = () => {
  return (<Stack direction="column" gap={2}>
    <Typography variant="body-14-regular" color="text.primary" >80% of blood still usable
      <Typography variant="body-14-medium" color="primary.main">05 : 59 : 00 s</Typography>
    </Typography>
    <Box border="solid 2px white" borderRadius={8} bgcolor="error.light" height={28}>
      <Stack direction="row" gap={0}>
        <Box
          sx={{
            width: '30%',
            height: 24,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            bgcolor: 'error.main',
          }}
        />
        <BloodBarProgress height={34} style={{ marginTop: -5, marginLeft: -1 }} />
      </Stack>
    </Box>
  </Stack>);
};

export default BloodProgressBar;