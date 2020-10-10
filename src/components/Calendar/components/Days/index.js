import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { Day } from './components';

const Days = ({ events, handleDayClick, indices, isCurrent }) => {
  return indices.map((key) => {
    const date = key + 1;

    const hasEvent = events.find((event) => parseInt(event.date.split('-')[2], 10) === date);

    return (
      <Day key={key} isCurrent={isCurrent} onClick={() => handleDayClick(date)} hasEvent={hasEvent}>
        {date.toString().padStart(2, '0')}
      </Day>
    );
  });
};

Days.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
    }),
  ),
  handleDayClick: PropTypes.func,
  indices: PropTypes.arrayOf(PropTypes.number).isRequired,
  isCurrent: PropTypes.bool,
};

Days.defaultProps = {
  events: [],
  handleDayClick: () => {},
  isCurrent: false,
};

export default memo(Days);
