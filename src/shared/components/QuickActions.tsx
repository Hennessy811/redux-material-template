import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import { Dashboard, History, HourglassEmpty, Person } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const QuickActions = () => {
  const history = useHistory();

  return (
    <Box my={6}>
      <Divider light />
      <Box>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Возможно будет полезно
            </ListSubheader>
          }
        >
          <ListItem button onClick={() => history.push('/history')}>
            <ListItemAvatar>
              <Avatar>
                <History />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="История операций" />
          </ListItem>
          <ListItem button onClick={() => history.push('/profile')}>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Профиль организации" />
          </ListItem>
          <ListItem button onClick={() => history.push('/dashboard')}>
            <ListItemAvatar>
              <Avatar>
                <Dashboard />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Дашборд" />
          </ListItem>
          <ListItem button onClick={() => history.push('/404')}>
            <ListItemAvatar>
              <Avatar>
                <HourglassEmpty />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Страница 404" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default QuickActions;
