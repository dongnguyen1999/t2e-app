import { BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@/assets/icons/icon-solid-home.svg?react';
import CollectionIcon from '@/assets/icons/icon-outline-collection.svg?react';
import UserCircleIcon from '@/assets/icons/icon-outline-user-circle.svg?react';

interface StyledBottomNavigationActionProps {
  selected?: boolean;
}


const StyledBottomNavigationAction = styled(BottomNavigationAction)<StyledBottomNavigationActionProps>(({ theme, selected }) => ({
  gap: 4,
  svg: {
    fill: theme.palette.text.disabled,
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

export const Home: FC = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.navbar' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <StyledBottomNavigationAction
          label={<Typography variant="caption-12-medium" color="text.primary" >Home</Typography>}
          icon={<HomeIcon />}
          showLabel
          selected={value == 0}
        />
        <StyledBottomNavigationAction
          label={<Typography variant="caption-12-medium" color="text.primary" >Mission</Typography>}
          icon={<CollectionIcon />}
          showLabel
          selected={value == 1}
        />
        <StyledBottomNavigationAction
          label={<Typography variant="caption-12-medium" color="text.primary" >Friends</Typography>}
          icon={<UserCircleIcon />}
          showLabel
          selected={value == 2}
        />
      </BottomNavigation>
    </Paper>
  );
};
