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
  IconButton
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
  }
}

const TransactionList = ({ classes, title, transactions, isMutable }) => (
  <div className="transaction-list">
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
        {isMutable
          ? <Button
              variant="fab"
              color="primary"
              className={classes.forceSmall}
              onClick={() => alert("TODO:")}
            >
              <AddIcon />
            </Button>
          : null
        }
      </Toolbar>
    </AppBar>
    <ul >
      {transactions.map((item, index) =>
        <li key={index} className="transaction-list--item">
          <Card className={classes[item.isValid]}>
            <CardActionArea className={classes.flex} component="div">
              <CardContent className={classes.cardGrow}>
                <Typography variant="h6" component="h3">
                  From: {item.from}
                </Typography>
                <Typography variant="h6" component="h3">
                  To: {item.to}
                </Typography>
                <Typography component="p">
                  Amount: {item.amount} Coins
                </Typography>
                <Typography component="p">
                  {item.time}
                </Typography>
              </CardContent>
              {isMutable
                ? <IconButton aria-label="Delete" onClick={() => alert("TODO:")}>
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
