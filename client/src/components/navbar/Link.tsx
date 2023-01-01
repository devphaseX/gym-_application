import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavValueType } from '.';
import { createHashTag } from '@/util';

interface LinkProps {
  page: NavValueType;
  currentSelected: NavValueType;
  activeHoverLink: NavValueType | null;
  disableActiveOnHover: boolean;
  setCurrentSelect: (select: NavValueType) => void;
  setLinkAsHover: (select: NavValueType | null) => void;
}

const Link = ({
  page,
  disableActiveOnHover,
  currentSelected,
  setCurrentSelect,
  setLinkAsHover,
  activeHoverLink,
}: LinkProps) => {
  const parseHash = createHashTag(page);
  return (
    <AnchorLink
      href={parseHash}
      className={
        (!disableActiveOnHover &&
          activeHoverLink === null &&
          currentSelected === page) ||
        activeHoverLink === page
          ? 'active-nav'
          : ''
      }
      onClick={() => setCurrentSelect(page)}
      onMouseEnter={() => setLinkAsHover(page)}
      onMouseLeave={() => setLinkAsHover(null)}
    >
      {page}
    </AnchorLink>
  );
};

export { Link };
export type { LinkProps };
