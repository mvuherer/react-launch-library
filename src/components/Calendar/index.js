import React, { memo, useMemo } from 'react';

import { WEEK_DAYS, MONTHS } from 'src/constants';

import { CalendarShell, DaysShell, Days, Header, Navigation, Shell, WeekDay } from './components';
import { useCalendar } from './hooks';

const Calendar = () => {
  const {
    currentMonthIndices,
    events,
    handleBackNavigationClick,
    handleDayClick,
    handleForwardNavigationClick,
    isLoading,
    nextMonthIndices,
    previousMonthIndices,
    selectedMonth,
    selectedYear,
  } = useCalendar();

  const monthLabel = useMemo(() => MONTHS[selectedMonth - 1], [selectedMonth]);

  const weekDayLabels = useMemo(
    () => WEEK_DAYS.map((label) => <WeekDay key={label}>{label.substring(0, 3)}</WeekDay>),
    [],
  );

  return (
    <Shell>
      <Header isLoading={isLoading}>
        {monthLabel}, {selectedYear}
      </Header>
      <CalendarShell>
        <Navigation onClick={handleBackNavigationClick}>{'<'}</Navigation>
        <DaysShell>
          {weekDayLabels}
          <Days indices={previousMonthIndices} />
          <Days
            events={events}
            handleDayClick={handleDayClick}
            indices={currentMonthIndices}
            isCurrent
          />
          <Days indices={nextMonthIndices} />
        </DaysShell>
        <Navigation onClick={handleForwardNavigationClick}>{'>'}</Navigation>
      </CalendarShell>
    </Shell>
  );
};

export default memo(Calendar);
