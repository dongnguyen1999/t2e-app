import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { closeMiniApp, initData } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/constants/enums';
import { createHash } from '@/utils/hashUtils';

const Forbidden: FC = () => {
  const navigate = useNavigate();
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const userPayload = {
    id: initData.user()?.id?.toString(),
    first_name: initData.user()?.firstName,
    last_name: initData.user()?.lastName,
    username: initData.user()?.username,
    auth_date: Math.floor((initData.authDate()?.getTime() || 0) / 1000),
  };

  const telegramUserData = {
    ...userPayload,
    hash: createHash(userPayload, botToken)
  };
  return <Stack direction="column" justifyContent="center" alignItems="center">
    <Typography variant="title-42-medium" py={5} fontWeight="bold" textAlign="center" color="text.primary">
      403 Forbidden
    </Typography>
    <Typography variant="title-24-medium" textAlign="center" color="text.primary">
      You don&apos;t have permission to access this app.
    </Typography>
    <Typography variant="body1" textAlign="center" color="text.secondary">
      Tried to call auth API with the following data:
    </Typography>
    <Typography variant="body1" textAlign="center" color="text.secondary" py={1} width="100%" sx={{ wordBreak: 'break-word' }}>
      {JSON.stringify(telegramUserData, null, 2)}
    </Typography>
    <Stack direction="row" gap={3} mt={5}>
      <Button variant="contained" color="primary" onClick={() => navigate(Pages.HOME)}>Retry</Button>
      <Button variant="contained" color="error" onClick={() => closeMiniApp()}>Close</Button>
    </Stack>
  </Stack>;
};

export default Forbidden;