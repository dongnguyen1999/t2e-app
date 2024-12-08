import { base64Decode } from '@/utils/dataUtils';
import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { FriendInvitationData } from '.';
import { DIRECT_URL_INVITATION_MESSAGE } from '@/constants';
import { useCallback, useMemo } from 'react';
import moment from 'moment';
import { useCreateFriendInvatationMutation, useUpdateFriendInvitationMutation } from '@/api/friendApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/components/GlobalSnackbar/reducer';
import { Notification } from '@/api/notificationApi';

type Props = {
  open: boolean;
  onClose: () => void;
  invitationToken?: string;
  notification?: Notification;
}

const FriendInvitationDialog = ({ open, onClose, invitationToken, notification }: Props) => {
  const dispatch = useDispatch();
  const [createFriendInvitation] = useCreateFriendInvatationMutation();
  const [updateFriendInvitation] = useUpdateFriendInvitationMutation();
  const invitationData = invitationToken ? base64Decode<FriendInvitationData>(invitationToken) : {} as FriendInvitationData;
  const isExpired = invitationData.expiredDate && moment(invitationData.expiredDate).isBefore(moment());

  const message = useMemo(() => {
    if (invitationToken) {
      if (isExpired) {
        return <Typography variant="body-16-regular" color="text.primary" textAlign="center">Invitation url has been expired</Typography>;
      }
      return <>
        <Typography variant="body-16-regular" color="text.primary" textAlign="center">You have been invited to be friend with</Typography>
        <Typography variant="subtitle-18-semi-bold" textAlign="center">{invitationData.name}</Typography>
      </>;
    }
    if (notification) {
      return <Typography variant="body-16-regular" color="text.primary" textAlign="center">{notification.body}</Typography>;
    }
  }, [notification, invitationToken]);

  const handleClose = useCallback(() => {
    invitationToken && sessionStorage.setItem('handledInvitation', invitationToken);
    onClose();
  }, []);

  const handleAccept = (accepted: boolean) => {
    if (invitationToken) {
      if (accepted) {
        createFriendInvitation({
          friend_user_ids: [invitationData.id],
          message: DIRECT_URL_INVITATION_MESSAGE
        }).unwrap().then(() => {
          handleClose();
        }).catch(error => {
          dispatch(showSnackbar({
            id: 'direct-url-friend-error',
            message: error.data.message,
          }));
        });
      } else {
        handleClose();
      }
    } else if (notification) {
      updateFriendInvitation({
        id: notification.id,
        status: accepted ? 1 : 2
      }).unwrap().then(() => {
        handleClose();
      }).catch(error => {
        dispatch(showSnackbar({
          id: 'direct-url-friend-error',
          message: error.data.message,
        }));
      });
    }
  };

  return (<Dialog open={open} maxWidth="sm" fullWidth>
    <DialogTitle bgcolor="common.white" >
      <Typography variant="title-16-bold" color="text.primary">Friend Invitation</Typography>
    </DialogTitle>
    <Stack direction="column" justifyContent="center" alignItems="center" p={6} bgcolor="background.navbar">
      {message}
      <Stack direction="row" justifyContent="center" spacing={3} mt={4}>
        {isExpired ? <Button variant="contained" onClick={handleClose}>Close</Button> : <>
          <Button variant="contained" color="primary" onClick={() => handleAccept(true)}>Accept</Button>
          <Button variant="outlined" color="primary" onClick={() => handleAccept(false)}>Decline</Button>
        </>}
      </Stack>
    </Stack>
  </Dialog>);
};

export default FriendInvitationDialog;
