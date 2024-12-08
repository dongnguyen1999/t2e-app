import { AuthUser } from '@/api/authApi';
import { useGetNotificationsQuery } from '@/api/notificationApi';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/constants';

const useAdminData = () => {
  const navigate = useNavigate();
  const userData: AuthUser = JSON.parse(localStorage.getItem('adminData') || '{}');
  const { isLoading, error } = useGetNotificationsQuery({
    user_id: userData.id,
    pageSize: 5,
  });

  if (isEmpty(userData) || error) {
    navigate(Pages.LOGIN);
  }

  return {
    isLoading,
    user: userData,
  };
};

export default useAdminData;