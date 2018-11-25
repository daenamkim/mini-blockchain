
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  forceWidth: {
    width: '100%'
  }
};

const BlockDetail = ({ title, open, onClose, block }) => (
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
            <ListItemText primary="Hash" secondary={block.hash || 'No hash'} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Previous Hash" secondary={block.previousHash || 'No hash'} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Time" secondary={Date(block.timestamp)} />
          </ListItem>
          {block.transactions.map((transaction, index) =>
            <ListItem button key={index}>
              <ListItemText primary={`Transaction ${index}`} secondary={JSON.stringify(transaction)} />
            </ListItem>
          )}
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

export default withStyles(styles)(BlockDetail);
