import React, { memo } from 'react';

import { Header, Launch, Navigation, NavigationShell, Shell, Subheader } from './components';
import { useCountdown } from './hooks';

const Countdown = () => {
  const {
    handleBackNavigationClick,
    handleForwardNavigationClick,
    headerText,
    launches,
    selectedIndex,
    subheaderText,
  } = useCountdown();

  return (
    <Shell>
      <Header>{headerText}</Header>
      <Subheader>{subheaderText}</Subheader>
      {launches.length ? <Launch data={launches[selectedIndex]} /> : null}
      {launches.length > 1 && (
        <NavigationShell>
          <Navigation onClick={handleBackNavigationClick}>{'<'}</Navigation>
          <Navigation onClick={handleForwardNavigationClick}>{'>'}</Navigation>
        </NavigationShell>
      )}
    </Shell>
  );
};

export default memo(Countdown);
