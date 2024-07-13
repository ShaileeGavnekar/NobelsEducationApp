import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { User } from '../../../types/User';

interface DisplayMyProfileProps {
  user: User;
}

const DisplayMyProfile: React.FC<DisplayMyProfileProps> = ({ user }) => {
  console.log(user);
  return (
    <>
      <Box>
        <Typography variant='h2'>My Profile</Typography>
        <Typography variant='subtitle1'>
          Your data, activity, and preferences that help make us more useful to
          you
        </Typography>
      </Box>
      <Box m={4}>
        <Paper elevation={3}>
          <Box m={4}>
            <Typography variant='h6'>Profile</Typography>
            <Typography variant='subtitle2'>
              This info is visible to lorem ispum get text
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem alignItems='flex-start'>
                <ListItemIcon>
                  <BadgeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Name'
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Ali Connors
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    alt='Travis Howard'
                    src='/static/images/avatar/2.jpg'
                  />
                </ListItemAvatar>
                <ListItemText
                  primary='Email'
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                </ListItemAvatar>
                <ListItemText
                  primary='Contact Number'
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
                </ListItemAvatar>
                <ListItemText
                  primary='Address'
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Sandra Adams
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Box>
          <Button>update</Button>
        </Paper>
      </Box>
    </>
  );
};

export default DisplayMyProfile;
