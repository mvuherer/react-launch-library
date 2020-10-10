import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getWeekDay } from 'src/utils';
import { WEEK_DAYS, MONTHS } from 'src/constants';

export default () => {
  const view = useSelector((state) => state.launches.view);

  const launches = useMemo(() => view.data, [view]);

  const headerText = useMemo(() => {
    const { day, month, year } = view;
    if (!day) {
      return 'Select a Date';
    }

    const weekDay = getWeekDay(day, month, year);

    return WEEK_DAYS[weekDay ? weekDay - 1 : 6];
  }, [view]);

  const subheaderText = useMemo(() => {
    const { day, month, year } = view;
    if (!day) {
      return '';
    }

    return [day, MONTHS[month - 1].slice(0, 3), year].join(' ');
  }, [view]);

  return {
    launches,
    headerText,
    subheaderText,
  };
};
