import { Box, Button, CircularProgress, Drawer, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import SearchIcon from '@/assets/icons/icon-outline-search.svg?react';
import InviteFriendList from './InviteFriendList';
import RefreshIcon from '@/assets/icons/icon-solid-refresh.svg?react';
import { useEffect, useState } from 'react';
import { debounce, size } from 'lodash';
import { Friend, useCreateFriendInvatationMutation } from '@/api/friendApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/components/GlobalSnackbar/reducer';

type Props = {
  open: boolean;
  inviteLink: string;
  onClose: () => void;
};

const AddFriendDrawer = ({ open, onClose, inviteLink }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');
  const [messsage, setMessage] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const [createFriendInvitation, { isLoading }] = useCreateFriendInvatationMutation();

  useEffect(() => {
    if (!open) {
      setSearchKey('');
      setSelectedFriends([]);
      setCopiedLink(false);
      setMessage('');
    }
  }, [open]);

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
  };

  const handleSendInvite = () => {
    createFriendInvitation({
      friend_user_ids: selectedFriends.map(friend => friend.id),
      message: messsage
    }).unwrap().then(() => {
      onClose();
    }).catch(error => {
      dispatch(showSnackbar({
        id: 'add-friend-error',
        message: error.data.message,
      }));
    });
  };

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
          onChange={debounce(e => setSearchKey(e.target.value), 500)}
        />
      </Stack>
      <InviteFriendList
        searchKey={searchKey}
        selectedFriends={selectedFriends}
        setSelectedFriends={setSelectedFriends}
      />
      <TextField
        multiline
        rows={2}
        sx={{
          px: 5
        }}
        value={messsage}
        onChange={e => setMessage(e.target.value)}
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
            endAdornment: <InputAdornment position="end"><RefreshIcon onClick={() => setMessage('')} /></InputAdornment>
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
            width: '100%',
            height: 20,
            boxSizing: 'content-box'
          }}
          onClick={handleCopyInviteLink}
        >
          <Typography
            variant="body-14-medium"
            textTransform="initial"
            color="primary"
          >
            {copiedLink ? 'Copied' : 'Copy'} link
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
            width: '100%',
            height: 20,
            boxSizing: 'content-box'
          }}
          onClick={handleSendInvite}
          disabled={isLoading || !size(selectedFriends)}
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
          {isLoading && <CircularProgress size={12} />}
          {(!isLoading && size(selectedFriends)) ? <Box bgcolor="info.main" width={20} height={20} borderRadius="50%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body-14-regular" color="common.white" mt={0.5}>{size(selectedFriends)}</Typography>
          </Box> : null}
        </Button>
      </Stack>
    </Stack>
  </Drawer>);
};

export default AddFriendDrawer;