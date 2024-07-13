import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    zIndex: theme.zIndex.modal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  load: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  loading: boolean;
}

const LoadingScreen: React.FunctionComponent<Props> = ({ loading }) => {
  const classes = useStyles();
  return loading ? (
    <section className={classes.root}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
      >
        <Grid item>
          <CircularProgress thickness={4} size={60} />
        </Grid>
        <Grid item className={classes.load}>
          <Typography variant='h3' align='center'>
            Loading ....
          </Typography>
        </Grid>
      </Grid>
    </section>
  ) : null;
};

export default LoadingScreen;
