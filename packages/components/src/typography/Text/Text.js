import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text as MantineText } from '@mantine/core';
import { TextStyles } from './Text.styles';

export const TEXT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
export const TEXT_COLORS = [
  'interactive',
  'primary',
  'secondary',
  'tertiary',
  'quartiary',
  'soft',
  'success',
  'warning',
  'error',
];
export const TEXT_TRANSFORMS = ['capitalize', 'uppercase', 'lowercase', 'none'];
export const TEXT_ROLES = ['productive', 'expressive', 'inherit'];
export const TEXT_DEFAULT_PROPS = {
  size: 'sm',
  as: 'span',
  role: 'expressive',
  color: 'secondary',
  transform: 'none',
  strong: false,
  stronger: false,
  truncated: false,
  highlighted: false,
};

export const Text = forwardRef(
  (
    {
      children,
      as,
      size: sizeProp,
      transform: transformProp,
      color: colorProp,
      className,
      role,
      strong,
      stronger,
      truncated,
      styles,
      ariaRole,
      highlighted,
      ...props
    },
    ref
  ) => {
    const transform = TEXT_TRANSFORMS.includes(transformProp)
      ? transformProp
      : TEXT_DEFAULT_PROPS.transform;
    const size = TEXT_SIZES.includes(sizeProp) ? sizeProp : TEXT_DEFAULT_PROPS.size;
    const color = TEXT_COLORS.includes(colorProp) ? colorProp : TEXT_DEFAULT_PROPS.color;

    // ····················································································
    // STYLES

    const { classes, cx } = TextStyles({
      role,
      transform,
      color,
      strong,
      stronger,
      size,
      truncated,
      styles,
      highlighted,
    });

    return (
      <MantineText
        {...props}
        ref={ref}
        component={as}
        size={size}
        className={cx(classes.root, className)}
        role={ariaRole}
      >
        {children}
      </MantineText>
    );
  }
);

Text.defaultProps = TEXT_DEFAULT_PROPS;

Text.propTypes = {
  size: PropTypes.oneOf(TEXT_SIZES),
  transform: PropTypes.oneOf(TEXT_TRANSFORMS),
  role: PropTypes.oneOf(TEXT_ROLES),
  color: PropTypes.oneOf(TEXT_COLORS),
  strong: PropTypes.bool,
  stronger: PropTypes.bool,
  truncated: PropTypes.bool,
  styles: PropTypes.object,
  highlighted: PropTypes.bool,
};
