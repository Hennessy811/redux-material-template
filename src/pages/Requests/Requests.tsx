import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ArrowBack, FilterList } from '@material-ui/icons';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { RequestDataItem } from '../../shared/data/incomingRequests';
import { selectData } from '../../store/features/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { motion } from 'framer-motion';

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

const HistoryItem: FC<{ item: RequestDataItem }> = ({ item }) => {
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
                <Chip label={tag} color="secondary" />
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
        <Button disabled={item.state !== 'pending'} color="primary" variant="contained">
          {item.state === 'pending' && 'Согласовать'}
          {item.state === 'approved' && 'Согласовано'}
          {item.state === 'rejected' && 'Отклонено'}
          {item.state === 'changes requested' && 'Отправлено на доработку'}
        </Button>
      </CardActions>
    </Card>
  );
};

const Requests = () => {
  const history = useHistory();
  const classes = useStyles();
  const { incomingRequests } = useAppSelector(selectData);

  return (
    <Box>
      <Box>
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" mb={1} width="100%">
              <IconButton size="small" onClick={() => history.goBack()}>
                <ArrowBack fontSize="small" />
              </IconButton>
              <Box ml={1} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography variant="h5" noWrap>
                  Все запросы
                </Typography>

                <IconButton>
                  <FilterList color="secondary" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box>
            {incomingRequests
              // .filter(i => i.state !== 'pending')
              .map(item => (
                <Box key={item.id} my={1}>
                  <HistoryItem item={item} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Requests;
