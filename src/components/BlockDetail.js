
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
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  fullWidth: {
    width: '100%'
  }
};

const BlockDetail = ({ title, open, onClose, block, classes }) => (
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
            <div className={classes.fullWidth}>
              <ListItemText primary="Hash" />
              <TextField
                disabled
                fullWidth
                value={block.hash || 'No hash'}
              />
            </div>
          </ListItem>
          <ListItem button>
            <div className={classes.fullWidth}>
              <ListItemText primary="Previous Hash" />
              <TextField
                disabled
                fullWidth
                value={block.previousHash || 'No hash'}
              />
            </div>
          </ListItem>
          <ListItem button>
            <div className={classes.fullWidth}>
              <ListItemText primary="Time" />
              <TextField
                disabled
                fullWidth
                value={Date(block.timestamp)}
              />
            </div>
          </ListItem>
          {block.transactions.map((transaction, index) =>
            <ListItem button key={index}>
              <div className={classes.fullWidth}>
                <ListItemText primary={`Transaction ${index}`} />
                <TextField
                  fullWidth
                  onChange={event => {console.log(event.target.value, index);}}
                  value={JSON.stringify(transaction)}
                />
              </div>
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
