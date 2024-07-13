import React from 'react';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from '@mui/material';
import { themeColors } from '../../../../theme/themeColors';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    transition: 'all 0.3s',

    boxShadow: '3px 2px 29px -19px rgba(0,0,0,0.75) !important',
    // '&:hover': {
    //   boxShadow:
    //     '1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important',
    //   transform: 'translateY(-3px)',
    // },
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    color: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export interface PostType {
  title: any;
  subtitle: any;
  authorName: any;
  authorImage: any;
  slug: any;
  date: any;
  coverImage: any;
}

const Post: React.FC<PostType> = ({
  title,
  subtitle,
  authorName,
  authorImage,
  slug,
  date,
  coverImage,
}) => {
  const classes = useStyles();
  return (
    <Link
      href='/dashboard/teacher/blog/[slug]'
      as={`/dashboard/teacher/blog/${slug}`}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='avator image'
              className={classes.avatar}
              style={{
                backgroundImage: `url(${authorImage})`,
              }}
            />
          }
          title={authorName}
          subheader={moment(date).format('MMMM Do YYYY')}
        />
        <CardMedia className={classes.media} image={coverImage} title={title} />
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
            sx={{ color: themeColors.purpleDark1.palette.primary.main }}
          >
            {title}
          </Typography>
          <Typography variant='body1' color='textSecondary' component='p'>
            {subtitle.length > 170 ? subtitle.substr(0, 170) + '...' : subtitle}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Post;
