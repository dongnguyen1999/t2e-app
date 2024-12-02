import theme from '@/themes/default';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import PointIcon from '@/assets/icons/icon-point.svg?react';
import UserAddIcon from '@/assets/icons/icon-outline-user-add.svg?react';
import LinkIcon from '@/assets/icons/icon-outline-link.svg?react';
import QRCodeIcon from '@/assets/icons/icon-outline-qrcode.svg?react';
import QRCodeDialog from './QRCodeDialog';

type Props = {
  inviteLink: string;
  handleAddFriend: () => void;
}

const EmptyFriendList: FC<Props> = ({ handleAddFriend, inviteLink }: Props) => {

  const [showQRCode, setShowQRCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
  };

  const handleShowQRCode = () => {
    setShowQRCode(true);
  };

  return (<Stack direction="column" gap={3}>
    <QRCodeDialog
      open={showQRCode}
      onClose={() => setShowQRCode(false)}
      value={inviteLink}
    />
    <Stack direction="column" gap={3} mt={12} py={3} px={5}>
      <Stack justifyContent="center" alignItems="center">
        <Stack direction="row" alignItems="center">
          <PointIcon width={36} height={36} style={{ marginTop: -6 }} />
          <Typography variant="title-28-medium" color="text.primary">0.000000</Typography>
        </Stack>
        <Typography variant="body-14-regular" color="text.primary" textAlign="center">
          Invite your friends to join the app & you’ll earn bonus whenever your friend join with us!
        </Typography>
      </Stack>
    </Stack>
    <Stack direction="column" mt={12} gap={5}>
      <Button
        variant="contained"
        sx={{
          p: 4,
          background: 'linear-gradient(95deg, #FFF1DD 5.38%, #EDEDED 94.16%)',
          borderRadius: 32,
          border: `2px solid ${theme.palette.common.white}`,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}
      >
        <Typography
          variant="body-16-medium"
          textTransform="initial"
          color="primary"
          onClick={handleAddFriend}
        >
          Invite a friend
        </Typography>
        <UserAddIcon width={20} height={20} />
      </Button>
      <Stack direction="row" gap={5}>
        <Button
          variant="contained"
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 32,
            border: `2px solid ${theme.palette.common.white}`,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%'
          }}
          onClick={handleCopyInviteLink}
        >
          <Typography
            variant="body-16-medium"
            textTransform="initial"
            color="primary"
          >
            {copiedLink ? 'Copied' : 'Copy'} link
          </Typography>
          <LinkIcon width={20} height={20} />
        </Button>
        <Button
          variant="contained"
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 32,
            border: `2px solid ${theme.palette.common.white}`,
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%'
          }}
          onClick={handleShowQRCode}
        >
          <Typography
            variant="body-16-medium"
            textTransform="initial"
            color="primary"
          >
            Share QR
          </Typography>
          <QRCodeIcon width={20} height={20} />
        </Button>
      </Stack>
    </Stack>
  </Stack>);
};

export default EmptyFriendList;