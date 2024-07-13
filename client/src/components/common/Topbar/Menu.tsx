import React from 'react';
import { styled, Box } from '@mui/system';
import { Menu, ThemeProvider } from '@mui/material';
import useSettings from '../../../hooks/useSettings';

const MenuButton = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  color: theme.palette.text.primary,
  '& div:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface Props {
  shouldCloseOnItemClick?: boolean;
  horizontalPosition?: number | 'left' | 'right' | 'center';
  menuButton: JSX.Element;
}

const MenuComponent: React.FC<Props> = ({
  shouldCloseOnItemClick = true,
  horizontalPosition = 'left',
  menuButton,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const ChildrenArray = React.Children.toArray(children);
  const { settings } = useSettings();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuButton onClick={handleClick}>{menuButton}</MenuButton>
      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Menu
          elevation={8}
          //   getContentAnchorEl={null}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: horizontalPosition,
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: horizontalPosition,
          }}
        >
          {ChildrenArray.map((child, index) => (
            <div
              onClick={shouldCloseOnItemClick ? handleClose : () => {}}
              key={index}
            >
              {child}
            </div>
          ))}
        </Menu>
      </ThemeProvider>
    </>
  );
};

export default MenuComponent;
