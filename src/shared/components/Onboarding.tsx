import { Button, createStyles, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import React, { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .Slide-title-154': {
        whiteSpace: 'wrap !important',
      },
    },
  })
);

const Onboarding = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(!localStorage.getItem('onboarding_completed'));

  const onClose = () => {
    setOpen(false);
    localStorage.setItem('onboarding_completed', '1');
  };
  const sm = useMediaQuery('(max-width: 600px)');

  return (
    <div style={{ position: 'relative', width: '100%' }} className={classes.root}>
      <Button onClick={() => localStorage.removeItem('onboarding_completed')}>Reset</Button>
      <AutoRotatingCarousel
        label="Приступим"
        open={open}
        mobile={sm}
        autoPlay={false}
        onClose={() => onClose()}
        onStart={() => onClose()}
        style={{ position: 'absolute' }}
      >
        <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />}
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="Мобильный заказчик"
          subtitle="Создано, чтобы держать в курсе дел"
        />
        <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />}
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Быстрый доступ"
          subtitle="Самые важные данные и действия - ближе двух нажатий"
        />
        <Slide
          media={<img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />}
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="Production-ready"
          subtitle="Эта демо-версия написана сразу для прода. Just plug-n-play."
        />
      </AutoRotatingCarousel>
    </div>
  );
};

export default Onboarding;
