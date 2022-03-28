import PropTypes from 'prop-types';

export const TEXT_EDITOR_INPUT_DEFAULT_PROPS = {
  placeholder: '',
  toolbars: {
    style: true,
    align: true,
    list: true,
    history: true,
    heading: true,
    color: true,
    formulation: false,
  },
  label: '',
  description: '',
  help: '',
  required: false,
  error: '',
};
export const TEXT_EDITOR_INPUT_PROP_TYPES = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  help: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  children: PropTypes.element,
  toolbars: PropTypes.shape({
    color: PropTypes.bool,
    style: PropTypes.bool,
    heading: PropTypes.bool,
    align: PropTypes.bool,
    list: PropTypes.bool,
    formulation: PropTypes.bool,
  }),
};
