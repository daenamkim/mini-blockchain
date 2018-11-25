
import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  forceWidth: {
    width: '100%'
  }
};

const BlockDetail = ({ title, open, onClose, classes }) => (
  <div className="dialog-confirm">
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      scroll="paper"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button>
            <ListItemText primary="Hash" secondary="TODO: hash string" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Previous Hash" secondary="TODO: hash string" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Time" secondary={`TODO: ${Date()}`} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => {onClose('cancel');}}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => {onClose('create', {});}}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default withStyles(styles)(BlockDetail);
