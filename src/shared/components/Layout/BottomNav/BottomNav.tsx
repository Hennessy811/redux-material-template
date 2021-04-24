import { BottomNavigation, BottomNavigationAction, createStyles, makeStyles, Theme } from '@material-ui/core';
import { AccountBox, ArtTrack, FormatListNumbered, History, Home } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
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

const BottomNav = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <BottomNavigation
      className={classes.bottom}
      value={history.location.pathname}
      onChange={(_e, v) => {
        history.push(v);
      }}
    >
      <BottomNavigationAction label="Главная" value="/" icon={<Home />} />
      <BottomNavigationAction label="Новости" value="/feed" icon={<ArtTrack />} />
      <BottomNavigationAction label="Запросы" value="/requests" icon={<FormatListNumbered />} />
      <BottomNavigationAction label="История" value="/history" icon={<History />} />
    </BottomNavigation>
  );
};

export default BottomNav;
