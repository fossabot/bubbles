import React from 'react';
import { Box } from '@bubbles-ui/components';
import isFunction from 'lodash/isFunction';
import { ColorPickerStyles } from './ColorPicker.styles';

const ColorPicker = ({ inputValue, onChange }) => {
  const getSwatchBorders = () => {
    const commonStyles = { position: 'absolute', height: 8, width: 8 };
    return (
      <>
        <Box
          style={{
            ...commonStyles,
            top: 0,
            left: 0,
            borderTop: '3px solid black',
            borderLeft: '3px solid black',
            borderTopLeftRadius: 4,
          }}
        />
        <Box
          style={{
            ...commonStyles,
            top: 0,
            right: 0,
            borderTop: '3px solid black',
            borderRight: '3px solid black',
            borderTopRightRadius: 4,
          }}
        />
        <Box
          style={{
            ...commonStyles,
            bottom: 0,
            left: 0,
            borderBottom: '3px solid black',
            borderLeft: '3px solid black',
            borderBottomLeftRadius: 4,
          }}
        />
        <Box
          style={{
            ...commonStyles,
            bottom: 0,
            right: 0,
            borderBottom: '3px solid black',
            borderRight: '3px solid black',
            borderBottomRightRadius: 4,
          }}
        />
      </>
    );
  };

  const onChangeHandler = (colorValue) => {
    isFunction(onChange) && onChange(colorValue);
  };

  const { classes, cx } = ColorPickerStyles({});

  return (
    <Box className={classes.root}>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#D9DCF9' }}
        onClick={() => onChangeHandler('#D9DCF9')}
      >
        {inputValue === '#D9DCF9' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#DEE9F9' }}
        onClick={() => onChangeHandler('#DEE9F9')}
      >
        {inputValue === '#DEE9F9' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#DAF1F9' }}
        onClick={() => onChangeHandler('#DAF1F9')}
      >
        {inputValue === '#DAF1F9' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#E2F9F3' }}
        onClick={() => onChangeHandler('#E2F9F3')}
      >
        {inputValue === '#E2F9F3' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#F5F9DE' }}
        onClick={() => onChangeHandler('#F5F9DE')}
      >
        {inputValue === '#F5F9DE' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#F5F0DC' }}
        onClick={() => onChangeHandler('#F5F0DC')}
      >
        {inputValue === '#F5F0DC' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#F4E2D9' }}
        onClick={() => onChangeHandler('#F4E2D9')}
      >
        {inputValue === '#F4E2D9' && getSwatchBorders()}
      </Box>
      <Box
        className={classes.swatch}
        style={{ backgroundColor: '#F3DFE3' }}
        onClick={() => onChangeHandler('#F3DFE3')}
      >
        {inputValue === '#F3DFE3' && getSwatchBorders()}
      </Box>
    </Box>
  );
};

export { ColorPicker };
