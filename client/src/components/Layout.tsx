import { useState } from 'react';
import { NavBar, NavValueType, navType } from '@/components/navbar';
import { checkNativeMatchMedia, useMediaQuery } from '../hooks/useMediaQuery';
import { useEffect } from 'react';

interface UseMediaQueryMedium {
  onChange?(prevMatch: boolean, newMatch: boolean): void;
}

const useMediaQueryMedium = (option?: UseMediaQueryMedium) =>
  useMediaQuery(
    checkNativeMatchMedia() ? '(min-width: 1060px)' : { 'min-width': '1060px' },
    { onChange: option?.onChange }
  );

const Layout = () => {
  const [selectedPage, setCurrentSelect] = useState<NavValueType>(navType.Home);

  useEffect(() => {}, []);
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
