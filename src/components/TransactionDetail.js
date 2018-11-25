import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  forceWidth: {
    width: '100%'
  }
};

const TransactionDetail = ({ title, open, onClose, classes }) => (
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
          <ListItem>
            <TextField
              className={classes.forceWidth}
              label="From"
              value="TODO:dfadsf"
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              className={classes.forceWidth}
              label="To"
            />
          </ListItem>
          <ListItem>
            <TextField
              className={classes.forceWidth}
              label="Amount"
            />
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

export default withStyles(styles)(TransactionDetail);
