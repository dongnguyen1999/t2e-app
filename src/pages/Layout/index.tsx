import { BottomNavigation, BottomNavigationAction, Box, Paper, Typography } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@/assets/icons/icon-solid-home.svg?react';
import CollectionIcon from '@/assets/icons/icon-outline-collection.svg?react';
import UserCircleIcon from '@/assets/icons/icon-outline-user-circle.svg?react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import Loading from '@/components/Loading';
import useUserData from '@/hooks/useUserData';
import GlobalSnackbar from '@/components/GlobalSnackbar';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import FriendInvitationDialog from '../Friends/FriendInvitationDialog';

interface StyledBottomNavigationActionProps {
  selected?: boolean;
}


const StyledBottomNavigationAction = styled(BottomNavigationAction)<StyledBottomNavigationActionProps>(({ theme, selected }) => ({
  gap: 4,
  svg: {
    fill: theme.palette.grey[600],
  },
  ...(selected && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -2,
      width: 24,
      height: 4,
      borderRadius: 4,
      backgroundColor: theme.palette.primary.main,
      zIndex: 1,
    },
    svg: {
      fill: theme.palette.primary.main,
    },
  }),
}));

const Layout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const invitationToken = lp.startParam;
  console.warn('invitationToken', invitationToken);

  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);

  useEffect(() => {
    if (invitationToken && sessionStorage.getItem('handledInvitation') !== invitationToken) {
      setOpenInvitationDialog(true);
    }
  }, [invitationToken]);

  const { isLoading } = useUserData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <GlobalSnackbar />
      <FriendInvitationDialog
        open={openInvitationDialog}
        onClose={() => setOpenInvitationDialog(false)}
        invitationToken={invitationToken}
      />
      <Box width="100%" height="1000px" maxHeight="85vh">
        <Outlet />
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.navbar' }}>
        <BottomNavigation
          showLabels
          value={location.pathname}
        >
          <StyledBottomNavigationAction
            label={<Typography variant="caption-12-medium" color="text.primary">Home</Typography>}
            icon={<HomeIcon />}
            showLabel
            value={Pages.HOME}
            onClick={() => navigate(Pages.HOME)}
          />
          <StyledBottomNavigationAction
            label={<Typography variant="caption-12-medium" color="text.primary">Mission</Typography>}
            icon={<CollectionIcon />}
            showLabel
            onClick={() => navigate(Pages.MISSIONS)}
            value={Pages.MISSIONS}
          />
          <StyledBottomNavigationAction
            label={<Typography variant="caption-12-medium" color="text.primary">Friends</Typography>}
            icon={<UserCircleIcon />}
            showLabel
            onClick={() => navigate(Pages.FRIENDS)}
            value={Pages.FRIENDS}
          />
        </BottomNavigation>
      </Paper >
    </AppRoot>
  );
};

export default Layout;