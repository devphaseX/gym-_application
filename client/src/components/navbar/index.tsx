import { useMemo, useRef } from 'react';
//@ts-ignore
import '@/styles/navbar.css';
import { imageAssest } from '@/assets';
import { Link, LinkProps } from './Link';
import { useMediaQueryMedium } from '../Layout';
import { useState } from 'react';
import { ActionButton } from '../shared/ActionButton';
import { captureUpdateFunctionState } from '@/util';
import { useStickyNavigationDetect } from '@/hooks/useScrollDetect';
import { useActionUpdate } from '@/hooks/useActionUpdate';

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
  const [menuToggled, setMenuToggle] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const stickNav = useStickyNavigationDetect({
    ref: navRef,
    assumeTop: window.screenY === 0,
  });

  const actionUpdate = useActionUpdate();

  const desktopSizedScreenDetected = useMediaQueryMedium({
    onChange: resetMenuToggleOnScreenChange,
  });

  async function resetMenuToggleOnScreenChange(
    prevMatch: boolean,
    currentMatch: boolean
  ) {
    let menuToggled = await captureUpdateFunctionState(setMenuToggle);

    if (menuToggled && prevMatch === false && prevMatch !== currentMatch) {
      setMenuToggle(false);
    }
  }

  const reactLinkNodes = useMemo(() => {
    return (
      <>
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
      </>
    );
  }, [currentSelected]);

  return (
    <nav
      className={`flex-positioned navigation ${
        stickNav !== true ? 'stickNav' : ''
      }`.trim()}
    >
      <div
        className="flex-positioned navContainer"
        ref={(element) => {
          if (!element) return;
          if (navRef.current) return;
          (navRef as { current: HTMLElement }).current = element;
          actionUpdate();
        }}
      >
        <div>
          <img src={brandLogoUrl} alt={brandLogoAltText} />
        </div>
        {desktopSizedScreenDetected ? (
          <div className="flex-positioned navContent">
            <ul className="flex-positioned navRoutes">{reactLinkNodes}</ul>
            <div className="flex-positioned call-to_action">
              <button>Sign in</button>
              <ActionButton setCurrentSelect={setCurrentSelect}>
                Become a member
              </ActionButton>
            </div>
          </div>
        ) : (
          <div className="btn-menu-box">
            <button
              className="btn-menu "
              onClick={() => setMenuToggle(true)}
            ></button>
          </div>
        )}
      </div>
      {!desktopSizedScreenDetected && menuToggled ? (
        <div className="mobile-aside-menu">
          <div className="mobile-aside-position">
            <div className="close-menu-box">
              <button
                className="close-menu"
                style={{ fontSize: '32px' }}
                onClick={() => setMenuToggle(false)}
              >
                X
              </button>
            </div>
            <div>
              <ul className="mobile-nav-links">{reactLinkNodes}</ul>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export { NavBar, navType };
export type { NavValueType, NavObjectType };
