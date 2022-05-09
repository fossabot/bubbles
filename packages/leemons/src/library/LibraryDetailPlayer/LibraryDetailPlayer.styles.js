import { createStyles, pxToRem, getFontExpressive } from '@bubbles-ui/components';

export const LibraryDetailPlayerStyles = createStyles(
  (theme, { height, color, seconds, showPlayer }) => {
    return {
      root: {
        ...getFontExpressive(theme.fontSizes['2']),
      },
      coverWrapper: {
        position: 'relative',
        height: pxToRem(height),
      },
      color: {
        backgroundColor: color,
        height: pxToRem(8),
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0,
        right: 0,
      },
      reactPlayerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: showPlayer ? 3 : -3,
      },
      reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      audioIcon: {
        position: 'absolute',
        bottom: 30,
        left: 10,
      },
      progressBarWrapper: {
        position: 'absolute',
        bottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        left: 8,
        right: 8,
      },
      progressBar: {
        WebkitAppearance: 'none',
        height: pxToRem(8),
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
      },
      duration: {
        color: theme.colors.mainWhite,
        minWidth: seconds < 3600 ? pxToRem(30) : pxToRem(46),
      },
      progressBarValue: {
        height: '100%',
        backgroundColor: '#fff',
        transition: 'width 0.1s linear',
        position: 'relative',
      },
      seekSlider: {
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        height: pxToRem(8),
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        cursor: 'pointer',
        '::-webkit-slider-thumb': {
          visibility: 'hidden',
          WebkitAppearance: 'none',
          appearance: 'none',
          width: pxToRem(8),
          height: pxToRem(8),
          borderRadius: '50%',
          backgroundColor: theme.colors.mainBlack,
          cursor: 'pointer',
        },
        '::-moz-range-thumb': {
          visibility: 'hidden',
          MozAppearance: 'none',
          appearance: 'none',
          width: pxToRem(8),
          height: pxToRem(8),
          borderRadius: '50%',
          backgroundColor: theme.colors.mainBlack,
          cursor: 'pointer',
        },
      },
      titleRow: {
        display: 'flex',
        alignItems: 'baseline',
        padding: `${pxToRem(16)} ${pxToRem(16)} ${pxToRem(10)} ${pxToRem(16)}`,
        gap: pxToRem(16),
        backgroundColor: theme.colors.mainWhite,
      },
      title: {
        fontWeight: 600,
        flex: 1,
      },
      fileIcon: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: theme.colors.interactive03h,
        padding: pxToRem(16),
        borderRadius: '4px 2px 0 0',
      },
    };
  }
);
