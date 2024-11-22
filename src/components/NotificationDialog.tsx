import { Dialog, AppBar, Toolbar, Slide, IconButton, Typography, CircularProgress, Stack, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef, ReactElement, Ref, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyGetNotificationsQuery } from '@/api/notificationApi';
import useUserData from '@/hooks/useUserData';

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
  const [getNotifications, { isLoading }] = useLazyGetNotificationsQuery();

  useEffect(() => {
    if (open) {
      getNotifications({ pageSize: 10, user_id: user?.id || '' });
    }
  }, [open]);

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
      <AppBar sx={{ position: 'relative', backgroundColor: 'background.navbar' }}>
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
      {isLoading ? <Stack width="100%" height="80vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>: <List>
        <ListItemButton>
          <ListItemText primary="New message from John" secondary="Hey, are you available for a meeting tomorrow?" />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemText primary="Server downtime" secondary="The server will be down for maintenance at 3 AM." />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemText primary="Update available" secondary="A new update is available for your application." />
        </ListItemButton>
      </List>}

    </Dialog>
  );
};

export default NotificationDialog;