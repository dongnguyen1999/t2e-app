import { useMemo } from 'react';
import BloodBagEmpty from '@/assets/images/blood-bag-empty.svg?react';
import BloodBagHalf from '@/assets/images/blood-bag-half.svg?react';
import BloodBagFull from '@/assets/images/blood-bag-full.svg?react';
import BloodBagDraining1 from '@/assets/images/blood-bag-draining1.svg?react';
import BloodBagDraining2 from '@/assets/images/blood-bag-draining2.svg?react';
import BloodBagDraining3 from '@/assets/images/blood-bag-draining3.svg?react';
import BloodBagSpoiled from '@/assets/images/blood-bag-spoiled.svg?react';
import { BloodStatus } from '@/constants/enums';
import { round } from 'lodash';

const useBloodProgress = (status: BloodStatus, progress: number) => {
  const mainMessage = useMemo(() => {
    if (status === BloodStatus.CHARGING) {
      if (progress < 50) {
        return 'Donation just started. Blood is being collected to save a life!';
      }
      if (progress < 100) {
        return 'You’re almost there! Keep donating to help save the patient and earn your points.';
      }
      return 'Your donate is complete 🥳 Please Claim within 6 hours to get 100% rewards.';
    }
    if (status === BloodStatus.DRAINING) {
      if (progress < 20) {
        return 'Act fast! Only 20% left before the blood is unusable 😅';
      }
      if (progress < 50) {
        return 'Blood quality is decreasing! Claim now before it drops further.';
      }
      if (progress < 70) {
        return 'Hurry! The blood is starting to spoil. Claim now for maximum points!';
      }
      return 'Blood bag is draining 🧐 Claim your points now before the blood starts to spoil.';
    }
    if (status === BloodStatus.SPOILING) {
      return 'Start a new cycle to earn points again. It will begin in a few minutes.';
    }
    return '';
  } , [progress]);

  const claimMessage = useMemo(() => {
    if (status === BloodStatus.CHARGING) {
      if (progress < 100) {
        return 'Blood will ready for use in';
      }
      return 'Blood is ready for use now!';
    }
    if (status === BloodStatus.DRAINING) {
      return `${round(progress)}% of blood still usable`;
    }
    if (status === BloodStatus.SPOILING) {
      return 'The blood is completely spoiled';
    }
    return '';
  }, [progress]);

  const BloodBagImage = useMemo(() => {
    if (status === BloodStatus.CHARGING) {
      if (progress < 50) {
        return BloodBagEmpty;
      }
      if (progress < 100) {
        return BloodBagHalf;
      }
      return BloodBagFull;
    }
    if (status === BloodStatus.DRAINING) {
      if (progress < 50) {
        return BloodBagDraining3;
      }
      if (progress < 70) {
        return BloodBagDraining2;
      }
      return BloodBagDraining1;
    }
    if (status === BloodStatus.SPOILING) {
      return BloodBagSpoiled;
    }
    return BloodBagEmpty;
  }, [progress]);

  const progressColor = useMemo(() => {
    if (status === BloodStatus.CHARGING) {
      return 'error.main';
    }
    if (status === BloodStatus.DRAINING) {
      return 'error.main';
    }
    if (status === BloodStatus.SPOILING) {
      return 'grey.500';
    }
    return 'primary.main';
  }, []);

  const progressBgColor = useMemo(() => {
    if (status === BloodStatus.CHARGING) {
      return 'error.light';
    }
    if (status === BloodStatus.DRAINING) {
      return 'error.dark';
    }
    if (status === BloodStatus.SPOILING) {
      return 'grey.600';
    }
    return 'primary.main';
  }, []);

  return {
    mainMessage,
    claimMessage,
    BloodBagImage,
    progressColor,
    progressBgColor
  };
};

export default useBloodProgress;