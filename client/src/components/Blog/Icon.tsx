import { Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
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

const BlogHeader: React.FC = ({}) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container direction='column' spacing={3}>
        <br />
        <br />

        <Grid item>
          <IconButton>
            <FavoriteIcon fontSize='large' color='error'></FavoriteIcon>
          </IconButton>
          <IconButton sx={{ marginLeft: '1em' }}>
            <ChatBubbleIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogHeader;
