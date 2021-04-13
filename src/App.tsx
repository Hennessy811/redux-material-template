import { Button, Container, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Requests from './pages/Requests';
import Layout from './shared/components/Layout';
import Notifications from './shared/components/Notifications';
import useTheme from './shared/hooks/useTheme';

const baseTheme = createMuiTheme();

function App() {
  const { theme: prefferedTheme } = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: (prefferedTheme === 'system' && prefersDarkMode) || prefferedTheme === 'dark' ? 'dark' : 'light',
          primary: {
            main: '#4CA64B',
          },
          secondary: {
            main: '#333333',
          },
        },
        typography: {
          h1: {
            fontSize: baseTheme.typography.pxToRem(42),
          },
          h2: {
            fontSize: baseTheme.typography.pxToRem(36),
          },
          h3: {
            fontSize: baseTheme.typography.pxToRem(28),
            fontWeight: 100,
          },
        },
      }),
    [prefersDarkMode, prefferedTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/pay" exact>
              <Payments />
            </Route>
            <Route path="/requests" exact>
              <Requests />
            </Route>
          </Switch>
        </Layout>
        <Notifications />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
