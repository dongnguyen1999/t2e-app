import { Stack } from '@mui/material';
import { FC } from 'react';
import MissionFilterItem from './MissionFilterItem';
import { MissionFilterType } from '@/constants/enums';
// import ConnectWalletButton from "./ConnectWalletButton";

const MissionFilter: FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      gap={5}
    >
      {/* <ConnectWalletButton /> */}
      <MissionFilterItem type={MissionFilterType.COMPLETED} count={10} selected />
      <MissionFilterItem type={MissionFilterType.REMAINING} count={10} />
    </Stack>
  );
};

export default MissionFilter;