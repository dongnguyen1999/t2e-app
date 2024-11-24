import NotificationBell from '@/components/NotificationBell';
import { Stack } from '@mui/material';
import { useState, type FC } from 'react';
import FriendHeader from './components/FriendHeader';
import Avatar from '@/assets/images/avatar2.svg?react';
import FriendAvalar from '@/assets/images/friend-avatar1.svg?react';
import FriendList from './components/FriendList';
import { isEmpty } from 'lodash';
import EmptyFriendList from './components/EmptyFriendList';
import AddFriendDrawer from './components/AddFriendDrawer';

const headerData = {
  avatar: <Avatar />,
  point: 0.002512,
  token: 2,
};

const friends = [
  {
    id: 1,
    avatar: <FriendAvalar />,
    name: 'Jane Smith',
    point: 1.234567
  },
  {
    id: 2,
    avatar: <FriendAvalar />,
    name: 'Alice Johnson',
    point: 3.456789
  },
  {
    id: 3,
    avatar: <FriendAvalar />,
    name: 'Bob Brown',
    point: 0.987654
  },
  {
    id: 4,
    avatar: <FriendAvalar />,
    name: 'Charlie Davis',
    point: 4.321098
  },
  {
    id: 5,
    avatar: <FriendAvalar />,
    name: 'Diana Evans',
    point: 2.345678
  },
  {
    id: 6,
    avatar: <FriendAvalar />,
    name: 'Ethan Harris',
    point: 5.678901
  },
  {
    id: 7,
    avatar: <FriendAvalar />,
    name: 'Fiona Green',
    point: 1.111111
  },
  {
    id: 8,
    avatar: <FriendAvalar />,
    name: 'George King',
    point: 3.333333
  },
  {
    id: 9,
    avatar: <FriendAvalar />,
    name: 'Hannah Lee',
    point: 2.222222
  },
  {
    id: 10,
    avatar: <FriendAvalar />,
    name: 'Ian Martinez',
    point: 4.444444
  },
  {
    id: 11,
    avatar: <FriendAvalar />,
    name: 'Jackie Nguyen',
    point: 1.555555
  },
  {
    id: 12,
    avatar: <FriendAvalar />,
    name: 'Kevin O\'Connor',
    point: 3.666666
  },
  {
    id: 13,
    avatar: <FriendAvalar />,
    name: 'Laura Perez',
    point: 2.777777
  },
  {
    id: 14,
    avatar: <FriendAvalar />,
    name: 'Michael Quinn',
    point: 5.888888
  },
  {
    id: 15,
    avatar: <FriendAvalar />,
    name: 'Nina Roberts',
    point: 1.999999
  },
  {
    id: 16,
    avatar: <FriendAvalar />,
    name: 'Oscar Smith',
    point: 3.111111
  },
  {
    id: 17,
    avatar: <FriendAvalar />,
    name: 'Paula Thompson',
    point: 2.333333
  },
  {
    id: 18,
    avatar: <FriendAvalar />,
    name: 'Quincy Underwood',
    point: 4.555555
  },
  {
    id: 19,
    avatar: <FriendAvalar />,
    name: 'Rachel Valdez',
    point: 1.666666
  },
  {
    id: 20,
    avatar: <FriendAvalar />,
    name: 'Steven White',
    point: 3.777777
  },
  {
    id: 21,
    avatar: <FriendAvalar />,
    name: 'Tina Xu',
    point: 2.888888
  },
  {
    id: 22,
    avatar: <FriendAvalar />,
    name: 'Uma Yates',
    point: 5.999999
  },
  {
    id: 23,
    avatar: <FriendAvalar />,
    name: 'Victor Zane',
    point: 1.444444
  },
  {
    id: 24,
    avatar: <FriendAvalar />,
    name: 'Wendy Adams',
    point: 3.222222
  }
];

const Friends: FC = () => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
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
        {isEmpty(friends) ? <EmptyFriendList /> :
          <FriendList
            data={friends}
            handleAddFriend={() => setOpenAddFriend(true)}
          />}
      </Stack>
      <AddFriendDrawer
        open={openAddFriend}
        onClose={() => setOpenAddFriend(false)}
      />
    </Stack>
  );
};

export default Friends;