import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getWeekDay } from 'src/utils';
import { WEEK_DAYS, MONTHS } from 'src/constants';

export default () => {
  const view = useSelector((state) => state.launches.view);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const launches = useMemo(() => view.data, [view]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [view]);

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

  const handleBackNavigationClick = useCallback(() => {
    let nextSelectedIndex = selectedIndex - 1;

    if (nextSelectedIndex < 0) {
      nextSelectedIndex = launches.length - 1;
    }

    setSelectedIndex(nextSelectedIndex);
  }, [launches, selectedIndex]);

  const handleForwardNavigationClick = useCallback(() => {
    let nextSelectedIndex = selectedIndex + 1;

    if (nextSelectedIndex >= launches.length) {
      nextSelectedIndex = 0;
    }

    setSelectedIndex(nextSelectedIndex);
  }, [launches, selectedIndex]);

  return {
    handleBackNavigationClick,
    handleForwardNavigationClick,
    headerText,
    launches,
    selectedIndex,
    subheaderText,
  };
};
