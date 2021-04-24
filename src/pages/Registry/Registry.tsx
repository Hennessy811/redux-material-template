import { Box, Button, Chip, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { ArrowBack, DoneAll } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPriceStr } from '../../shared/utils/formatters';
import { changeState, selectData, selectRequestItem } from '../../store/features/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useConfirm } from 'material-ui-confirm';
import { emit } from '../../store/features/notifications';
import { motion } from 'framer-motion';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'ФИО', width: 160 },
  { field: 'order', headerName: 'Заказ', width: 130 },
  { field: 'specialization', headerName: 'Специальность', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) => `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

const useStyles = makeStyles({
  media: {
    height: 140,
    width: '100%',
    objectFit: 'cover',
    position: 'absolute',
    left: 0,
    top: 55,
  },
  root: {
    marginTop: (props: { img: boolean }) => (props.img ? 125 : 0),
  },
});

const transition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const imageVariants = {
  exit: { y: '50%', opacity: 0, transition },
  enter: {
    y: '0%',
    opacity: 1,
    transition,
  },
};
const backVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 0.1, ...transition } },
};

const Registry = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const data = useAppSelector((store: RootState) => selectRequestItem(store, id))!;
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const classes = useStyles({ img: !!data.img });

  const handleReject = () => {
    confirm({ title: 'Отклонить запрос?', description: 'Это действие будет нельзя отменить', cancellationText: 'Отмена' }).then(() => {
      dispatch(emit('Отклонено', 'warning'));
      dispatch(changeState({ id: data.id, status: 'rejected' }));
    });
  };

  return (
    <motion.div className="single" initial="exit" animate="enter" exit="exit">
      <Box>
        {data.img && (
          <motion.div variants={imageVariants} layoutId={`request-media-${data.id}`}>
            {' '}
            <img src={data.img} className={classes.media} alt="" />
          </motion.div>
        )}
        <Box className={classes.root}>
          <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" mb={1}>
                <motion.div variants={backVariants}>
                  <IconButton size="small" onClick={() => history.goBack()}>
                    <ArrowBack fontSize="small" />
                  </IconButton>
                </motion.div>
                <Box ml={1}>
                  <motion.div layoutId={`request-title-${data.id}`}>
                    <Typography variant="h5" noWrap>
                      {data.title}
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  {data.state === 'pending' && (
                    <motion.div layoutId={`request-payUntil-${data.id}`}>
                      <Typography variant="body2" color="textPrimary">
                        Оплатить {data.payUntil}
                      </Typography>
                    </motion.div>
                  )}
                  <motion.div layoutId={`request-price-${data.id}`} initial={{ fontSize: 14 }}>
                    <Typography variant="h4" color="textPrimary">
                      {getPriceStr(data.price)}
                    </Typography>
                  </motion.div>
                </Box>
                <Box>
                  <motion.div layoutId={`request-tag-${data.id}`}>
                    <Chip label={data.tag} color="secondary" />
                  </motion.div>
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      dispatch(changeState({ id: data.id, status: 'approved' }));
                      dispatch(emit('Согласовано', 'success'));
                    }}
                    disabled={data.state !== 'pending'}
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    {data.state === 'pending' && 'Согласовать'}
                    {data.state === 'approved' && 'Согласовано'}
                    {data.state === 'rejected' && 'Отклонено'}
                    {data.state === 'changes requested' && 'Отправлено на доработку'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => dispatch(changeState({ id: data.id, status: 'changes requested' }))}
                    disabled={data.state !== 'pending'}
                    fullWidth
                    color="primary"
                    variant="outlined"
                  >
                    Нужна доработка
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button disabled={data.state !== 'pending'} fullWidth color="secondary" variant="outlined" onClick={() => handleReject()}>
                    Отклонить
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2} mb={2} height={380}>
              <Typography variant="h6">Исполнители</Typography>
              <DataGrid rows={data.employees} columns={columns} />
            </Box>
            {/* <List>
          {incomingRequests.map(item => (
            <Box my={1}>
              <FeedItem item={item} />
            </Box>
          ))}
        </List> */}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Registry;
