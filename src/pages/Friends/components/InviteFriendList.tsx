import { Box, Grid2, LinearProgress } from '@mui/material';
import { FC } from 'react';
import FriendCard from './FriendCard';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';
import { Friend, useLazySearchFriendsQuery } from '@/api/friendApi';
import FriendAvatar from '@/assets/images/friend-avatar1.svg?react';

type Props = {
  searchKey: string;
  selectedFriends: Friend[];
  setSelectedFriends: (friends: Friend[]) => void;
}

const InviteFriendList: FC<Props> = ({ searchKey, selectedFriends, setSelectedFriends }: Props) => {
  const { listRef, data, isFetching } = useInfiniteScroll<Friend>(
    useLazySearchFriendsQuery as UseLazyQuery,
    { name: searchKey },
    'friends'
  );

  return <Grid2
    container
    spacing={3}
    flex={1}
    maxHeight={270}
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
    <Box width="100%" height={2}>
      {isFetching && <LinearProgress />}
    </Box>
    {data.map(friend => <Grid2 key={friend.id} size={4}>
      <FriendCard
        avatar={<FriendAvatar />}
        name={`${friend.first_name} ${friend.last_name}`}
        backgroundTransparent
        avatarSize={48}
        gap={1.5}
        active={selectedFriends.some(_friend => _friend.id === friend.id)}
        onClick={() => setSelectedFriends(selectedFriends.some(_friend => _friend.id === friend.id)
          ? selectedFriends.filter(_friend => _friend.id !== friend.id)
          : [...selectedFriends, friend])}
      />
    </Grid2>)}
  </Grid2>;
};

export default InviteFriendList;