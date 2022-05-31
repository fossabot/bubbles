import PropTypes from 'prop-types';

export const ACTIVITY_CONTAINER_DEFAULT_PROPS = {};
export const ACTIVITY_CONTAINER_PROP_TYPES = {
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
  }),
  deadline: PropTypes.shape({
    label: PropTypes.string,
    date: PropTypes.string,
  }),
  children: PropTypes.node,
};
