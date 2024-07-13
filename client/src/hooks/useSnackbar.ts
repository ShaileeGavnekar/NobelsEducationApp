import React from 'react';
import { useSnackbar } from 'material-ui-snackbar-provider';

const useCustomSnackbar = () => {
  const snackbar = useSnackbar();
  return React.useMemo(() => {
    const showMessage =
      (type: string) =>
      (
        message: string,
        action?: any,
        handleAction?: any,
        customParameters?: any
      ) =>
        snackbar.showMessage(message, action, handleAction, {
          ...customParameters,
          type,
        });
    return {
      ...snackbar,
      showInfo: showMessage('info'),
      showWarning: showMessage('warning'),
      showError: showMessage('error'),
      showSuccess: showMessage('success'),
    };
  }, [snackbar]);
};

export default useCustomSnackbar;
