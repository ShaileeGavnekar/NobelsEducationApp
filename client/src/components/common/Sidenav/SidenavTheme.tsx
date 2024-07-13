import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material';
import useSettings from '../../../hooks/useSettings';

const SidenavTheme: React.FC = ({ children }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const sidenavTheme = settings.themes[settings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
};

export default SidenavTheme;
