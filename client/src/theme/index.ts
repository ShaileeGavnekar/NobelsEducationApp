import { forEach, merge } from 'lodash';
import themeOptions from './themeOptions';
import { themeColors } from './themeColors';
import { createTheme, Theme } from '@mui/material';

export type ThemeArray = { [key: string]: Theme };

const createThemes = () => {
  let themes: ThemeArray = {};

  forEach(themeColors, (value, key) => {
    const ThemeOptions: any = merge({}, themeOptions, value);
    themes[key] = createTheme(ThemeOptions);
  });

  return themes;
};
export const themes = createThemes();
