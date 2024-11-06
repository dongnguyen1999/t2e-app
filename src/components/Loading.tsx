import { CircularProgress, Stack } from '@mui/material';
import { FC } from 'react';

const Loading: FC = () => {
  return (<Stack width="100%" height="90vh" justifyContent="center" alignItems="center">
    <CircularProgress />
  </Stack>);
};

export default Loading;