import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'react-big-calendar/lib/utils/constants';

import TimeGrid from '../TimeGrid/TimeGrid';

class WeekView extends React.Component {
  componentDidMount() {
    const days = this.props.localizer.visibleDays(this.props.date, this.props.localizer);
    days[days.length - 1].setHours(23, 59, 59);
    this.props.onRangeChange({
      start: days[0],
      end: days[days.length - 1],
    });
  }

  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(new Date(), 'day'),
      max = localizer.endOf(new Date(), 'day'),
      scrollToTime = localizer.startOf(new Date(), 'day'),
      ...props
    } = this.props;
    let range = WeekView.range(date, this.props);

    const { showWeekends } = this.props.components;

    if (!showWeekends) {
      // week.pop();
      // week.shift();
      range.pop();
      range.pop();
    }

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
      />
    );
  }
}

WeekView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

WeekView.defaultProps = TimeGrid.defaultProps;

WeekView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');

    case navigate.NEXT:
      return localizer.add(date, 1, 'week');

    default:
      return date;
  }
};

WeekView.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek();
  let start = localizer.startOf(date, 'week', firstOfWeek);
  let end = localizer.endOf(date, 'week', firstOfWeek);

  return localizer.range(start, end);
};

WeekView.title = (date, { localizer }) => {
  let [start, ...rest] = WeekView.range(date, { localizer });
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
};

export { WeekView };
