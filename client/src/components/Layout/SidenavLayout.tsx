import React from 'react';
import Brand from '../common/Brand/Brand';
import { Box, styled, useTheme } from '@mui/system';
import { Switch, Hidden } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Sidenav from '../common/Sidenav/Sidenav';
import { sidenavCompactWidth, sideNavWidth } from '../../utils/constants';
import { convertHexToRGB } from '../../utils/utils';
import { themeShadows } from '../../theme/themeColors';
import { DashboardLayoutProps } from './DashboardLayout';

const SidebarNavRoot = styled(Box)<{ width: number; primaryBg: string }>(
  ({ theme, width, primaryBg }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: width,
    boxShadow: themeShadows[8],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    zIndex: 111,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    transition: 'all 250ms ease-in-out',
    backgroundImage: `linear-gradient(to bottom, rgba(${primaryBg}, 0.96), rgba(${primaryBg}, 0.96))`,
    '&:hover': {
      width: sideNavWidth,
      '& .sidenavHoverShow': {
        display: 'block',
      },
      '& .compactNavItem': {
        width: '100%',
        maxWidth: '100%',
        '& .nav-bullet': {
          display: 'block',
        },
        '& .nav-bullet-text': {
          display: 'none',
        },
      },
    },
  })
);

const NavListBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const LayoutSidenav: React.FC<DashboardLayoutProps> = ({ navigations }) => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.leftSidebar;
  const { mode } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return sidenavCompactWidth;
      default:
        return sideNavWidth;
    }
  };
  const primaryRGB: string = convertHexToRGB(theme.palette.primary.main);
  // console.log(primaryRGB);

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      leftSidebar: {
        ...sidebarSettings,
      },
    });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  return (
    <SidebarNavRoot width={getSidenavWidth()} primaryBg={primaryRGB}>
      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color='secondary'
              size='small'
            />
          </Hidden>
        </Brand>
        <Sidenav navigations={navigations} />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default React.memo(LayoutSidenav);
