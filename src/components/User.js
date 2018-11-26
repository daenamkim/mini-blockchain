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
  withStyles,
  TextField
} from '@material-ui/core';

const styles = {
  fullWidth: {
    width: '100%'
  }
}

const User = ({ title, open, onClose, info, classes }) => (
  <div className="dialog-user-info">
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
      open={open}
      aria-labelledby="dialog-user-info-title"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button>
            <div className={classes.fullWidth}>
              <ListItemText primary="Name" />
              <TextField
                disabled
                fullWidth
                value={info.username}
              />
            </div>
          </ListItem>
          <ListItem button>
            <div className={classes.fullWidth}>
              <ListItemText primary="Public Key" />
              <TextField
                disabled
                fullWidth
                value={info.publicKey}
              />
            </div>
          </ListItem>
          <ListItem button>
            <div className={classes.fullWidth}>
              <ListItemText primary="Private Key" />
              <TextField
                disabled
                fullWidth
                value={info.privateKey}
              />
            </div>
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

export default withStyles(styles)(User);
