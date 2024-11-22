import { Box, Typography, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import BellIcon from '@/assets/icons/icon-outline-bell.svg?react';
import NotificationDialog from './NotificationDialog';

const NotificationBell: FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (<Box alignItems="center" position="relative">
    <BellIcon
      style={{ cursor: 'pointer' }}
      onClick={() => setOpen(true)}
    />
    <Box
      position="absolute"
      top={6}
      right={-3}
      width={12}
      height={12}
      borderRadius="50%"
      border={`solid 1px ${theme.palette.primary.main}`}
      bgcolor="common.white"
    >
      <Typography
        variant="caption-8-regular"
        color="primary.main"
        position="absolute"
        top={0}
        right={2}
      >10</Typography>
    </Box>
    <NotificationDialog open={open} handleClose={() => setOpen(false)} />
  </Box>);
};

export default NotificationBell;