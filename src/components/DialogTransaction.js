
import React, { Component } from 'react';
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
// class DialogConfirm extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const { title, open, onClose } = this.props;
//     return ();
//   }
// }
const DialogConfirm = ({ title, open, onClose, classes }) => (
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
        <Button color="inherit" onClick={() => {onClose('create', {});}}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default withStyles(styles)(DialogConfirm);
