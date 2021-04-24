import { Box, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Registry from './pages/Registry';
import Requests from './pages/Requests';
import Layout from './shared/components/Layout';
import Notifications from './shared/components/Notifications';
import useTheme from './shared/hooks/useTheme';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { ruRU } from '@material-ui/core/locale';
import History from './pages/History';

const baseTheme = createMuiTheme();

function App() {
  const { theme: prefferedTheme } = useTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme(
        {
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
            // fontSize: 14,
            // fontFamily: [
            //   '-apple-system',
            //   'BlinkMacSystemFont',
            //   '"Segoe UI"',
            //   'Roboto',
            //   '"Helvetica Neue"',
            //   'Arial',
            //   'sans-serif',
            //   '"Apple Color Emoji"',
            //   '"Segoe UI Emoji"',
            //   '"Segoe UI Symbol"',
            // ].join(','),
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
        },
        ruRU
      ),
    [prefersDarkMode, prefferedTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <AnimateSharedLayout type="crossfade">
          <BrowserRouter>
            <Route
              render={({ location }) => (
                <AnimatePresence exitBeforeEnter initial={false}>
                  <Switch location={location} key={location.pathname}>
                    <Route path="/" exact>
                      <AnimatePresence>
                        <Layout>
                          <Home />
                        </Layout>
                      </AnimatePresence>
                    </Route>
                    <Route path="/pay" exact>
                      <Layout>
                        <Payments />
                      </Layout>
                    </Route>
                    <Route path="/feed" exact>
                      <Layout>
                        <Feed />
                      </Layout>
                    </Route>
                    <Route path="/requests" exact>
                      <Layout>
                        <Requests />
                      </Layout>
                    </Route>
                    <Route path="/registry" exact>
                      <Layout>
                        <Registry />
                      </Layout>
                    </Route>
                    <Route path="/history" exact>
                      <Layout>
                        <History />
                      </Layout>
                    </Route>
                    <Route path="/registry/:id" exact>
                      <Layout>
                        <Registry />
                      </Layout>
                    </Route>
                    <Route path="/**" exact>
                      <Layout>
                        <Box>Unknown route</Box>
                      </Layout>
                    </Route>
                  </Switch>
                  <Notifications />
                </AnimatePresence>
              )}
            />
          </BrowserRouter>
        </AnimateSharedLayout>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
