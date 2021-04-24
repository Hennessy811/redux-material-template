import {
  Box,
  IconButton,
  Typography,
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@material-ui/core';
import { Add, ArrowBack, BubbleChart, Dashboard, HourglassEmpty, Person, PieChart, Timeline } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { balance } from '../../shared/components/Layout/Layout';
import QuickActions from '../../shared/components/QuickActions';
import { getPriceStr } from '../../shared/utils/formatters';
import { selectData } from '../../store/features/data';
import { useAppSelector } from '../../store/hooks';

const Profile = () => {
  const history = useHistory();
  // const classes = useStyles();
  const { incomingRequests } = useAppSelector(selectData);

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="subtitle2" gutterBottom noWrap color="textSecondary">
          Профиль организации
        </Typography>
        <Typography variant="h5" noWrap>
          ПАО "cskeleto.dev"
        </Typography>
        <Typography color="textSecondary" variant="caption" gutterBottom>
          Ответственное лицо: Малахов Д.А.
        </Typography>
      </Box>
      <Divider />

      <Box mt={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography gutterBottom variant="h6">
            Баланс: {getPriceStr(balance)}
          </Typography>
        </Box>
        <Button color="primary" variant="contained" startIcon={<Add />}>
          Пополнить
        </Button>

        <Box mt={0}>
          <List subheader={<ListSubheader component="div">Активность компании на платформе</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <Timeline />
              </ListItemIcon>
              <ListItemText primary="Всего заказов: 512" secondary="Активно сейчас: 341" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PieChart />
              </ListItemIcon>
              <ListItemText
                primary={`На сумму: ${getPriceStr(2048102)}`}
                secondary={`Из них комиссия сервиса: ${getPriceStr(5123)},
                налог - ${getPriceStr(512256)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BubbleChart />
              </ListItemIcon>
              <ListItemText primary="Самозанятых вовлечено: 312" secondary="Средний рейтинг: 4.3" />
            </ListItem>
          </List>
        </Box>
      </Box>

      <QuickActions />
    </Box>
  );
};

export default Profile;
