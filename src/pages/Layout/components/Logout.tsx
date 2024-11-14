import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear the user's session or token
    // After logging out, navigate to the login page
    navigate('/login');
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ height: '100vh' }}>
      <Typography variant="h4">Logout</Typography>
      <Typography variant="body1">Are you sure you want to logout?</Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );
};

export default Logout;