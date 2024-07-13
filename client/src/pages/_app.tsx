import type { AppProps } from 'next/app';
import React from 'react';
import { CssBaseline } from '@mui/material';
import { Router, useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { User } from '../types/User';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import CustomSnackbar from '../components/common/Snackbar';
import AppTheme from '../components/common/App/AppTheme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import AuthProvider, { ProtectRoute } from '../contexts/AuthContext';
export interface ComponentProps {
  user?: User;
  refetchViewer: () => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /* Page loading animation */
  const [routeChange, setRouteChange] = React.useState<boolean>(false);

  Router.events.on('routeChangeStart', () => {
    setRouteChange(true);
  });
  Router.events.on('routeChangeComplete', () => setRouteChange(false));
  Router.events.on('routeChangeError', () => setRouteChange(false));

  return (
    <>
      <CssBaseline />
      {/* @ts-ignore */}
      <SnackbarProvider SnackbarComponent={CustomSnackbar}>
        <AppTheme>
          <CssBaseline />
          {/* <MenuAppBar /> */}
          <AuthProvider>
            <ProtectRoute>
              <Component {...pageProps} />
            </ProtectRoute>
          </AuthProvider>
        </AppTheme>
      </SnackbarProvider>
    </>
  );
}

const App = (props: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={props.pageProps.dehydratedState}>
          <MyApp {...props} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
};

export default App;
