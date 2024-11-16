import { Stack } from '@mui/material';
import { createContext, type FC } from 'react';
import UserInfo from '../../components/UserInfo';
import NotificationBell from '@/components/NotificationBell';
import MintedProgress from './components/MintedProgress';
import BloodCard from './components/BloodCard';
import { useDispatch } from 'react-redux';
import Countdown from 'react-countdown';
import { authApi } from '@/api/authApi';
import useBloodStatus from '@/hooks/useBloodStatus';

export const CountdownContext = createContext({
  hours: 0,
  minutes: 0,
  seconds: 0,
  currentProgress: 0,
  total: 0,
});

const Home: FC = () => {
  const dispatch = useDispatch();
  const { countdownValue, progress, getExtraProgress, status } = useBloodStatus();

  return (
    <Stack direction="column" pt={3} pb={8} px={5} gap={8} height="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <UserInfo />
        <NotificationBell />
      </Stack>
      <MintedProgress />
      <Countdown
        key={status}
        autoStart
        date={Date.now() + countdownValue}
        onComplete={() => setTimeout(() => dispatch(authApi.util.invalidateTags(['AuthUser'])), 1000)}
        renderer={({ hours, minutes, seconds, total }) => {
          const currentProgress = progress + getExtraProgress(total);
          return (<CountdownContext.Provider value={{ hours, minutes, seconds, currentProgress, total }}><BloodCard /></CountdownContext.Provider>);
        }}
      />

    </Stack>
  );
};

export default Home;