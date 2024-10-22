import { Stack } from '@mui/material';
import { type FC } from 'react';
import UserInfo from '../../components/UserInfo';
import NotificationBell from '@/components/NotificationBell';
import MintedProgress from './components/MintedProgress';
import BloodCard from './components/BloodCard';


const Home: FC = () => {
  return (
    <Stack direction="column" py={3} px={5} gap={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <UserInfo />
        <NotificationBell />
      </Stack>
      <MintedProgress />
      <BloodCard />
    </Stack>
  );
};

export default Home;