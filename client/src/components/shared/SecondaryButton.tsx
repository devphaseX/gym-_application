import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { NavValueType } from '../navbar';
import { createHashTag } from '../../util';

interface SecondaryButtonProps {
  onClick: () => void;
  selected: NavValueType;
  children: React.ReactNode;
}

const SecondaryButton = ({ onClick, selected }: SecondaryButtonProps) => (
  <AnchorLink
    href={createHashTag(selected)}
    onClick={onClick}
    className="secondary-button"
  >
    Learn more
  </AnchorLink>
);

export { SecondaryButton };
