import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Avatar } from '@mui/material';
import { PostType } from './Post';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
  },
  avatar: {
    width: '3em',
    height: '3em',
    boxShadow: '0px 0px 10px 1px #b2b2b28f',
  },
}));

const BlogHeader: React.FC<PostType> = ({
  title,
  subtitle,
  authorName,
  authorImage,
  date,
  coverImage,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container direction='column' spacing={3}>
        <br />
        <br />

        <Grid item container wrap='nowrap' alignItems='center' spacing={3}>
          <Grid item>
            <Avatar
              aria-label='avator image'
              className={classes.avatar}
              src={authorImage}
            />
          </Grid>
          <Grid item container direction='column'>
            <Grid item>
              <Typography>{authorName}</Typography>
            </Grid>
            <Grid item>
              <Typography color='textSecondary'>
                {moment(date).format('MMMM Do YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h3'>{title}</Typography>
        </Grid>
        <Grid item>
          <img src={coverImage} style={{ height: 'auto', width: '100%' }} />
        </Grid>
        <Grid item>
          <Typography variant='h5'>{subtitle}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogHeader;
