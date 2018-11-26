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
import {
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import './BlockList.css';

const styles = {
  flex: {
    display: 'flex'
  },
  typographyGrow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 20,
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

const BlockList = ({
  classes,
  title,
  chain,
  onSelectBlock,
  onDeleteBlock,
  onCancelBlock,
  onCreateBlock
}) => (
  <div className="block-list">
    <AppBar position="static" color="default">
      <Toolbar className={classes.flex}>
        <Badge badgeContent={chain.length || 0} color="primary">
          <span></span>
        </Badge>
        <div className={classes.typographyGrow}>
          <Typography
            variant="h6"
              color="inherit"
          >
            {title}
          </Typography>
        </div>
        <Button
          aria-label="Cancel"
          color="inherit"
          onClick={onCancelBlock}
        >
          Cancel
        </Button>
        <Button
          variant="fab"
          color="primary"
          className={classes.forceSmall}
          onClick={onCreateBlock}
        >
          <AddIcon />
        </Button>
      </Toolbar>
    </AppBar>
    <ul >
      {chain.map((block, index) =>
        <li key={index} className="block-list--item">
          <Card className={classes[block.isValid() ? 'valid' : 'invalid']}>
            <CardActionArea
              className={classes.flex}
              component="div"
              onClick={event => { event.stopPropagation(); onSelectBlock(event, index, chain);}}
            >
              <CardContent className={classes.cardGrow}>
                <Typography variant="h6" component="h3">
                  Hash: {block.hash || 'No hash'}
                </Typography>
                <Typography component="p">
                  Previous Hash: {block.previousHash}
                </Typography>
                <Typography component="p">
                  {new Date(block.timestamp).toString()}
                </Typography>
              </CardContent>
              {/* <IconButton
                aria-label="Delete"
                onClick={event => { event.stopPropagation(); onDeleteBlock(index);}}
              >
                <DeleteIcon fontSize="small" />
              </IconButton> */}
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