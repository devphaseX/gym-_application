//@ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavValueType } from '.';

interface LinkProps {
  page: NavValueType;
  currentSelected: NavValueType;
  setCurrentSelect: (select: NavValueType) => void;
}

const Link = ({ page, currentSelected, setCurrentSelect }: LinkProps) => {
  const parseHash = page.replace(/^#|\s+/g, '').toLowerCase() as NavValueType;
  return (
    <AnchorLink
      href={parseHash}
      className={
        currentSelected.toLowerCase() === parseHash ? 'active-nav' : ''
      }
      onClick={setCurrentSelect}
    >
      {page}
    </AnchorLink>
  );
};

export { Link };
export type { LinkProps };
