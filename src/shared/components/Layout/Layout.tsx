import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Button,
  Container,
  ListItem,
  ListItemText,
  List,
  GridListTile,
  ListSubheader,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import { FC } from 'react';
import BottomNav from './BottomNav';
import { Close, ExitToApp, FormatListNumbered, Home, Inbox, Menu as MenuIcon, Payment } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      position: 'relative',
    },
  })
);

const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Наймикс</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box py={2}>
          <Box>
            <List>
              <ListItem style={{ width: 250 }}>
                <ListItemText primary="Дмитрий Малахов" secondary="csekeleto.dev Inc."></ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <ExitToApp />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider />
          </Box>
          <List style={{ width: 300 }}>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Главная"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Оплатить"></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <FormatListNumbered />
              </ListItemIcon>
              <ListItemText primary="Запросы"></ListItemText>
            </ListItem>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <ListItemIcon>
                <Close />
              </ListItemIcon>
              <ListItemText primary="Закрыть"></ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box px={2} py={3} minHeight="calc(100vh - 56px - 56px - 48px)">
        <Container maxWidth="sm">
          <Box>{children}</Box>
        </Container>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Layout;
