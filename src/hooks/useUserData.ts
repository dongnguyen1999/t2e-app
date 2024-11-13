import { useGetAuthenticatedUserQuery } from '@/api/authApi';
import { Pages } from '@/constants/enums';
import { initData } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';

const useUserData = () => {
  const navigate = useNavigate();

  const telegramUserData = {
    id: initData.user()?.id?.toString(),
    first_name: initData.user()?.firstName,
    last_name: initData.user()?.lastName,
    username: initData.user()?.username,
    auth_date: Math.floor((initData.authDate()?.getTime() || 0) / 1000),
    hash: initData.hash(),
  };

  console.warn('telegramUserData', telegramUserData);

  const { isLoading, data, error } = useGetAuthenticatedUserQuery(telegramUserData);

  if (error) {
    navigate(Pages.FORBIDDEN);
  }

  return {
    isLoading,
    user: data?.user,
    token: data?.token,
  };
};

export default useUserData;