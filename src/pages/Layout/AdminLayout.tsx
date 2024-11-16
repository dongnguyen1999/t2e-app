import { Box } from '@mui/material';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
} from 'react-pro-sidebar';


import Loading from '@/components/Loading';
import useUserData from '@/hooks/useUserData';

const AdminLayout: FC = () => {
  const { isLoading } = useUserData();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box display="flex" height="100vh">
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              ['&.active']: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link to="/admin/missions" />}> Mission Management</MenuItem>
          <MenuItem component={<Link to="/admin/users" />}> User Management</MenuItem>
        </Menu>
      </Sidebar>;
    </Box>
  );
};

const AdminLayoutWithProvider: FC = () => (
  <AdminLayout />
);

export default AdminLayoutWithProvider;