const palette = {
  white: '#ffffff',
  yellow: '#fad55f',
  orange: '#f8a13e',
  darkOrange: '#f77120',
  lightGreen: '#80d424',
  green: '#439421',
  lightRed: '#f34f5e',
  red: '#a30c22',
  darkRed: '#c31b2f',
  grey: '#d0d0d0',
  darkGrey: '#979797',
};

export const theme = {
  colors: {
    background: palette.white,
    primary: palette.orange,
    secondary: palette.darkOrange,
    success: palette.lightGreen,
    failure: palette.red,
    cancel: palette.grey,
    boxBorder: palette.darkGrey,
    tileBorder: palette.darkRed,
  },
  gradients: {
    notSelected: [palette.yellow, palette.darkOrange],
    selected: [palette.lightGreen, palette.green],
    invalid: [palette.lightRed, palette.red],
  },
};
