import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useState, type FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
} from 'react-pro-sidebar';
import Logo from '@/assets/icons/logo.svg?react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Loading from '@/components/Loading';
import { Pages } from '@/constants/enums';
import useAdminData from '@/hooks/useAdminData';
import GlobalSnackbar from '@/components/GlobalSnackbar';

const AdminLayout: FC = () => {
  const { isLoading } = useAdminData();
  const { pathname } = useLocation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box display="flex" height="100vh">
      <GlobalSnackbar align="right" />
      <Sidebar
        collapsed={!isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Stack justifyContent="center" alignItems="center" py={5}>
          <Logo />
        </Stack>
        <Menu
          menuItemStyles={{
            root: {
              color: theme.palette.text.primary,
              '.ps-menu-button.ps-active': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                svg: {
                  color: theme.palette.primary.contrastText,
                }
              },
              '.ps-menu-button:hover': {
                backgroundColor: theme.palette.background.navbar,
                color: theme.palette.text.primary,
                svg: {
                  color: theme.palette.primary.main,
                }
              }
            }
          }}
        >
          <MenuItem
            component={<Link to={Pages.ADMIN_USERS} />}
            icon={<AccountCircleIcon color="primary" />}
            active={pathname === Pages.ADMIN_USERS}
            disabled={pathname === Pages.ADMIN_USERS}
          >
            <Typography variant="body-14-regular">User Management</Typography>
          </MenuItem>
          <MenuItem
            component={<Link to={Pages.ADMIN_MISSIONS} />}
            icon={<AssignmentIcon color="primary" />}
            active={pathname === Pages.ADMIN_MISSIONS}
            disabled={pathname === Pages.ADMIN_MISSIONS}
          >
            <Typography variant="body-14-regular">Mission Management</Typography>
          </MenuItem>
          <MenuItem
            component={<Link to={Pages.LOGOUT} />}
            icon={<LogoutIcon color="primary" />}
          >
            <Typography variant="body-14-regular">Log out</Typography>
          </MenuItem>
        </Menu>
      </Sidebar>;
      <Box flex="1" p={5} width={`calc(100% - ${85}px)`}>
        <Outlet />
      </Box>
    </Box>
  );
};

const AdminLayoutWithProvider: FC = () => (
  <AdminLayout />
);

export default AdminLayoutWithProvider;