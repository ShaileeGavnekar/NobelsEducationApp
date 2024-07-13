import { red } from '@mui/material/colors';
import { themeComponents } from './themeComponents';

const themeOptions = {
  typography: {
    fontSize: 14,
    body1: {
      fontSize: '14px',
    },
    fontFamily: [
      'Lato',
      'Montserrat',
      'Nunito',
      'Roboto',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  status: {
    danger: red[500],
  },
  components: {
    ...themeComponents,
  },
};

export default themeOptions;
