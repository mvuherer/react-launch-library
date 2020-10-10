import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DAYS_ON_CALENDAR, DECEMBER, JANUARY, MONDAY } from 'src/constants';
import { getMonthDays, getWeekDay, getArrayOfN } from 'src/utils';
import { launches } from 'src/store/actions';

export default () => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.launches.data);
  const isLoading = useSelector((state) => state.launches.isLoading);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(
      launches.getEvents({
        from: [year, month, 1].join('-'),
        to: [year, month, getMonthDays(month, year)].join('-'),
      }),
    );
  }, [dispatch, month, year]);

  const previousMonthIndices = useMemo(() => {
    const weekDay = getWeekDay(1, month, year);

    if (weekDay === MONDAY) {
      return [];
    }

    const overlappingDays = weekDay ? weekDay - 1 : 6;

    return getArrayOfN(getMonthDays(month - 1, year)).slice(-overlappingDays);
  }, [month, year]);

  const currentMonthIndices = useMemo(() => getArrayOfN(getMonthDays(month, year)), [month, year]);

  const nextMonthIndices = useMemo(
    () =>
      getArrayOfN(getMonthDays(month + 1, year)).slice(
        0,
        DAYS_ON_CALENDAR - (previousMonthIndices.length + currentMonthIndices.length),
      ),
    [currentMonthIndices.length, month, previousMonthIndices.length, year],
  );

  const handleDayClick = useCallback(
    (day) => {
      dispatch(
        launches.setViewDate({
          day,
          month,
          year,
        }),
      );
    },
    [dispatch, month, year],
  );

  const handleBackNavigationClick = useCallback(() => {
    let nextMonth = month - 1;
    let nextYear = year;

    if (month === JANUARY) {
      nextYear = year - 1;

      nextMonth = DECEMBER;
    }

    setMonth(nextMonth);
    setYear(nextYear);
  }, [month, year]);

  const handleForwardNavigationClick = useCallback(() => {
    let nextMonth = month + 1;
    let nextYear = year;

    if (month === DECEMBER) {
      nextYear = year + 1;

      nextMonth = JANUARY;
    }

    setMonth(nextMonth);
    setYear(nextYear);
  }, [month, year]);

  return {
    currentMonthIndices,
    events,
    handleBackNavigationClick,
    handleDayClick,
    handleForwardNavigationClick,
    isLoading,
    nextMonthIndices,
    previousMonthIndices,
    selectedMonth: month,
    selectedYear: year,
  };
};
