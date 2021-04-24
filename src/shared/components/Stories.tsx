import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Box, Typography } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@material-ui/icons';
import { default as casualHelper } from 'casual-browserify';

const casual: Casual.Generators & Casual.Casual = require('casual-browserify').ru_RU;

interface StoriesItem {
  id: number;
  img: string;
  title: string;
  content: string;
}

const data: StoriesItem[] = [
  {
    id: 1,
    img:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80',
    title: 'Сводка за неделю',
    content: casual.sentence,
  },
  {
    id: 2,
    img:
      'https://images.unsplash.com/photo-1521459382675-a3f2f35a6b9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    title: 'Ваши заказы',
    content: casual.sentence,
  },
  {
    id: 3,
    img:
      'https://images.unsplash.com/photo-1536607278842-2e762f290252?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    title: 'Обороты доставки за квартал выросли на 12%',
    content: casual.sentence,
  },
  {
    id: 4,
    img:
      'https://images.unsplash.com/photo-1533299150403-a196e9ae00ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1383&q=80',
    title: 'Вы нравитесь исполнителям',
    content: casual.sentence,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // height: 250,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      '& .MuiGridListTile-tile': {
        borderRadius: 10,
      },
    },
    img: {
      borderRadius: 15,
    },
    title: {
      color: theme.palette.getContrastText('rgba(0,0,0)'),
      position: 'absolute',
      bottom: 0,
      padding: theme.spacing(3, 2, 2, 2),
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    activeTitleBg: {
      boxSizing: 'border-box',
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: theme.spacing(6, 4, 4, 4),
    },
    activeTitle: {
      color: theme.palette.getContrastText('rgba(0,0,0)'),
      fontSize: theme.typography.pxToRem(32),
      fontWeight: 600,
      lineHeight: 1.2,
      // height: '50%',
    },
    storyImg: {
      // position: 'fixed',
      // top: 0,
      // left: 0,
      // width: '100%',
      // height: '100%',
      // zIndex: 99999,
      // objectFit: 'cover',
    },
    closeBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  })
);

const Stories = () => {
  const classes = useStyles();
  const [activeStory, setActiveStory] = useState<StoriesItem | null>(null);

  return (
    <Box>
      <div className={classes.root}>
        <GridList className={classes.gridList} spacing={10} cols={2.5}>
          {data.map(tile => (
            <GridListTile onClick={() => setActiveStory(tile)} key={tile.img} style={{ height: 150 }}>
              <img src={tile.img} alt={tile.title} />
              <Typography className={classes.title}>{tile.title}</Typography>
              {/* <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            /> */}
            </GridListTile>
          ))}
        </GridList>
      </div>

      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            style={{ pointerEvents: 'auto', position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', zIndex: 99999 }}
          >
            <img src={activeStory.img} className={classes.storyImg} alt="" />
            <IconButton className={classes.closeBtn} onClick={() => setActiveStory(null)}>
              <Close fontSize="large" />
            </IconButton>

            <Box className={classes.activeTitleBg}>
              <Typography gutterBottom className={classes.activeTitle}>
                {activeStory.title}
              </Typography>
              <Typography variant="body2" style={{ color: '#d8d8d8' }}>
                {activeStory.content}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
export default Stories;
