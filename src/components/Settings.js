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
import { Slider } from '@material-ui/lab';

const User = ({ title, open, onClose, difficulty, onChangeDifficulty }) => (
  <div className="dialog-settings">
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
            <ListItemText
              primary={`Adjust Difficulty: ${difficulty}`}
              secondary="You can adjust difficulty of proof-of-work. The bigger the slower mining."
            />
          </ListItem>
          <ListItem>
            <Slider
              value={difficulty}
              max={8}
              min={2}
              step={1}
              onChange={onChangeDifficulty}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Delete All Blocks"
              secondary="Delete all block included all transactions."
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" color="secondary" onClick={event => onClose({event, type: 'delete'})}>
              Delete
            </Button>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={event => onClose({event, type: 'close'})}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default withMobileDialog()(User);
