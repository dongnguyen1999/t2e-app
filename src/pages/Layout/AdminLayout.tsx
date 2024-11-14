import { Box, Typography } from '@mui/material';
import { type FC } from 'react';
import { Outlet, useNavigate, Link, NavLink } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
  useProSidebar
} from 'react-pro-sidebar';
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Group as GroupIcon,
  RocketLaunch as RocketLaunchIcon
} from '@mui/icons-material';
import Loading from '@/components/Loading';
import useUserData from '@/hooks/useUserData';

const AdminLayout: FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useUserData();
  const { collapseSidebar, toggleSidebar, collapsed, toggled } = useProSidebar();

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const handleCollapsedChange = () => {
    collapseSidebar(!collapsed);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box display="flex" height="100vh">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        <Menu>
          <MenuItem
            icon={collapsed ? <ChevronRightIcon color="primary" /> : <ChevronLeftIcon color="primary" />}
            onClick={handleCollapsedChange}
          >
            {!collapsed && (
              <Typography
                variant="body1"
                color="text.primary"
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
        Admin Panel
              </Typography>
            )}
          </MenuItem>
          <MenuItem
            icon={<GroupIcon color="primary" />}
            onClick={() => navigate('/admin/user-management')}
          >
            <Typography variant="body1" color="text.primary">
        User Management
            </Typography>
            <NavLink to="/admin/user-management" />
          </MenuItem>
          <MenuItem
            icon={<RocketLaunchIcon color="primary" />}
            onClick={() => navigate('/admin/mission-management')}
          >
            <Typography variant="body1" color="text.primary">
        Mission Management
            </Typography>
            <NavLink to="/admin/mission-management" />
          </MenuItem>
        </Menu>
        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <Link
              className="sidebar-btn"
              style={{ cursor: 'pointer' }}
              to="/admin/profile"
            >
              <AccountCircleIcon color="primary" />
              <Typography variant="body1" color="text.primary">
        My Account
              </Typography>
            </Link>
          </div>
          <Box textAlign="center" p={2}>
            <Typography variant="body2" color="text.primary">
        User Info
            </Typography>
          </Box>
        </Box>
      </Sidebar>
      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

const AdminLayoutWithProvider: FC = () => (
  <ProSidebarProvider>
    <AdminLayout />
  </ProSidebarProvider>
);

export default AdminLayoutWithProvider;