import { useState } from 'react';
import { NavBar, NavValueType, navType } from '@/components/navbar';
import { useQueryMedia } from '../hooks/useMediaQuery/useMediaQuery';
import { checkNativeMatchMedia } from '../hooks/useMediaQuery/core/util';
import { useEffect } from 'react';

interface UseMediaQueryMedium {
  onChange?(prevMatch: boolean, newMatch: boolean): void;
}

const useMediaQueryMedium = (option?: UseMediaQueryMedium) =>
  useQueryMedia(
    checkNativeMatchMedia() ? '(min-width: 1160px)' : { 'min-width': '1060px' },
    { onChange: option?.onChange }
  );

interface LayoutProps {
  children?: (props: {
    selectedPage: NavValueType;
    setSelectPage: (value: NavValueType) => void;
  }) => React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const [selectedPage, setCurrentSelect] = useState<NavValueType>(navType.Home);

  useEffect(() => {}, []);
  return (
    <div>
      <NavBar
        currentSelected={selectedPage}
        setCurrentSelect={setCurrentSelect}
      />
      {children?.({ selectedPage, setSelectPage: setCurrentSelect })}
    </div>
  );
};

export { Layout, useMediaQueryMedium };
