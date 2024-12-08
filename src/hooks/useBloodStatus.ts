import moment from 'moment';
import useUserData from './useUserData';
import { useCallback, useMemo } from 'react';
import { BloodStatus } from '@/constants';
import { floor } from 'lodash';

const useBloodStatus = () => {
  const { user } = useUserData();
  const mission = user?.mission;
  const countdownPeriod = mission?.cooldown_period || 1;
  const spoilingPeriod = 0.5;

  const { status, startTime } = useMemo(() => {
    if (!mission?.completed_at) {
      return { status: BloodStatus.SPOILING, startTime: moment() };
    }

    const completedAt = moment.utc(mission.completed_at);
    const now = moment.utc();
    const totalPeriod = countdownPeriod * 120 + spoilingPeriod * 60; // Convert to seconds
    const timeDiff = now.diff(completedAt, 'seconds'); // Use seconds
    const cyclePosition = timeDiff % totalPeriod;

    let status: BloodStatus;
    let startTime: moment.Moment;

    if (cyclePosition < countdownPeriod * 60) { // Convert to seconds
      status = BloodStatus.CHARGING;
      startTime = completedAt.clone().add(floor(timeDiff / totalPeriod) * totalPeriod, 'seconds');
    } else if (cyclePosition < countdownPeriod * 120) { // Convert to seconds
      status = BloodStatus.DRAINING;
      startTime = completedAt.clone().add(floor(timeDiff / totalPeriod) * totalPeriod + countdownPeriod * 60, 'seconds');
    } else {
      status = BloodStatus.SPOILING;
      startTime = completedAt.clone().add(floor(timeDiff / totalPeriod) * totalPeriod + countdownPeriod * 120, 'seconds');
    }

    return { status, startTime };
  }, [countdownPeriod, spoilingPeriod, user]);

  const countdownValue = useMemo(() => {
    const now = moment();
    let period = countdownPeriod * 60; // Convert to seconds
    if (status === BloodStatus.SPOILING) {
      period = spoilingPeriod * 60; // Convert to seconds
    }
    return Math.max(startTime.clone().add(period, 'seconds').diff(now, 'milliseconds'), 0);
  }, [status, startTime, countdownPeriod, spoilingPeriod]);

  const progress = useMemo(() => {
    let period = countdownPeriod * 60; // Convert to seconds
    if (status === BloodStatus.SPOILING) {
      period = spoilingPeriod * 60; // Convert to seconds
    }
    const elapsed = (period * 1000) - countdownValue;
    if (status === BloodStatus.CHARGING) {
      return (elapsed / (period * 1000)) * 100;
    }
    return (countdownValue / (period * 1000)) * 100;
  }, [status, countdownValue, countdownPeriod, spoilingPeriod]);

  const getExtraProgress = useCallback((milliseconds: number) => {
    if (status === BloodStatus.CHARGING) {
      return ((100 - progress) / countdownValue) * (countdownValue - milliseconds);
    }
    return (-progress / countdownValue) * (countdownValue - milliseconds);
  }, [status, countdownValue, countdownPeriod, progress, spoilingPeriod]);

  return {
    countdownPeriod,
    countdownValue,
    progress,
    point: mission?.point,
    getExtraProgress,
    status
  };
};

export default useBloodStatus;