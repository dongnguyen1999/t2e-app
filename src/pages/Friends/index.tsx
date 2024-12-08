import NotificationBell from '@/components/NotificationBell';
import { Stack } from '@mui/material';
import { useMemo, useState, type FC } from 'react';
import FriendHeader from './components/FriendHeader';
import Avatar from '@/assets/images/avatar2.svg?react';
import FriendList from './components/FriendList';
import { isEmpty, isNil } from 'lodash';
import EmptyFriendList from './components/EmptyFriendList';
import AddFriendDrawer from './components/AddFriendDrawer';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';
import { Friend, useLazyGetFriendsQuery } from '@/api/friendApi';
import useUserData from '@/hooks/useUserData';
import moment from 'moment';
import { base64Encode } from '@/utils/dataUtils';

export type FriendInvitationData = {
  id: string;
  name: string;
  expiredDate: string;
}

const headerData = {
  avatar: <Avatar />,
  point: 0.002512,
  token: 2,
};

const Friends: FC = () => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const { user } = useUserData();
  const { listRef, data } = useInfiniteScroll<Friend>(
    useLazyGetFriendsQuery as UseLazyQuery,
    {},
    'friends'
  );

  const generateInviteLink = () => {
    const TELEGRAM_APP_URL = import.meta.env.VITE_TELEGRAM_APP_URL;
    const inviteAppPayload = {
      id: user?.id || '',
      name: `${user?.first_name} ${user?.last_name}`,
      expiredDate: moment().add(10, 'minutes').toISOString()
    } as FriendInvitationData;
    const inviteLink = `${TELEGRAM_APP_URL}?startapp=${base64Encode(inviteAppPayload)}`;
    return inviteLink;
  };

  const inviteLink = useMemo(() => generateInviteLink(), [user]);

  return (
    <Stack
      direction="column"
      height="100%"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="common.white"
        p={5}
      >
        <FriendHeader data={headerData} />
        <NotificationBell />
      </Stack>
      <Stack flex={1} gap={8} p={5}>
        {(isEmpty(data) && !isNil(data)) ? <EmptyFriendList
          inviteLink={inviteLink}
          handleAddFriend={() => setOpenAddFriend(true)}
        /> :
          <FriendList
            data={data || []}
            listRef={listRef}
            inviteLink={inviteLink}
            handleAddFriend={() => setOpenAddFriend(true)}
          />}
      </Stack>
      <AddFriendDrawer
        open={openAddFriend}
        inviteLink={inviteLink}
        onClose={() => setOpenAddFriend(false)}
      />
    </Stack>
  );
};

export default Friends;