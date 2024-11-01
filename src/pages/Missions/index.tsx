import NotificationBell from '@/components/NotificationBell';
import UserInfo from '@/components/UserInfo';
import { Stack } from '@mui/material';
import { type FC } from 'react';
import MissionFilter from './components/MissionFilter';
import MissionList from './components/MissionList';


const Missions: FC = () => {
  return (
    <Stack 
      direction="column"
      pt={3}
      pb={8}
      px={5}
      gap={8}
      height="100%"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" pb={5}>
        <UserInfo />
        <NotificationBell />
      </Stack>
      <Stack flex={1} gap={8}>
        <MissionFilter />
        <MissionList />
      </Stack>
    </Stack>
  );
};

export default Missions;