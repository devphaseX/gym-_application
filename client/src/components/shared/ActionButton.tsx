//@ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll';
import React from 'react';
import { NavValueType, navType } from '../navbar';

interface ActionButtonProps {
  setCurrentSelect: (value: NavValueType) => void;
  extra?: any;
  children: React.ReactNode;
}

const ActionButton = ({
  extra,
  setCurrentSelect,
  children,
}: ActionButtonProps) => (
  <AnchorLink
    className="btn-primary action--btn"
    onClick={() => setCurrentSelect(navType.ContactUs)}
    href={`#${navType.ContactUs.toLowerCase()}`}
    {...extra}
  >
    {children}
  </AnchorLink>
);

export { ActionButton };
