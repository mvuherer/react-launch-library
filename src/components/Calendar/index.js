import React, { memo, useMemo } from 'react';
import { MoonLoader } from 'react-spinners';

import { WEEK_DAYS, MONTHS } from 'src/constants';

import {
  Agencies,
  CalendarShell,
  Days,
  DaysShell,
  Header,
  Navigation,
  Shell,
  WeekDay,
} from './components';
import { useCalendar } from './hooks';

const Calendar = () => {
  const {
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
      <Header>
        {monthLabel}, {selectedYear}
        {isLoading && <MoonLoader color="#fab78b" size="30px" />}
      </Header>
      <Agencies
        options={agencyOptions}
        placeholder="Filter by agencies..."
        onChange={handleAgencySelect}
      />
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
