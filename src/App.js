import React, { memo } from 'react';

import { Calendar, Countdown, Shell } from './components';

const App = () => {
  return (
    <Shell>
      <Countdown />
      <Calendar />
    </Shell>
  );
};

export default memo(App);
