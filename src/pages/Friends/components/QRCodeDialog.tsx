import { Box, Dialog, DialogTitle } from '@mui/material';
import QRCode from 'react-qr-code';

type Props = {
  value: string;
  open: boolean;
  onClose: (value: string) => void;
}

function QRCodeDialog(props: Props) {
  const { onClose, open, value } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle bgcolor="common.white" textAlign="center" >Scan for invite link</DialogTitle>
      <Box display="flex" justifyContent="center" alignItems="center" p={4} bgcolor="background.paper">
        <QRCode
          value={value}
        />
      </Box>
    </Dialog>
  );
}

export default QRCodeDialog;