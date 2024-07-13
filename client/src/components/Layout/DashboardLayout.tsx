import React, { useEffect, useRef } from 'react';
import { styled, Box, useTheme } from '@mui/system';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import Scrollbar from 'react-perfect-scrollbar';
import useSettings from '../../hooks/useSettings';
import { sidenavCompactWidth, sideNavWidth } from '../../utils/constants';
import SidenavTheme from '../common/Sidenav/SidenavTheme';
import SidenavLayout from './SidenavLayout';
import Topbar from '../common/Topbar/Topbar';

const DashboardLayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
}));

const LayoutContainer = styled(Box)<{ width: number }>(({ width }) => ({
  height: '100vh',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: width,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  marginRight: 0,
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export interface DashboardLayoutProps {
  navigations: any;
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  navigations,
  children,
}) => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = settings;
  const topbarTheme = settings.themes[settings.topbar.theme];

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;
  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return sideNavWidth;
      case 'compact':
        return sidenavCompactWidth;
      default:
        return 0;
    }
  };

  const sidenavWidth = getSidenavWidth();

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.leftSidebar.mode;
    if (settings.leftSidebar.show) {
      let mode = isMdScreen ? 'close' : sidebarMode;
      updateSettings({ leftSidebar: { mode } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <DashboardLayoutRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <SidenavLayout navigations={navigations} />
        </SidenavTheme>
      )}
      <LayoutContainer width={sidenavWidth}>
        {settings.topbar.show && settings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <Topbar fixed={true} />
          </ThemeProvider>
        )}
        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {settings.topbar.show && !settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Topbar />
              </ThemeProvider>
            )}
          </StyledScrollBar>
        )}
        {!settings.perfectScrollbar && (
          <ContentBox>
            {settings.topbar.show && !settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Topbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position='relative'>
              {children}
            </Box>
          </ContentBox>
        )}
      </LayoutContainer>
    </DashboardLayoutRoot>
  );
};

export default React.memo(DashboardLayout);
