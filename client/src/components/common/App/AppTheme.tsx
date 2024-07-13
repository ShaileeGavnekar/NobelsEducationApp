import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useSettings from '../../../hooks/useSettings';

const AppTheme: React.FC = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
