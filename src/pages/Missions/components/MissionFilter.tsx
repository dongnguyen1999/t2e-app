import { Stack } from '@mui/material';
import { FC } from 'react';
import MissionFilterItem from './MissionFilterItem';
import { MissionFilterType } from '@/constants/enums';
import useUserData from '@/hooks/useUserData';
// import ConnectWalletButton from "./ConnectWalletButton";

type Props = {
  filter: number;
  setFilter: (filter: number) => void;
}

const MissionFilter: FC<Props> = ({ filter, setFilter }: Props) => {
  const { user } = useUserData();
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      gap={5}
    >
      {/* <ConnectWalletButton /> */}
      <MissionFilterItem
        type={MissionFilterType.COMPLETED}
        count={user?.count_completed_mission || 0}
        selected={filter === MissionFilterType.COMPLETED}
        onClick={() => setFilter(MissionFilterType.COMPLETED)}
      />
      <MissionFilterItem
        type={MissionFilterType.REMAINING}
        count={user?.count_remaining_mission || 0}
        selected={filter === MissionFilterType.REMAINING}
        onClick={() => setFilter(MissionFilterType.REMAINING)}
      />
    </Stack>
  );
};

export default MissionFilter;