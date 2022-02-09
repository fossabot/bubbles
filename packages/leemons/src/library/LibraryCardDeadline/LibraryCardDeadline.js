import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ImageLoader } from '@bubbles-ui/components';
import { LibraryCardDeadlineStyles } from './LibraryCardDeadline.styles';
import { useEffect } from 'react';
import { capitalize } from 'lodash';

export const LIBRARY_CARD_DEADLINE_DEFAULT_PROPS = {
  labels: {
    title: 'Coming soon',
    new: 'New',
    deadline: '',
  },
  locale: 'en',
};
export const LIBRARY_CARD_DEADLINE_PROP_TYPES = {
  labels: PropTypes.shape({
    title: PropTypes.string,
    new: PropTypes.string,
    deadline: PropTypes.string,
  }),
  icon: PropTypes.oneOfType([
    PropTypes.element,
    (props, propName, componentName) => validateURL(props, propName, componentName),
  ]),
  locale: PropTypes.string,
  deadline: PropTypes.instanceOf(Date),
};

const validateURL = (props, propName, componentName) => {
  let url;
  const errorString = `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`;
  try {
    url = new URL(props.icon);
  } catch (error) {
    return new Error(errorString);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return new Error(errorString);
};

const TODAY = new Date().getDate();

const LibraryCardDeadline = ({ labels, icon, isNew, locale, deadline, ...props }) => {
  const [title, setTitle] = useState(labels.title);
  const [hovered, setHovered] = useState(false);

  const formattedDate = `${labels.deadline + ' '}${deadline.toLocaleDateString(
    locale
  )} - ${deadline.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`;

  useEffect(() => {
    if (!deadline) return;

    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    let deltaDays = (deadline.getTime() - Date.now()) / (1000 * 3600 * 24);

    if (deltaDays < 1) {
      if (deadline.getDate() === TODAY) {
        deltaDays = 0;
      } else if (deadline.getDate() === TODAY - 1) {
        deltaDays = -1;
      } else if (deadline.getDate() === TODAY + 1) {
        deltaDays = 1;
      }
    }

    deltaDays = Math.ceil(deltaDays);

    const result = formatter.format(deltaDays, 'day');

    setTitle(capitalize(result));
  }, [deadline, locale]);

  const { classes, cx } = LibraryCardDeadlineStyles({ isNew, hovered });
  return (
    <Box
      className={classes.root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && (
        <Box className={classes.icon}>
          {typeof icon === 'string' ? <ImageLoader src={icon} height={16} width={16} /> : icon}
        </Box>
      )}
      <Box>
        <Box className={classes.title}>{isNew ? labels.new : title}</Box>
        <Box className={classes.deadline}>{deadline && formattedDate}</Box>
      </Box>
    </Box>
  );
};

LibraryCardDeadline.defaultProps = LIBRARY_CARD_DEADLINE_DEFAULT_PROPS;
LibraryCardDeadline.propTypes = LIBRARY_CARD_DEADLINE_PROP_TYPES;

export { LibraryCardDeadline };
