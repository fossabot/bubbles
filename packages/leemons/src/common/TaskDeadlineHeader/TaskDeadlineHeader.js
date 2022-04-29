import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  ImageLoader,
  Button,
  Switch,
  DatePicker,
  TimeInput,
  COLORS,
} from '@bubbles-ui/components';
import { TaskDeadlineHeaderStyles } from './TaskDeadlineHeader.styles';
import {
  TASK_DEADLINE_HEADER_DEFAULT_PROPS,
  TASK_DEADLINE_HEADER_PROP_TYPES,
} from './TaskDeadlineHeader.constants';
import { ExpandDiagonalIcon } from '@bubbles-ui/icons/outline';
import { isFunction } from 'lodash';

const TaskDeadlineHeader = ({
  labels,
  title,
  subtitle,
  icon,
  color,
  deadline,
  locale,
  open,
  onDeadlineChange,
  onCloseTask,
  ...props
}) => {
  const [deadlineValue, setDeadlineValue] = useState(new Date(deadline));
  const [deadlineExpanded, setDeadlineExpanded] = useState(false);
  let tempDeadlineValue = new Date(deadlineValue);

  const saveDeadline = () => {
    onDeadlineChangeHandler(tempDeadlineValue);
    setDeadlineExpanded(false);
  };

  const cancelDeadline = () => {
    tempDeadlineValue = new Date(deadlineValue);
    setDeadlineExpanded(false);
  };

  const onDeadlineChangeHandler = (date) => {
    if (!date) date = new Date(deadline);
    setDeadlineValue(date);
    isFunction(onDeadlineChange) && onDeadlineChange(date);
  };

  const onCloseTaskHandler = (value) => {
    isFunction(onCloseTask) && onCloseTask(value);
  };

  const addDays = (days) => {
    const newDate = new Date(deadlineValue);
    newDate.setDate(newDate.getDate() + days);
    onDeadlineChangeHandler(newDate);
  };

  useEffect(() => {
    if (deadlineValue !== new Date(deadline)) {
      setDeadlineValue(new Date(deadline));
    }
  }, [deadline]);

  const { classes, cx } = TaskDeadlineHeaderStyles(
    { color, deadlineExpanded },
    { name: 'TaskDeadlineHeader' }
  );
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Text className={classes.title} color="primary">
          {title}
        </Text>
        <Box className={classes.subtitleWrapper}>
          <Box className={classes.icon}>
            <ImageLoader src={icon} height={12} width={12} />
          </Box>
          <Text className={classes.subtitle} color="primary">
            {subtitle}
          </Text>
        </Box>
      </Box>
      <Box className={classes.deadlineWrapper}>
        <Box className={classes.deadline}>
          {!deadlineExpanded ? (
            <>
              <Text className={classes.textColor}>{labels.deadline}</Text>
              <Text className={classes.deadlineDate}>
                {deadlineValue?.toLocaleDateString(locale)}
              </Text>
              <ExpandDiagonalIcon
                className={classes.deadlineIcon}
                height={16}
                width={16}
                onClick={() => setDeadlineExpanded(true)}
              />
            </>
          ) : (
            <>
              <DatePicker
                size="xs"
                locale={locale}
                withTime
                contentClassName={classes.datePicker}
                value={tempDeadlineValue}
                onChange={(date) => (tempDeadlineValue = date)}
              />
              <Button size="xs" compact onClick={saveDeadline}>
                {labels.save}
              </Button>
              <Button size="xs" compact onClick={cancelDeadline}>
                {labels.cancel}
              </Button>
            </>
          )}
        </Box>
        <Box className={classes.deadlineExtraTime}>
          <Text className={classes.textColor}>{labels.deadlineExtraTime}</Text>
          <Button variant="filled" color="tertiary" size="xs" compact onClick={() => addDays(1)}>
            +1d
          </Button>
          <Button variant="filled" color="tertiary" size="xs" compact onClick={() => addDays(7)}>
            +7d
          </Button>
        </Box>
        <Box className={classes.deadlineSwitch}>
          <Switch size="md" label={labels.closeTask} onChange={onCloseTaskHandler} />
        </Box>
      </Box>
    </Box>
  );
};

TaskDeadlineHeader.defaultProps = TASK_DEADLINE_HEADER_DEFAULT_PROPS;
TaskDeadlineHeader.propTypes = TASK_DEADLINE_HEADER_PROP_TYPES;

export { TaskDeadlineHeader };
