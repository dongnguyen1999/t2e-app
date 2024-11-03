import { IconButton, Stack } from '@mui/material';
import { FC } from 'react';
import UserAddIcon from '@/assets/icons/icon-outline-user-add.svg?react';
import LinkIcon from '@/assets/icons/icon-outline-link.svg?react';
import QRCodeIcon from '@/assets/icons/icon-outline-qrcode.svg?react';

type Props = {
  handleAddFriend: () => void;
}

const FriendActionButtons: FC<Props> = ({ handleAddFriend }: Props) => {
  return <Stack direction="column" position="absolute" right={0} bottom={72} gap={1.5}>
    <IconButton
      sx={{
        // bgcolor: 'background.paper',
        background: 'linear-gradient(95deg, #FFF1DD 5.38%, #EDEDED 94.16%)',
        borderRadius: 3,
        border: '2px solid white',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2.5,
      }}
      onClick={handleAddFriend}
    >
      <UserAddIcon width={20} height={20} />
    </IconButton>
    <IconButton
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: '2px solid white',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2.5,
      }}
    >
      <LinkIcon width={20} height={20} />
    </IconButton>
    <IconButton
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: '2px solid white',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2.5,
      }}
    >
      <QRCodeIcon width={20} height={20} />
    </IconButton>
  </Stack>;
};

export default FriendActionButtons;
