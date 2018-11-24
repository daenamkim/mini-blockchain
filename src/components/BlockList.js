import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import './BlockList.css';

const dummy = new Array(100).fill(1);

const BlockList = ({ title }) => (
  <div className="block-list">
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit">{title}</Typography>
      </Toolbar>
    </AppBar>
    <ul >
      {dummy.map((item, index) =>
        <li key={index} className="block-list--item">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h3">
                  title
                </Typography>
                <Typography component="p">
                  test
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <DeleteIcon />
                Remove
              </Button>
            </CardActions>
          </Card>
        </li>
      )
    }
    </ul>
  </div>
);

export default BlockList;
