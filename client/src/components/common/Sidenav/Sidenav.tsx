import React from 'react';
import { styled } from '@mui/system';
import useSettings from '../../../hooks/useSettings';
import Verticalnav from './Verticalnav';
import Scrollbar from 'react-perfect-scrollbar';
import { DashboardLayoutProps } from '../../Layout/DashboardLayout';

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const Sidenav: React.FC<DashboardLayoutProps> = ({ children, navigations }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      leftSidebar: {
        ...sidebarSettings,
      },
    });
  };

  return (
    <>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <Verticalnav items={navigations} />
      </StyledScrollBar>
      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </>
  );
};

export default Sidenav;
