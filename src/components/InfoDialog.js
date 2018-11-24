import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  withMobileDialog
} from '@material-ui/core';

const InfoDialog = ({ title, open, onClose, info }) => (
  <div className="info-dialog">
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
      open={open}
      aria-labelledby="info-dialog-title"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button>
            <ListItemText primary="Name" secondary={info.name} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Public Key" secondary={info.publicKey} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Private Key" secondary={info.privateKey} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default withMobileDialog()(InfoDialog);
