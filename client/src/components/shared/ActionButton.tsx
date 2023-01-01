import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavValueType, navType } from '../navbar';
import { createHashTag } from '@/util';

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
    href={createHashTag(navType.ContactUs)}
    {...extra}
  >
    {children}
  </AnchorLink>
);

export { ActionButton };
