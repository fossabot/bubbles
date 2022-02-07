import React from 'react';
import PropTypes from 'prop-types';
import { Box, ImageLoader, Title } from '@bubbles-ui/components';
import { LibraryCardCoverStyles } from './LibraryCardCover.styles';
import { LIBRARYCARD_VARIANTS } from '../';

export const LIBRARY_CARD_COVER_DEFAULT_PROPS = {
  blur: 20,
  height: 190,
};
export const LIBRARY_CARD_COVER_PROP_TYPES = {
  name: PropTypes.string,
  height: PropTypes.number,
  cover: PropTypes.string,
  color: PropTypes.string,
  blur: PropTypes.number,
  variant: PropTypes.oneOf(LIBRARYCARD_VARIANTS),
  fileIcon: PropTypes.node,
};

const LibraryCardCover = ({ name, height, cover, color, blur, variant, fileIcon, ...props }) => {
  const { classes, cx } = LibraryCardCoverStyles(
    { color, height, blur },
    { name: 'LibraryCardCover' }
  );
  return (
    <Box className={classes.root}>
      <Box className={classes.blurryBox}>
        <Box className={classes.color}></Box>
        <Title order={5} className={classes.title}>
          {name}
        </Title>
      </Box>
      {cover ? (
        <ImageLoader src={cover} height={height} forceImage />
      ) : (
        <Box className={classes.fileIcon}>{fileIcon}</Box>
      )}
    </Box>
  );
};

LibraryCardCover.defaultProps = LIBRARY_CARD_COVER_DEFAULT_PROPS;
LibraryCardCover.propTypes = LIBRARY_CARD_COVER_PROP_TYPES;

export { LibraryCardCover };
