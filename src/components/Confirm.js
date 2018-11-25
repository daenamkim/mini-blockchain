
import React from 'react';
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  withMobileDialog
} from '@material-ui/core';

const Confirm = ({ title, open, onClose, text }) => (
  <div className="dialog-confirm">
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
      open={open}
      aria-labelledby="dialog-confirm-title"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => {onClose('cancel');}}>
          Cancel
        </Button>
        <Button color="secondary" onClick={() => {onClose('delete');}}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default withMobileDialog()(Confirm);
