import { useState } from 'react';
import { NavBar, NavValueType, navType } from '@/components/navbar';
import { supportNativeMatchMedia, useMediaQuery } from '../hooks/useMediaQuery';

const useMediaQueryMedium = () =>
  useMediaQuery(
    supportNativeMatchMedia ? '(min-width: 1060px)' : { 'min-width': '1060px' }
  );

const Layout = () => {
  const [selectedPage, setCurrentSelect] = useState<NavValueType>(navType.Home);

  return (
    <div>
      <NavBar
        currentSelected={selectedPage}
        setCurrentSelect={setCurrentSelect}
      />
    </div>
  );
};

export { Layout, useMediaQueryMedium };
