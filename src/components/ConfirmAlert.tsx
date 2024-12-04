import theme from '@/themes/default';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, ButtonProps, ThemeProvider } from '@mui/material';
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const showConfirm = ({ title, message, buttons }: ReactConfirmAlertProps) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <ThemeProvider theme={theme}>
          <Dialog
            open={true}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              '& .MuiDialog-paper': {
                bgcolor: 'common.white'
              }
            }}
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {buttons ? <>
                {buttons.map(({ label, onClick, color }) => (
                  <Button
                    key={label}
                    onClick={event => {
                      onClick && onClick(event);
                      onClose();
                    }}
                    color={color as ButtonProps['color'] || 'primary'}>
                    {label}
                  </Button>
                ))}
              </> : <>
                <Button onClick={onClose} color="primary">
                Close
                </Button>
              </>}
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      );
    }
  });
};

export default showConfirm;