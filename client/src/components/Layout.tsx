import { useState } from 'react';
import { NavBar, NavValueType, navType } from '@/components/navbar';
import { supportNativeMatchMedia, useMediaQuery } from '../hooks/useMediaQuery';

const useMediaQueryMedium = () =>
  useMediaQuery(
    supportNativeMatchMedia ? '(min-width: 600px)' : { 'min-width': '600px' }
  );

const Layout = () => {
  const [selectedPage, setCurrentSelect] = useState<NavValueType>(navType.Home);
  const match = useMediaQueryMedium();

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
