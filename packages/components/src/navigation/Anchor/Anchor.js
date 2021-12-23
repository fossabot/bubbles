import React from 'react';
import PropTypes from 'prop-types';
import { Text, TEXT_ROLES } from '../../typography';
import { AnchorStyles } from './Anchor.styles';

export const ANCHOR_ROLES = TEXT_ROLES;

const Anchor = ({ as, role, ...props }) => {
  const { classes, cx } = AnchorStyles({});

  return <Text {...props} as={as} role={role} className={classes.root} />;
};

Anchor.defaultProps = {
  as: 'a',
  role: 'productive',
};

Anchor.propTypes = {
  as: PropTypes.any,
  role: PropTypes.oneOf(ANCHOR_ROLES),
};

export { Anchor };
