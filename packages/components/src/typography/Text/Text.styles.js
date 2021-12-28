import { createStyles } from '@mantine/styles';
import { getFontExpressive, getFontProductive } from '../../theme.mixins';

const getFontStyle = (role, strong) => {
  let fontStyles = {};
  switch (role) {
    case 'productive':
      fontStyles = getFontProductive(null, strong && 600);
      break;
    case 'expressive':
      fontStyles = getFontExpressive(null, strong && 600);
      break;
    default:
      break;
  }
  return fontStyles;
};

const getSizes = (theme, size) => {
  return {
    xs: { fontSize: theme.fontSizes['1'], lineHeight: '1em' },
    sm: { fontSize: theme.fontSizes['2'], lineHeight: '1em' },
    md: { fontSize: theme.fontSizes['3'], lineHeight: '1.1em' },
    lg: { fontSize: theme.fontSizes['5'], lineHeight: '1.15em' },
    xl: { fontSize: theme.fontSizes['7'], lineHeight: '1.2em' },
  }[size];
};

export const TextStyles = createStyles((theme, { role, transform, color, strong, size }) => {
  const COLORS = {
    primary: theme.colors.text01,
    secondary: theme.colors.text02,
    tertiary: theme.colors.text03,
    interactive: theme.colors.interactive01,
  };

  return {
    root: {
      ...getFontStyle(role, strong),
      ...getSizes(theme, size),
      textTransform: transform,
      color: COLORS[color] || theme.colors.text02,
    },
  };
});
