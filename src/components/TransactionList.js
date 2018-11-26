import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import './TransactionList.css';

const styles = {
  flex: {
    display: 'flex'
  },
  typographyGrow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 20
  },
  cardGrow: {
    flexGrow: 1
  },
  forceSmall: {
    minWidth: 40,
    minHeight: 40,
    width: 40,
    height: 40
  },
  fullWidth: {
    width: '100%'
  },
  deposit: {
    backgroundColor: 'lightblue'
  },
  withdraw: {
    backgroundColor: 'lightcoral'
  },
}

const TransactionList = ({
  myAddress,
  classes,
  title,
  transactions,
  isPendingList,
  onSelectTransaction,
  onDeleteTransaction,
  onCreateTransaction
}) => (
  <div className="transaction-list" style={{flexGrow: 1}}>
    <AppBar position="static" color="default">
      <Toolbar className={classes.flex}>
        <Badge badgeContent={transactions.length || 0} color="primary">
          <span></span>
        </Badge>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.typographyGrow}
        >
          {title}
        </Typography>
        {isPendingList
          ? <Button
              variant="fab"
              color="primary"
              className={classes.forceSmall}
              onClick={onCreateTransaction}
            >
              <AddIcon />
            </Button>
          : null
        }
      </Toolbar>
    </AppBar>
    <ul >
      {transactions.map((transaction, index) =>
        <li key={index} className="transaction-list--item">
          <Card className={classes[isPendingList ? {} : myAddress === transaction.toAddress ? 'deposit' : 'withdraw']}>
            <CardActionArea
              className={classes.flex}
              component="div"
              onClick={event => {
                event.stopPropagation();
                onSelectTransaction({
                  event,
                  id: index,
                  type: isPendingList ? 'pending' : 'complete'
                });
              }}
            >
              <CardContent className={classes.cardGrow}>
                <List>
                  <ListItem>
                    <div className={classes.fullWidth}>
                      <ListItemText primary="Amount" />
                      <TextField
                        fullWidth
                        disabled
                        value={`${transaction.amount || 0} Coins`}
                      />
                    </div>
                  </ListItem>
                </List>
              </CardContent>
              {isPendingList
                ? <IconButton
                    aria-label="Delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteTransaction({event, id: index});
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                : null
              }
            </CardActionArea>
          </Card>
        </li>
      )}
    </ul>
  </div>
);

TransactionList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionList);
