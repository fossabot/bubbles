import { ActionButton } from '@bubbles-ui/components';
import { ButtonStyles } from './Button.styles';
import PropTypes from 'prop-types';

export const BUTTON_POSITIONS = ['start', 'center', 'end', 'default'];

export const BUTTON_DEFAULT_PROPS = {
  label: '',
  actived: false,
  position: 'default',
};

export const BUTTON_PROP_TYPES = {
  icon: PropTypes.node,
  label: PropTypes.string,
  actived: PropTypes.bool,
  position: PropTypes.oneOf(BUTTON_POSITIONS),
  onClick: PropTypes.func,
};

const Button = ({ icon, label, actived, position, onClick, classNames, children }) => {
  const { classes, cx } = ButtonStyles({ actived, position }, { classNames });
  return (
    <ActionButton size={'lg'} icon={icon} classNames={classes} tooltip={label} onClick={onClick}>
      {children}
    </ActionButton>
  );
};

Button.defaultProps = BUTTON_DEFAULT_PROPS;

Button.propTypes = BUTTON_PROP_TYPES;

export { Button };
