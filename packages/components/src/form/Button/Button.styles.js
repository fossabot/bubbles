import { createStyles } from '@mantine/styles';
import { pxToRem, getPaddings, getFontExpressive } from './../../theme.mixins';

const getSizes = (size, spacing) => {
  return {
    xs: {
      fontSize: pxToRem(14),
      height: spacing['7'],
      ...getPaddings(spacing['1'], spacing['4']),
    },

    sm: {
      fontSize: pxToRem(14),
      height: spacing['9'],
      ...getPaddings(spacing['2'], spacing['7']),
    },
  }[size];
};

const getVariant = (variant, theme, color) => {
  const variants = {
    default: {
      primary: {
        backgroundColor: theme.colors.interactive01,
        color: theme.colors.text07,
        '&:hover': {
          backgroundColor: theme.colors.interactive01h,
        },
        '&:active': {
          backgroundColor: theme.colors.interactive01,
          borderColor: theme.colors.interactive01h,
        },
      },
      secondary: {
        backgroundColor: theme.colors.interactive02,
        color: theme.colors.text07,
        '&:hover': {
          backgroundColor: theme.colors.interactive02h,
        },
        '&:active': {
          backgroundColor: theme.colors.interactive02,
          borderColor: theme.colors.interactive01,
        },
      },
      tertiary: {
        backgroundColor: theme.colors.interactive03,
        color: theme.colors.text02,
        '&:hover': {
          backgroundColor: theme.colors.interactive03h,
        },
        '&:active': {
          backgroundColor: theme.colors.interactive03,
          borderColor: theme.colors.interactive03h,
        },
      },
      negative: {
        backgroundColor: 'transparent',
        color: theme.colors.text07,
        '&:hover': {
          opacity: '0.8',
        },
        '&:active': {
          backgroundColor: theme.colors.interactive03,
          borderColor: theme.colors.interactive01,
        },
      },
      fatic: {
        backgroundColor: theme.colors.fatic01v0,
        color: theme.colors.fatic01,
        '&:hover': {
          color: theme.colors.text07,
          backgroundColor: theme.colors.fatic01,
        },
        '&:active': {
          backgroundColor: theme.colors.fatic01v0,
          borderColor: theme.colors.fatic01,
          color: theme.colors.fatic01,
        },
      },
    },
    outline: {
      primary: {
        borderColor: theme.colors.interactive01,
        color: theme.colors.interactive01,
        '&:hover': {
          borderColor: theme.colors.interactive01h,
          color: theme.colors.interactive01h,
        },
      },
      secondary: {
        borderColor: theme.colors.interactive02,
        color: theme.colors.interactive02,
        '&:hover': {
          borderColor: theme.colors.interactive02h,
          color: theme.colors.interactive02h,
        },
      },
      tertiary: {
        borderColor: theme.colors.interactive03,
        color: theme.colors.text02,
        '&:hover': {
          borderColor: theme.colors.interactive03h,
          color: theme.colors.text03,
        },
      },
      negative: {
        borderColor: theme.colors.text07,
        color: theme.colors.text07,
        '&:hover': {
          opacity: '0.8',
        },
        '&:active': {
          borderColor: theme.colors.text07,
          color: theme.colors.text07,
          boxShadow: theme.shadows.drop01,
        },
      },
      fatic: {
        borderColor: theme.colors.fatic01,
        color: theme.colors.fatic01,
        '&:hover': {
          opacity: '0.8',
        },
      },
    },
    link: {
      primary: {
        color: theme.colors.interactive01,
        '&:hover': {
          color: theme.colors.interactive01h,
        },
      },
      secondary: {
        color: theme.colors.interactive02,
        '&:hover': {
          color: theme.colors.interactive02h,
        },
      },
      tertiary: {
        color: theme.colors.text02,
        '&:hover': {
          color: theme.colors.text03,
        },
      },
      negative: {
        color: theme.colors.text07,
        '&:hover': {
          opacity: '0.8',
        },
        '&:active': {
          color: theme.colors.text07,
        },
      },
      fatic: {
        color: theme.colors.fatic01,
        '&:hover': {
          opacity: '0.8',
        },
      },
    },
  };
  return variants[variant][color];
};

export const ButtonStyles = createStyles((theme, { size, color, position, variant }) => {
  const currentVariant = getVariant(variant, theme, color);

  return {
    root: {
      ...getFontExpressive(null, 400),
      ...getSizes(size || 'md', theme.spacing),
    },
    inner: {
      justifyContent: position === 'apart' ? 'space-between' : position,
    },
    loading: {
      border: 'transparent',
      svg: {
        stroke: currentVariant.color,
      },
    },
    rightIcon: {
      marginLeft: pxToRem(8),
      marginRight: pxToRem(-8),
    },
    leftIcon: {
      marginRight: pxToRem(8),
      marginLeft: pxToRem(-8),
    },
    label: {
      with: '100%',
    },
    default: {
      border: '2px solid transparent',
      ...getVariant('default', theme, color),
    },
    outline: {
      borderWidth: 2,
      ...getVariant('outline', theme, color),
    },
    link: {
      borderWidth: 5,
      ...getSizes(size || 'md', theme.spacing),
      ...getVariant('link', theme, color),
      paddingLeft: 0,
      paddingRight: 0,

      '&:hover': {
        textDecoration: 'none',
      },
    },
  };
});
