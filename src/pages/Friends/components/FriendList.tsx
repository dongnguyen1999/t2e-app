import { Box, Grid2, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import UserGroupIcon from '@/assets/icons/icon-outline-user-group.svg?react';
import FriendCard from './FriendCard';
import FriendActionButtons from './FriendActionButtons';
import { Friend } from '@/api/friendApi';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import FriendAvatar from '@/assets/images/friend-avatar1.svg?react';

type Props = {
  data: Friend[];
  listRef: ReturnType<typeof useInfiniteScroll>['listRef'];
  inviteLink: string;
  handleAddFriend: () => void;
}

const FriendList: FC<Props> = ({ data, handleAddFriend, listRef, inviteLink }: Props) => {
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
      }}
      ref={listRef}
    >
      <Grid2 container spacing={3}>
        {data.map(({ id, first_name, last_name }) => (
          <Grid2 key={id} size={{ sm: 4, md: 3, lg: 2, xl: 1 }}>
            <FriendCard
              avatar={<FriendAvatar />}
              name={`${first_name} ${last_name}`}
              point={0}
              avatarSize={64}
              minWidth={100}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
    <FriendActionButtons
      handleAddFriend={handleAddFriend}
      inviteLink={inviteLink}
    />
  </Stack>;
};

export default FriendList;