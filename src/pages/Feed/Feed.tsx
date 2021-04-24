import {
  Box,
  Typography,
  Divider,
  List,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  CardActions,
  Button,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React, { FC } from 'react';
import Stories from '../../shared/components/Stories';
import { NewsFeedItem } from '../../shared/data/newsFeed';
import { selectNews } from '../../store/features/data';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const FeedItem: FC<{ item: NewsFeedItem }> = ({ item }) => {
  const classes = useStyles();
  const { content, image, subtitle, title, type } = item;
  return (
    <Card>
      <CardActionArea>
        {image && <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />}
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="textSecondary">
            {subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      {type === 'internal' && (
        <Box px={1} mt={-2} pb={1}>
          <CardActions>
            <Button color="primary" variant="contained">
              Подробнее
            </Button>
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

const Feed = () => {
  const classes = useStyles();
  const news = useAppSelector(selectNews);

  return (
    <Box>
      <Stories />
      <Box mt={2}>
        <Typography variant="h4">Новости</Typography>
        <Divider />
        <List>
          {news.map(item => (
            <Box key={item.title} my={1}>
              <FeedItem item={item} />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Feed;
