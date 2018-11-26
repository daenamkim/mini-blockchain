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

class TransactionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: '',
      amount: 0
    };
  }

  handleAmountChange = event => {
    const amount = Number.parseInt(event.target.value) || 0;
    console.log(amount);
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
                <TextField
                  className={classes.forceWidth}
                  label="From"
                  value={!isEditable ? transaction.fromAddress : fromAddress}
                  disabled
                />
              </ListItem>
              <ListItem>
                <TextField
                  className={classes.forceWidth}
                  label="To"
                  value={!isEditable ? transaction.toAddress : toAddress}
                  onChange={this.handleToChange}
                  disabled={!isEditable}
                />
              </ListItem>
              <ListItem>
                <TextField
                  className={classes.forceWidth}
                  label="Amount"
                  value={!isEditable ? transaction.amount : amount}
                  onChange={this.handleAmountChange}
                  placeholder="Input a integer number only."
                  disabled={!isEditable}
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              onClick={event => {onClose(event, 'cancel');}}
            >
              Cancel
            </Button>
            {isEditable
              ? <Button
                color="primary"
                onClick={event => {onClose(event, 'create', {fromAddress, toAddress, amount});}}
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
