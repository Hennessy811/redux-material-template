import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import { ArrowUpward, Check, Restore } from '@material-ui/icons';
import React from 'react';

const agenda = {
  today: [
    {
      title: 'Ожидают подтверждения',
      subtitle: '4 группы по 2 услугам | 16 человек | 32 540 р.',
      shortSubtitle: '16 человек | 32 540 р.',
    },
    {
      title: 'Запросы от исполнителей',
      subtitle: '2 человека | 13 251 р.',
      shortSubtitle: '2 человека | 13 251 р.',
    },
  ],
  weekly: [],
  all: [],
  postponed: [
    {
      title: 'Запросы от исполнителей',
      subtitle: '13 251 р. | Отложено до 20.04',
      shortSubtitle: '13 251 р. | Отложено до 20.04',
    },
    {
      title: '🔁 SMM-менеджер',
      subtitle: '6 500 р. | Отложено до 30.04',
      shortSubtitle: '6 500 р. | Отложено до 30.04',
    },
  ],
};

const Home = () => {
  const sm = useMediaQuery('(max-width: 600px)');

  return (
    <Box>
      <Box>
        <Typography variant="h4">Повестка дня</Typography>
        <Divider />
        <List>
          {agenda.today.map(item => (
            <ListItem button style={{ paddingRight: 96 }}>
              <ListItemText primary={item.title} secondary={sm ? item.shortSubtitle : item.subtitle}></ListItemText>

              <ListItemSecondaryAction>
                <Grid container spacing={2}>
                  <Grid item>
                    <Tooltip title="Подтвердить все">
                      <IconButton edge="end">
                        <Check />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Отложить">
                      <IconButton edge="end">
                        <Restore color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mt={4}>
        <Typography variant="h3">Отложенные</Typography>
        <Divider />
        <List>
          {agenda.postponed.map(item => (
            <ListItem button style={{ paddingRight: 96 }}>
              <ListItemText primary={item.title} secondary={sm ? item.shortSubtitle : item.subtitle}></ListItemText>

              <ListItemSecondaryAction>
                <Grid container spacing={2}>
                  <Grid item>
                    <Tooltip title="Подтвердить все">
                      <IconButton edge="end">
                        <Check />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Вернуть в повестку">
                      <IconButton edge="end">
                        <ArrowUpward color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Home;
