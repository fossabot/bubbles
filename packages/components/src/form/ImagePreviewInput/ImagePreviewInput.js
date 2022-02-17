import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '../../layout';
import { Button } from '../../form';
import { ImageLoader } from '../../misc';
import { UndoIcon, CloudUploadIcon } from '@bubbles-ui/icons/outline/';
import { ImagePreviewInputStyles } from './ImagePreviewInput.styles';
import { isFunction } from 'lodash';

export const IMAGE_PREVIEW_INPUT_DEFAULT_PROPS = {
  labels: {
    changeImage: '',
    uploadButton: '',
  },
  previewURL: '',
};
export const IMAGE_PREVIEW_INPUT_PROP_TYPES = {
  labels: PropTypes.shape({
    uploadButton: PropTypes.string,
    changeImage: PropTypes.string,
  }),
  value: PropTypes.instanceOf(File),
  previewURL: PropTypes.string,
  previewStyle: PropTypes.object,
  control: PropTypes.element,
  onChange: PropTypes.func,
};

const ImagePreviewInput = ({
  labels,
  value,
  previewURL,
  previewStyle,
  control,
  onChange,
  ...props
}) => {
  const [imagePreview, setImagePreview] = useState(previewURL);
  const [imageValue, setImageValue] = useState(value);

  const resetImage = () => {
    isFunction(onChange) && onChange(null);
    setImagePreview(null);
    setImageValue(null);
  };

  const openFileBrowser = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      setImageValue(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      isFunction(onChange) && onChange(e.target.files[0]);
    };
    input.click();
  };

  const getControl = () => {
    if (!control)
      return (
        <Button variant="outline" leftIcon={<CloudUploadIcon />} onClick={openFileBrowser}>
          {labels.uploadButton}
        </Button>
      );

    return React.cloneElement(control, { onClick: openFileBrowser });
  };

  const { classes, cx } = ImagePreviewInputStyles({});
  return (
    <Box className={classes.root}>
      {!imagePreview ? (
        getControl()
      ) : (
        <Stack fullWidth>
          <ImageLoader
            src={imagePreview}
            height={132}
            width={224}
            skipFlex
            radius={8}
            style={{ ...previewStyle }}
          />
          <Box skipFlex>
            <Button variant="light" leftIcon={<UndoIcon />} onClick={resetImage}>
              {labels.changeImage}
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

ImagePreviewInput.defaultProps = IMAGE_PREVIEW_INPUT_DEFAULT_PROPS;
ImagePreviewInput.propTypes = IMAGE_PREVIEW_INPUT_PROP_TYPES;

export { ImagePreviewInput };
