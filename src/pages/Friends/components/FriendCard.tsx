import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import PointIcon from '@/assets/icons/icon-point.svg?react';
import CheckCircleIcon from '@/assets/icons/icon-solid-check-circle.svg?react';
import { round } from 'lodash';

type Props = {
  avatar: ReactNode;
  name: string;
  point?: number;
  backgroundTransparent?: boolean;
  avatarSize?: number;
  gap?: number;
  active?: boolean;
  minWidth?: number;
}

const FriendCard: FC<Props> = ({ avatar, name, point, backgroundTransparent = false, avatarSize = 64, gap = 3, active = false, minWidth }: Props) => {
  return <Stack
    direction="column"
    gap={gap}
    py={1.5}
    bgcolor={backgroundTransparent ? 'transparent' : 'background.paper'}
    justifyContent="center"
    alignItems="center"
    border={!backgroundTransparent ? '2px solid white' : 'none'}
    borderRadius={1.5}
    minWidth={minWidth}
  >
    <Box width={avatarSize} height={avatarSize} position="relative">
      {avatar}
      {active && <CheckCircleIcon style={{ position: 'absolute', right: 0, bottom: 0 }} />}
    </Box>
    <Stack direction="column" alignItems="center" >
      <Typography
        variant="caption-12-medium"
        color={active ? 'info' : 'text.primary'}
        noWrap
        textOverflow="ellipsis"
        overflow="hidden"
        maxWidth={minWidth ? minWidth - 16 : '100%'}
      >{name}</Typography>
      {point && <Stack direction="row">
        <PointIcon width={16} height={16} style={{ marginTop: -1 }} />
        <Typography variant="caption-12-regular" color="text.primary">{round(point, 3)}</Typography>
      </Stack>}
    </Stack>
  </Stack>;
};

export default FriendCard;