import { Box, createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import React, { FC } from 'react';
import BottomNav from './BottomNav';
import { useHistory } from 'react-router-dom';
import Logo from '../../images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      position: 'relative',
    },
    name: {
      maxWidth: 150,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 100,
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
    },
    balance: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 600,
    },
  })
);

const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const balance = 1689540.42;

  return (
    <Box className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
              <img src={Logo} width={24} height={24} alt="Logo" />
              <Box ml={1}>
                <Typography className={classes.name} onClick={() => history.push('/')}>
                  ПАО "cskeleto.dev"
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography onClick={() => history.push('/profile')} className={classes.balance}>
                {balance.toLocaleString('ru', { style: 'currency', currency: 'RUB' })}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box py={3} minHeight="calc(100vh - 56px - 56px - 48px)">
        <Container maxWidth="sm">
          <Box>{children}</Box>
        </Container>
      </Box>

      <BottomNav />
    </Box>
  );
};

export default Layout;
