import Loading from '@/components/Loading';
import { Pages } from '@/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('adminData');
    navigate(Pages.LOGIN);
  }, []);

  return <Loading />;
};

export default Logout;