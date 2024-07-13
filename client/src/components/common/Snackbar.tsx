import React from 'react';
import { Snackbar, Button, ButtonProps, SnackbarProps } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface CustomSnackbarProps {
  message?: string | undefined;
  action?: string | undefined;
  ButtonProps?: Partial<ButtonProps<'button', {}>> | undefined;
  SnackbarProps: Partial<SnackbarProps>;
  customParameters: {
    type: 'error' | 'info' | 'warning' | 'success';
  };
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomSnackbar: React.ComponentType<CustomSnackbarProps> = ({
  message,
  action,
  ButtonProps,
  SnackbarProps,
  customParameters,
}) => {
  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      {...SnackbarProps}
    >
      <Alert
        severity={customParameters?.type}
        sx={{ width: '100%' }}
        action={
          action != null && (
            <Button color='inherit' size='small' {...ButtonProps}>
              {action}
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
