import React, { memo } from 'react';

import { Header, Launch, Shell, Subheader } from './components';
import { useCountdown } from './hooks';

const Countdown = () => {
  const { launches, headerText, subheaderText } = useCountdown();
  return (
    <Shell>
      <Header>{headerText}</Header>
      <Subheader>{subheaderText}</Subheader>
      {launches[0] && <Launch data={launches[0]} />}
    </Shell>
  );
};

export default memo(Countdown);
