//@ts-ignore
import '@/styles/navbar.css';
import { imageAssest } from '@/assets';
import { Link, LinkProps } from './Link';
import { useMediaQueryMedium } from '../Layout';
import { useState } from 'react';
import { ActionButton } from '../shared/ActionButton';

const [brandLogoAltText, { url: brandLogoUrl }] = imageAssest.brand.brand_logo;

const navType = {
  Home: 'home',
  Benefit: 'benefit',
  OurClasess: 'our classes',
  ContactUs: 'contact us',
} as const;

type NavObjectType = typeof navType;
type NavValueType = NavObjectType[keyof NavObjectType];

interface NavBarProps extends Omit<LinkProps, 'page'> {}

const NavBar = ({ currentSelected, setCurrentSelect }: NavBarProps) => {
  const desktopSizedScreenDetected = useMediaQueryMedium();
  const [menuToggled, setMenuToggle] = useState(false);

  return (
    <nav className="flex-positioned navigation">
      <div className="flex-positioned navContainer">
        <div>
          <img src={brandLogoUrl} alt={brandLogoAltText} />
        </div>
        {desktopSizedScreenDetected ? (
          <div className="flex-positioned navContent">
            <ul className="flex-positioned navRoutes">
              <Link
                page={navType.Home}
                currentSelected={currentSelected}
                setCurrentSelect={setCurrentSelect}
              />

              <Link
                page={navType.Benefit}
                currentSelected={currentSelected}
                setCurrentSelect={setCurrentSelect}
              />

              <Link
                page={navType.OurClasess}
                currentSelected={currentSelected}
                setCurrentSelect={setCurrentSelect}
              />

              <Link
                page={navType.ContactUs}
                currentSelected={currentSelected}
                setCurrentSelect={setCurrentSelect}
              />
            </ul>
            <div className="flex-positioned call-to_action">
              <button>Sign in</button>
              <ActionButton setCurrentSelect={setCurrentSelect}>
                Become a member
              </ActionButton>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="btn-menu"
              onClick={() => setMenuToggle(true)}
            ></button>
          </div>
        )}
      </div>
      {!desktopSizedScreenDetected && menuToggled ? (
        <div>
          <div>
            <button
              style={{ fontSize: '32px' }}
              onClick={() => setMenuToggle(false)}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export { NavBar, navType };
export type { NavValueType, NavObjectType };
