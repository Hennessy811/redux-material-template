import { BottomNavigation, BottomNavigationAction, createStyles, Hidden, makeStyles, Theme } from '@material-ui/core';
import { FormatListNumbered, Home, Payment } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      position: 'relative',
    },
    bottom: {
      position: 'sticky',
      bottom: 0,
      left: 0,
      width: '100%',
    },
  })
);

const routes: Record<string, string> = {
  '/': '/',
  '/pay': '/pay',
  '/requests': '/requests',
};

const BottomNav = () => {
  const classes = useStyles();
  const history = useHistory();

  const bottomValue = routes[history.location.pathname] || 'home';

  return (
    <Hidden smUp>
      <BottomNavigation
        className={classes.bottom}
        value={bottomValue}
        onChange={(_e, v) => {
          history.push(v);
        }}
      >
        <BottomNavigationAction label="Главная" value="/" icon={<Home />} />
        <BottomNavigationAction label="Оплатить" value="/pay" icon={<Payment />} />
        <BottomNavigationAction label="Запросы" value="/requests" icon={<FormatListNumbered />} />
      </BottomNavigation>
    </Hidden>
  );
};

export default BottomNav;
