import { Box, Button, Drawer, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import SearchIcon from '@/assets/icons/icon-outline-search.svg?react';
import InviteFriendList from './InviteFriendList';
import FriendAvalar from '@/assets/images/friend-avatar1.svg?react';
import RefreshIcon from '@/assets/icons/icon-solid-refresh.svg?react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const friends = [
  {
    avatar: <FriendAvalar />,
    name: 'Jane Smith',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Alice Johnson',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Bob Brown',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Charlie Davis',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Diana Evans',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Ethan Harris',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Fiona Green',
  },
  {
    avatar: <FriendAvalar />,
    name: 'George King',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Hannah Lee',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Ian Martinez',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Jack Wilson',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Karen Young',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Liam Scott',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Mia Turner',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Noah Walker',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Olivia Hall',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Paul Allen',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Quinn Wright',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Rachel Adams',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Sam Baker',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Tina Clark',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Uma Davis',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Victor Evans',
  },
  {
    avatar: <FriendAvalar />,
    name: 'Wendy Foster',
  }
];

const AddFriendDrawer = ({ open, onClose }: Props) => {
  const theme = useTheme();
  return (<Drawer
    anchor="bottom"
    open={open}
    onClose={onClose}
  >
    <Stack
      direction="column"
      gap={5}
      py={3}
      bgcolor="grey.50"
    >
      <Stack direction="column" px={5} gap={3}>
        <Typography variant="body-16-medium">Choose Friends to Invite</Typography>
        <TextField
          variant="standard"
          size="medium"
          placeholder="Search"
          slotProps={{
            input: {
              sx: {
                borderRadius: 8,
                bgcolor: 'common.white',
                input: {
                  p: 3
                },
                ...theme.typography['body-14-medium'],
              },
              endAdornment: <InputAdornment position="end" sx={{ mr: 2 }}><SearchIcon /></InputAdornment>,
              disableUnderline: true
            },
          }}
        />
      </Stack>
      <InviteFriendList data={friends} />
      <TextField
        multiline
        rows={2}
        sx={{
          px: 5
        }}
        slotProps={{
          input: {
            sx: {
              borderRadius: 1.5,
              bgcolor: 'common.white',
              input: {
                p: 3
              },
              ...theme.typography['body-14-regular'],
            },
            endAdornment: <InputAdornment position="end"><RefreshIcon /></InputAdornment>
          }
        }}
      />
      <Stack direction="row" justifyContent="center" gap={5} px={5} py={2}>
        <Button
          variant="contained"
          sx={{
            py: 3,
            px: 4,
            bgcolor: 'background.paper',
            borderRadius: 8,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%'
          }}
        >
          <Typography
            variant="body-14-medium"
            textTransform="initial"
            color="primary"
          >
            Copy link
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            py: 3,
            px: 4,
            bgcolor: 'background.paper',
            borderRadius: 8,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%'
          }}
        >
          <Stack direction="row" gap={2.5}>
            <Typography
              variant="body-14-medium"
              textTransform="initial"
              color="primary"
            >
            Send
            </Typography>
          </Stack>
          <Box bgcolor="info.main" width={20} height={20} borderRadius="50%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body-14-regular" color="common.white" mt={0.5}>5</Typography>
          </Box>
        </Button>
      </Stack>
    </Stack>
  </Drawer>);
};

export default AddFriendDrawer;