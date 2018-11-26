
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
  fullWidth: {
    width: '100%'
  }
};

class BlockDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // transaction: {},
      block: props.block
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({block: nextProps.block});
  }

  handleBlockChange = ({ event, index }) => {
    const block = {...this.state.block};
    try {
      block.transactions[index] = JSON.parse(event.target.value);
    } catch (e) {
      // console.log(e);
      block.transactions = [event.target.value];
    }
    this.setState({
      block
    });
  }

  render() {
    const { title, open, block, onClose, classes, blockIdSelected } = this.props;
    const { block: newBlock } = this.state;
    console.log(newBlock, blockIdSelected);

    return (
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
                      onChange={event => {this.handleBlockChange({event, index})}}
                      defaultValue={JSON.stringify(transaction)}
                    />
                  </div>
                </ListItem>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={event => {
              onClose({ event, newBlock, index: blockIdSelected })
            }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BlockDetail);
