import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import User from './User';
import Settings from './Settings';
import { DIALOG } from '../constants';

const styles = {
  grow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 10
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: DIALOG.CLOSE,
      difficulty: this.props.difficulty
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      difficulty: nextProps.difficulty
    });
  }

  handleSettingsOpen = () => {
    this.setState({
      dialogOpen: DIALOG.SETTINGS
    });
  };

  handleSettingsClose = ({ type }) => {
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });

    if (type === 'delete') {
      this.props.onDeleteBlocks();
    }
  }

  handleDifficultyChange = (event, difficulty) => {
    this.setState({
      difficulty
    });

    this.props.onChangeDifficulty({event, difficulty});
  };

  handleUserOpen = () => {
    this.setState({
      dialogOpen: DIALOG.USER
    });
  };

  handleUserClose = () => {
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  };

  render() {
    const { title, classes, balance } = this.props;
    const { dialogOpen, difficulty } = this.state;

    const userInfo = {
      username: localStorage.getItem('username'),
      publicKey: localStorage.getItem('publicKey'),
      privateKey: localStorage.getItem('privateKey')
    };
    return (
      <div className="nav-bar">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>{title}</Typography>
            <Typography variant="h6" color="inherit" >{balance} Coins</Typography>
            <IconButton
              color="inherit"
              onClick={this.handleSettingsOpen}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.handleUserOpen}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
          <User
            title="User"
            open={dialogOpen === DIALOG.USER}
            onClose={this.handleUserClose}
            info={userInfo}
          />
          <Settings
            title="Settings"
            open={dialogOpen === DIALOG.SETTINGS}
            onClose={this.handleSettingsClose}
            difficulty={difficulty}
            onChangeDifficulty={this.handleDifficultyChange}
          />
        </AppBar>
      </div>
    );
  }
}

NavBar.protoType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
