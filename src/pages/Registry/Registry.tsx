import { Box, Button, Chip, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { ArrowBack, Call, DoneAll, KeyboardArrowDown } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPriceStr } from '../../shared/utils/formatters';
import { changeState, selectData, selectRequestItem } from '../../store/features/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useConfirm } from 'material-ui-confirm';
import { emit } from '../../store/features/notifications';
import { motion } from 'framer-motion';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import QuickActions from '../../shared/components/QuickActions';
import cn from 'classnames';

const columns: GridColDef[] = [
  { field: 'fullName', headerName: 'ФИО', width: 160 },
  { field: 'order', headerName: 'Заказ', width: 130 },
  { field: 'specialization', headerName: 'Специальность', width: 130 },
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
  table: {
    height: 300,
    transition: 'all 0.2s',
    overflow: 'hidden',
  },
  collapse: {
    transition: 'all 0.2s',
  },
  collapseActive: {
    transform: 'rotate(180deg)',
  },
  tableHidden: {
    height: 0,
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
  const [tableHidden, setTableHidden] = useState(false);

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
                  {data.state === 'pending' && data.payUntil && (
                    <motion.div layoutId={`request-payUntil-${data.id}`}>
                      <Typography variant="body2" color="textPrimary">
                        Оплатить {data.payUntil}
                      </Typography>
                    </motion.div>
                  )}
                  <motion.div layoutId={`request-price-${data.id}`} initial={{ fontSize: 14 }}>
                    <Typography variant="h4" color="textPrimary" gutterBottom>
                      {getPriceStr(data.price)}
                    </Typography>
                  </motion.div>

                  <Typography variant="body1" color="textSecondary">
                    {data.content}
                  </Typography>
                </Box>
                {data.tag && (
                  <Box>
                    <motion.div layoutId={`request-tag-${data.id}`}>
                      <Chip label={data.tag} color="secondary" />
                    </motion.div>
                  </Box>
                )}
              </Box>
            </Box>
            <Box mt={2}>
              <Grid container spacing={2}>
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

            <Box my={2}>
              <Divider />
            </Box>

            <Typography variant="h6">Ответственный</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary">{data.responsible.fullName}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  +7{data.responsible.phone}
                </Typography>
              </Box>
              <IconButton>
                <Call />
              </IconButton>
            </Box>

            {data.employees.length !== 0 && (
              <Box mt={2} mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Исполнители</Typography>
                  <IconButton onClick={() => setTableHidden(!tableHidden)}>
                    <KeyboardArrowDown className={cn(classes.collapse, { [classes.collapseActive]: tableHidden })} />
                  </IconButton>
                </Box>
                <Box className={cn(classes.table, { [classes.tableHidden]: tableHidden })}>
                  <DataGrid density="compact" rows={data.employees} columns={columns} />
                </Box>
              </Box>
            )}

            <QuickActions />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Registry;
