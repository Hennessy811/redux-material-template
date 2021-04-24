import {
  Box,
  Divider,
  List,
  Typography,
  IconButton,
  useMediaQuery,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  CardActions,
  Button,
  Chip,
} from '@material-ui/core';
import { DoneAll, KeyboardArrowDown } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboard from './Dashboard';
import cn from 'classnames';
import { RequestDataItem } from '../../shared/data/incomingRequests';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { approveAll, changeState, selectData, selectRequestItem } from '../../store/features/data';
import { RootState } from '../../store/store';
import Onboarding from '../../shared/components/Onboarding';
import Stories from '../../shared/components/Stories';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  dashboard: {
    height: 300,
    transition: 'all 0.2s',
    overflow: 'hidden',
  },
  dashboardHidden: {
    height: 0,
  },
  collapse: {
    transition: 'all 0.2s',
  },
  collapseActive: {
    transform: 'rotate(180deg)',
  },
});

const FeedItem: FC<{ item: RequestDataItem }> = ({ item }) => {
  const classes = useStyles();
  const { content, img, title, price, tag, payUntil, id } = item;
  const history = useHistory();
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          history.push(`/registry/${id}`);
        }}
      >
        {img && (
          <motion.div layoutId={`request-media-${item.id}`}>
            <CardMedia className={classes.media} image={img} title="Contemplative Reptile" />
          </motion.div>
        )}
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <motion.div layoutId={`request-title-${item.id}`}>
              <Typography variant="h5" component="p">
                {title}
              </Typography>
            </motion.div>
            {tag && (
              <motion.div layoutId={`request-tag-${item.id}`}>
                <Chip label={tag} color={tag === 'Внутренний' ? 'default' : 'secondary'} />
              </motion.div>
            )}
          </Box>
          {payUntil && (
            <motion.div layoutId={`request-payUntil-${item.id}`}>
              <Typography gutterBottom variant="caption" component="p">
                Оплатить {payUntil}
              </Typography>
            </motion.div>
          )}
          <motion.div layoutId={`request-price-${item.id}`}>
            <Typography color="textPrimary" component="p" style={{ fontSize: 18, fontWeight: 600 }}>
              {price.toLocaleString('ru', { currency: 'RUB', style: 'currency' })}
            </Typography>
          </motion.div>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth onClick={() => dispatch(changeState({ id: item.id, status: 'approved' }))} color="primary" variant="contained">
          Подтвердить
        </Button>
        <Button fullWidth onClick={() => dispatch(changeState({ id: item.id, status: 'changes requested' }))} color="secondary">
          На доработку
        </Button>
      </CardActions>
    </Card>
  );
};

const Home = () => {
  const history = useHistory();
  const sm = useMediaQuery('(max-width: 600px)');
  const classes = useStyles();
  const [hideDashboard, setHideDashboard] = useState(false);
  const { incomingRequests } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const data = incomingRequests.filter(i => i.state === 'pending');

  return (
    <Box>
      <Stories />
      <Box mt={2}>
        {/* <Onboarding /> */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Текущие заказы</Typography>
          <IconButton onClick={() => setHideDashboard(!hideDashboard)}>
            <KeyboardArrowDown className={cn(classes.collapse, { [classes.collapseActive]: hideDashboard })} />
          </IconButton>
        </Box>
        <Divider />
        <Box className={cn(classes.dashboard, { [classes.dashboardHidden]: hideDashboard })}>
          <Dashboard />
        </Box>
      </Box>
      <Box mt={hideDashboard ? 2 : -1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Повестка дня</Typography>
          <IconButton onClick={() => dispatch(approveAll())}>
            <DoneAll color="primary" />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {data.map(item => (
            <Box key={item.id} my={1}>
              <FeedItem item={item} />
            </Box>
          ))}
          {data.length === 0 && (
            <Box my={10}>
              <Typography align="center" color="textSecondary" variant="body1">
                На сегодня все, отличная работа!
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Home;
