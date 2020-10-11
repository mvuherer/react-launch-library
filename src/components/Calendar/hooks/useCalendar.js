import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DAYS_ON_CALENDAR, DECEMBER, JANUARY, MONDAY } from 'src/constants';
import { getMonthDays, getWeekDay, getArrayOfN } from 'src/utils';
import { agencies, launches } from 'src/store/actions';

export default () => {
  const dispatch = useDispatch();

  const agencyOptions = useSelector((state) => [
    { value: null, label: 'All' },
    ...state.agencies.data.map(({ id, name }) => ({ value: id, label: name })),
  ]);
  const events = useSelector((state) =>
    state.launches.data.filter((launch) =>
      [launch.agency?.id, null].includes(state.agencies.selectedId),
    ),
  );
  const isLoading = useSelector((state) => state.launches.isLoading);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const getAgencies = useCallback(
    (page = 0) => {
      dispatch(agencies.getAgencies(page)).then(
        ({
          result: {
            data: { next },
          },
        }) => {
          if (next) {
            getAgencies(page + 1);
          }
        },
      );
    },
    [dispatch],
  );

  useEffect(() => {
    getAgencies(0);
  }, [getAgencies]);

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

  const handleAgencySelect = useCallback(
    ({ value }) => {
      dispatch(agencies.setSelected(value));
    },
    [dispatch],
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
    agencyOptions,
    currentMonthIndices,
    events,
    handleAgencySelect,
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
