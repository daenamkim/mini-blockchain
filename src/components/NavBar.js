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
      difficulty: 2, // TODO: get this from local storage
    }
  }

  handleSettingsOpen = () => {
    console.log("123");
    this.setState({
      dialogOpen: DIALOG.SETTINGS
    });
  };

  handleSettingsClose = settings => {
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  }

  handleDifficultyChange = (event, difficulty) => {
    console.log(difficulty)
    this.setState({
      difficulty
    });
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
    const { title, classes } = this.props;
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
            <Typography variant="h6" color="inherit" >TODO: 200 coins</Typography>
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
