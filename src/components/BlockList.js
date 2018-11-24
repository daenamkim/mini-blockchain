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
import './BlockList.css';

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
  valid: {
    backgroundColor: 'lightgreen',
  },
  invalid: {
    backgroundColor: 'lightcoral',
  }
}

const BlockList = ({ classes, title, blocks }) => (
  <div className="block-list">
    <AppBar position="static" color="default">
      <Toolbar className={classes.flex}>
        <Badge badgeContent={blocks.length || 0} color="primary">
          <span></span>
        </Badge>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.typographyGrow}
        >
          {title}
        </Typography>
        <Button
          variant="fab"
          color="primary"
          className={classes.forceSmall}
          onClick={() => alert("TODO:")}
        >
          <AddIcon />
        </Button>
      </Toolbar>
    </AppBar>
    <ul >
      {blocks.map((item, index) =>
        <li key={index} className="block-list--item">
          <Card className={classes[item.isValid]}>
            <CardActionArea className={classes.flex} component="div">
              <CardContent className={classes.cardGrow}>
                <Typography variant="h6" component="h3">
                  {item.hash}
                </Typography>
                <Typography component="p">
                  PrevHash: {item.prevHash}
                </Typography>
                <Typography component="p">
                  {item.time}
                </Typography>
              </CardContent>
              <IconButton aria-label="Delete" onClick={() => alert("TODO:")}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActionArea>
          </Card>
        </li>
      )}
    </ul>
  </div>
);

BlockList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BlockList);
