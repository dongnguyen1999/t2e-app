import { useGetAuthenticatedUserQuery } from '@/api/authApi';
import { Pages } from '@/constants/enums';
import { initData } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';
import { createHash } from '@/utils/hashUtils';

const useUserData = () => {
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
    hash: createHash(userPayload, botToken),
  };

  const { isLoading, data, error } = useGetAuthenticatedUserQuery(telegramUserData);

  if (error) {
    navigate(Pages.FORBIDDEN);
  }

  return {
    isLoading,
    user: data,
  };
};

export default useUserData;