import React, { Component } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  ListItem,
  TextField,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  fullWidth: {
    width: '100%'
  }
};

class TransactionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: '',
      amount: 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isEditable) {
      this.setState({
        toAddress: '',
        amount: 0
      });
    }
  }

  handleAmountChange = event => {
    const amount = Number.parseInt(event.target.value) || 0;
    this.setState({
      amount
    });
  };

  handleToChange = event => {
    this.setState({
      toAddress: event.target.value
    });
  };

  render() {
    const {
      title,
      open,
      onClose,
      classes,
      fromAddress,
      isEditable,
      transaction
    } = this.props;
    const { toAddress, amount } = this.state;

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
              <ListItem>
                <div className={classes.fullWidth}>
                  <ListItemText primary="From Address" />
                  <TextField
                    fullWidth
                    value={(!isEditable ? transaction.fromAddress : fromAddress) || 'No address'}
                    disabled
                  />
                </div>
              </ListItem>
              <ListItem>
                <div className={classes.fullWidth}>
                  <ListItemText primary="To Address" />
                  <TextField
                    fullWidth
                    value={(!isEditable ? transaction.toAddress : toAddress) || (isEditable ? '' : 'No address')}
                    onChange={this.handleToChange}
                    disabled={!isEditable}
                  />
                </div>
              </ListItem>
              <ListItem>
                <div className={classes.fullWidth}>
                  <ListItemText primary="Amount" />
                  <TextField
                    fullWidth
                    value={(!isEditable ? transaction.amount : amount) || (isEditable ? 0 : 'No value')}
                    onChange={this.handleAmountChange}
                    disabled={!isEditable}
                  />
                </div>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={event => {
                onClose({event, type: 'cancel'});
              }}
            >
              Cancel
            </Button>
            {isEditable
              ? <Button
                color="primary"
                onClick={event => {
                  onClose({event, type: 'create', transaction: {fromAddress, toAddress, amount}});
                }}
                disabled={amount < 1 || toAddress.length < 1}
                >
                  Create
                </Button>
              : null
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default withStyles(styles)(TransactionDetail);
