import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface ITemporaryDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TemporaryDrawer: React.FC<ITemporaryDrawerProps> = ({
  open,
  setOpen,
}) => {
  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(true);
    };

  //   const list = () => (
  //     <Box
  //       sx={{ width: 250 }}
  //       role='presentation'
  //       onClick={toggleDrawer()}
  //       onKeyDown={toggleDrawer()}
  //     >
  //       <List>
  //         {['My Profile', 'Explore Course', 'My Classes', 'My Payments'].map(
  //           (text, index) => (
  //             <ListItem button key={text}>
  //               <ListItemIcon>
  //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //               </ListItemIcon>
  //               <ListItemText primary={text} />
  //             </ListItem>
  //           )
  //         )}
  //       </List>
  //       <Divider />
  //     </Box>
  //   );

  //   return (
  //     <div>
  //       <React.Fragment key={'left'}>
  //         <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
  //           {list()}
  //         </Drawer>
  //       </React.Fragment>
  //     </div>
  //   );
  // };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {['My Profile', 'Explore Course', 'My Courses', 'My Classes', 'My Payments'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>

      <React.Fragment key={"left"}>

        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>

    </div>
  )
};


export default TemporaryDrawer
