import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import UserGroupIcon from '@/assets/icons/icon-outline-user-group.svg?react';
import FriendCard from './FriendCard';
import FriendActionButtons from './FriendActionButtons';

type Props = {
  data: { avatar: ReactNode; point: number; name: string }[];
  handleAddFriend: () => void;
}

const FriendList: FC<Props> = ({ data, handleAddFriend }: Props) => {
  return <Stack
    direction="column"
    gap={3}
  >
    <Stack direction="row" gap={3} alignItems="center">
      <UserGroupIcon width={20} height={20} style={{ marginTop: -4 }} />
      <Typography variant="body-14-medium" color="text.primary">Friends</Typography>
      <Box bgcolor="info.main" width={20} height={20} borderRadius="50%" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body-14-regular" color="common.white" mt={0.5}>{data.length}</Typography>
      </Box>
    </Stack>
    <Box
      flex={1}
      maxHeight="calc(100vh - 205px)"
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        } as React.CSSProperties,
        msOverflowStyle: 'none' as React.CSSProperties,
        scrollbarWidth: 'none' as React.CSSProperties,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'stretch',
        gap: 3,
      }}
    >
      {data.map(({ avatar, name, point }) => <FriendCard
        key={name}
        avatar={avatar}
        name={name}
        point={point}
        avatarSize={64}
        width={98}
      />)}
    </Box>
    <FriendActionButtons handleAddFriend={handleAddFriend} />
  </Stack>;
};

export default FriendList;