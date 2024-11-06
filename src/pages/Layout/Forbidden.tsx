import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { closeMiniApp } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/constants/enums';

const Forbidden: FC = () => {
  const navigate = useNavigate();
  return <Stack direction="column" justifyContent="center" alignItems="center">
    <Typography variant="title-42-medium" py={5} fontWeight="bold" textAlign="center" color="text.primary">
      403 Forbidden
    </Typography>
    <Typography variant="title-24-medium" textAlign="center" color="text.primary">
      You don&apos;t have permission to access this app.
    </Typography>
    <Stack direction="row" gap={3} mt={5}>
      <Button variant="contained" color="primary" onClick={() => navigate(Pages.HOME)}>Retry</Button>
      <Button variant="contained" color="error" onClick={() => closeMiniApp()}>Close</Button>
    </Stack>
  </Stack>;
};

export default Forbidden;