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
  List,
  ListItem,
  ListItemText,
  TextField
} from '@material-ui/core';
import {
  Add as AddIcon,
  Sync as SyncIcon
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
    backgroundColor: 'lightgreen'
  },
  invalid: {
    backgroundColor: 'lightcoral'
  },
  sync: {
    animation: 'rotate 2s linear infinite'
  },
  fullWidth: {
    width: '100%'
  }
}

const BlockList = ({
  classes,
  title,
  chain,
  isChainValid,
  onSelectBlock,
  onCreateBlock,
  isMining
}) => (
  <div className="block-list">
    <AppBar position="static" color="default" className={classes[isChainValid ? {} : 'invalid']}>
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
          variant="fab"
          color="primary"
          className={classes.forceSmall}
          onClick={onCreateBlock}
          disabled={isMining}
        >
          {isMining
            ? <SyncIcon className={classes.sync} />
            : <AddIcon />
          }
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
              onClick={event => {
                event.stopPropagation();
                onSelectBlock({event, id: index});
              }}
            >
              <CardContent className={classes.cardGrow}>
                <List>
                  <ListItem>
                    <div className={classes.fullWidth}>
                    <ListItemText primary="Hash" />
                    <TextField
                      fullWidth
                      disabled
                      value={block.hash || 'No hash'}
                    />
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className={classes.fullWidth}>
                    <ListItemText primary="Previous Hash" />
                    <TextField
                      fullWidth
                      disabled
                      value={block.previousHash || 'No hash'}
                    />
                    </div>
                  </ListItem>
                </List>
              </CardContent>
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
