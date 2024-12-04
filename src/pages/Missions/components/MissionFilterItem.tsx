import { Box, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

import CheckCircleIcon from '@/assets/icons/icon-outline-check-circle.svg?react';
import AnnotationIcon from '@/assets/icons/icon-outline-annotation.svg?react';
import { MissionFilterType } from '@/constants/enums';

const missionFilterConfig = {
  [MissionFilterType.COMPLETED]: {
    icon: CheckCircleIcon,
    label: 'Completed',
  },
  [MissionFilterType.REMAINING]: {
    icon: AnnotationIcon,
    label: 'Remaining',
  }
};

type Props = {
  type: MissionFilterType;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

const MissionFilterItem: FC<Props> = ({ type, count, selected, onClick }: Props) => {
  const config = missionFilterConfig[type];
  const theme = useTheme();
  return (config && <Stack
    direction="row"
    px={3}
    py={1.5}
    gap={3}
    alignItems="center"
    bgcolor="background.paper"
    borderRadius={8}
    border={`solid 2px ${selected ? theme.palette.grey[500] : theme.palette.common.white}`}
    boxShadow={selected ? '0px 8px 16px 0px rgba(9, 30, 66, 0.20)': undefined}
    onClick={onClick}
  >
    {config.icon && <Box component={config.icon} m={2} />}
    <Stack direction="column" mr={3}>
      <Typography variant="body-14-regular" color="text.disabled">
        {config.label}
      </Typography>
      <Typography variant="subtitle-20-medium" color="text.primary">
        {count}
      </Typography>
    </Stack>
  </Stack>);
};

export default MissionFilterItem;