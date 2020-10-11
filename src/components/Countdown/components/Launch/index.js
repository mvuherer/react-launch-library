import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { getTimerString } from 'src/utils';

import { Name, Timer } from './components';

const Launch = ({ data }) => {
  const interval = useRef(null);

  const [timer, setTimer] = useState('');

  const handleCountDown = useCallback(() => {
    const ETA = new Date() - new Date(data.date);

    setTimer(getTimerString(ETA));
  }, [data.date]);

  useEffect(() => {
    if (!interval.current) {
      handleCountDown();

      interval.current = setInterval(() => {
        handleCountDown();
      }, 1000);
    }

    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [handleCountDown]);

  return (
    <>
      <Name>{data.name}</Name>
      <Name>{data.agency.name}</Name>
      <Timer>{timer}</Timer>
    </>
  );
};

Launch.propTypes = {
  data: PropTypes.shape({
    agency: PropTypes.shape({ name: PropTypes.string }),
    date: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default memo(Launch);
