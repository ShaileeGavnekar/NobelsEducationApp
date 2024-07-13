import { themes } from '../../theme';

const LayoutSettings = {
  activeTheme: 'purple1',
  themes: themes,
  perfectScrollbar: false,
  leftSidebar: {
    show: true,
    mode: 'full', // full or compact
    theme: 'whitePurple',
  },
  topbar: {
    show: true,
    fixed: true,
    theme: 'whiteBlue',
  },
};

export default LayoutSettings;
