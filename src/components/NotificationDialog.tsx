import { Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Stack, Divider, List, ListItemButton, ListItemText, LinearProgress } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef, ReactElement, Ref, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyGetNotificationsQuery, Notification } from '@/api/notificationApi';
import useUserData from '@/hooks/useUserData';
import moment from 'moment';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';
import FriendInvitationDialog from '@/pages/Friends/FriendInvitationDialog';

type Props = {
  handleClose: () => void;
  open: boolean;
}

const Transition = forwardRef((
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = 'Transition';

const NotificationDialog: FC<Props> = ({ handleClose, open }: Props) => {
  const { user } = useUserData();
  const [openFriendInvitation, setOpenFriendInvitation] = useState<{ open: boolean, notification?: Notification}>({
    open: false,
    notification: undefined,
  });

  const { listRef, isFetching, data } = useInfiniteScroll<Notification>(
    useLazyGetNotificationsQuery as UseLazyQuery,
    {
      user_id: user?.id || '',
      pageSize: 10,
    },
    'notifications',
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          background: 'linear-gradient(90deg, #F8EDED 0%, #F1E3D3 50%, #F3F9F2 100%)',
        },
      }}
    >
      <FriendInvitationDialog
        open={openFriendInvitation.open}
        onClose={() => setOpenFriendInvitation({
          open: false,
          notification: undefined,
        })}
        notification={openFriendInvitation.notification}
      />
      {isFetching && (
        <Stack width="100%" sx={{ position: 'sticky', top: 0, zIndex: 1101 }}>
          <LinearProgress />
        </Stack>
      )}
      <AppBar sx={{ position: 'sticky', top: 0, backgroundColor: 'common.white' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color="text.primary">
            Notifications
          </Typography>
          <IconButton
            edge="start"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List
        ref={listRef}
        component="div"
        sx={{ overflowY: 'auto', height: '100%' }}
      >
        {data?.map(notification => (
          <div key={notification.id}>
            <ListItemButton onClick={() => setOpenFriendInvitation({
              open: true,
              notification,
            })}>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    {notification.body}
                    <Typography variant="caption-10-regular" display="block" textAlign="right">
                      {moment(notification.created_at).format('MMMM Do YYYY, h:mm:ss A')}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </Dialog>
  );
};

export default NotificationDialog;
