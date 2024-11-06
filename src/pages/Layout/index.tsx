/* eslint-disable camelcase */
import { BottomNavigation, BottomNavigationAction, Box, Paper, Typography } from '@mui/material';
import { type FC } from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@/assets/icons/icon-solid-home.svg?react';
import CollectionIcon from '@/assets/icons/icon-outline-collection.svg?react';
import UserCircleIcon from '@/assets/icons/icon-outline-user-circle.svg?react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Pages } from '@/constants/enums';
import { useGetAuthenticatedUserQuery } from '@/api/authApi';
import { initData } from '@telegram-apps/sdk-react';
import Loading from '@/components/Loading';

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

  const telegramUserData = {
    id: initData.user()?.id?.toString(),
    first_name: initData.user()?.firstName,
    last_name: initData.user()?.lastName,
    username: initData.user()?.username,
    auth_date: Math.floor((initData.authDate()?.getTime() || 0) / 1000),
    hash: initData.hash(),
  };

  console.warn('telegramUserData', telegramUserData);

  const { isLoading, data, error } = useGetAuthenticatedUserQuery(telegramUserData);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    navigate(Pages.FORBIDDEN);
  }

  console.warn('data', data);

  return (
    <>
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
    </>
  );
};

export default Layout;