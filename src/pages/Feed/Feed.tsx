import { Box, Typography, Divider, List, CardMedia, Card, CardActionArea, CardContent, makeStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React, { FC } from 'react';

const data = [
  {
    img:
      'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Lizard',
    content:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    img:
      'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Lizardus',
    content:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    img:
      'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Milky',
    content:
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
];

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface FeedDataItem {
  img: string;
  title: string;
  content: string;
}

const FeedItem: FC<{ item: FeedDataItem }> = ({ item }) => {
  const classes = useStyles();
  const { content, img, title } = item;
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={img} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

const Feed = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h4">Новости</Typography>
        <Divider />
        <List>
          {data.map(item => (
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
