import { Container, createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React from 'react';
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
      <Box>
        <Container maxWidth="sm">
          <Typography>Hello world</Typography>
        </Container>
        <Notifications />
      </Box>
    </ThemeProvider>
  );
}

export default App;
