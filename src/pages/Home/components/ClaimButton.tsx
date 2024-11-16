import { authApi } from '@/api/authApi';
import { useClaimMissionMutation } from '@/api/missionApi';
import useUserData from '@/hooks/useUserData';
import { Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  disabled?: boolean;
}

const ClaimButton = ({ disabled }: Props) => {
  const { user } = useUserData();
  const dispatch = useDispatch();
  const [claimMission, { isLoading }] = useClaimMissionMutation();
  const finalDisabled = disabled || isLoading;

  const handleClaim = useCallback(() => {
    if (user) {
      claimMission({ mission_id: user.mission.id, user_id: user.id }).unwrap().then(() => {
        dispatch(authApi.util.invalidateTags(['AuthUser']));
      });
    }
  }, [user]);

  return ( <Button
    variant="contained"
    color="primary"
    sx={{
      borderRadius: 3,
      px: 5,
      py: 2.5,
      background: 'var(--Linear-1, linear-gradient(270deg, #FF8227 25.79%, #FF6100 87.37%))',
      opacity: finalDisabled ? 0.2 : 1,
    }}
    onClick={handleClaim}
    disabled={finalDisabled}
  ><Typography variant="body-14-medium" textTransform="capitalize">Claim</Typography></Button>);
};

export default ClaimButton;