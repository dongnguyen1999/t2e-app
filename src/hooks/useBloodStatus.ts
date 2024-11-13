import moment from 'moment';
import useUserData from './useUserData';

const useBloodStatus = () => {
  const { user } = useUserData();
  const mission = user?.mission;
  const countdownPeriod = mission?.cooldown_period || 1;
  const completedAt = moment(mission?.completed_at);

  const countdownValue = Math.max(completedAt.add(countdownPeriod, 'minutes').diff(moment(), 'minutes'), 0);
  const progress = Math.max(100 - (countdownValue / countdownPeriod) * 100, 0);

  return {
    countdownPeriod,
    countdownValue,
    progress,
    point: mission?.point,
    status: mission?.status,
    type: mission?.type,
    completedAt,
  };
};

export default useBloodStatus;