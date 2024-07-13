import { Box, Drawer } from '@mui/material';
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: 0,
      width: '100vw',
      [theme.breakpoints.up('md')]: {
        width: '800px',
      },
    },
  })
);

const SideDrawer: React.FC<SideDrawerProps> = ({ open, children, onClose }) => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Drawer anchor={'right'} open={open} onClose={onClose}>
          <Box className={classes.box} padding={4}>
            {children}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default SideDrawer;
