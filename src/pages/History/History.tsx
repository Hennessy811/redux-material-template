import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const History = () => {
  const history = useHistory();
  return (
    <Box>
      <Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" mb={1}>
              <IconButton size="small" onClick={() => history.goBack()}>
                <ArrowBack fontSize="small" />
              </IconButton>
              <Box ml={1}>
                <Typography variant="h5" noWrap>
                  История
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default History;
