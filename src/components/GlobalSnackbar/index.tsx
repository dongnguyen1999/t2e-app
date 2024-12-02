import { IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useState, SyntheticEvent, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const GlobalSnackbar = () => {
  const [open, setOpen] = useState<string | number>('');
  const { id, message, createdAt } = useSelector((state: RootState) => state.snackbar);

  useEffect(() => {
    if (id && id != open) {
      setOpen(id);
    }
  }, [createdAt]);

  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen('');
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};

export default GlobalSnackbar;