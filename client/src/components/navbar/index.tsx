import { useMemo, useRef, useEffect } from 'react';
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

interface NavBarProps
  extends Omit<
    LinkProps,
    'page' | 'activeHoverLink' | 'setLinkAsHover' | 'disableActiveOnHover'
  > {}

const NavBar = ({ currentSelected, setCurrentSelect }: NavBarProps) => {
  const [menuToggled, setMenuToggle] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  //Encapulate the scrolling logic to determine whether to stick a navigation to the viewports on scroll
  const stickNav = useStickyNavigationDetect({
    ref: navRef,
  });

  const [currentHoverNav, setHoverNav] = useState<NavValueType | null>(null);
  const [disableLinkFlash, setDisableLinkFlash] = useState(false);

  const actionUpdate = useActionUpdate();

  const screenAboveMedium = useMediaQueryMedium({
    onChange: resetToggleOnDesktopTran,
  });

  //This function reset the menu sidebar for mobile screen on transition to Desktop mode
  async function resetToggleOnDesktopTran(
    prevMatch: boolean,
    currentMatch: boolean
  ) {
    let menuToggled = await captureUpdateFunctionState(setMenuToggle);

    if (menuToggled && prevMatch === false && prevMatch !== currentMatch) {
      setMenuToggle(false);
    }
  }

  useEffect(() => {
    const menuTriggedOnMobile = !screenAboveMedium && menuToggled;
    //disable scrolling on sidebar menu and mobile mode detection
    document.body.classList.toggle('disable-scroll-bar', menuTriggedOnMobile);
  }, [menuToggled]);
  const reactLinkNodes = useMemo(() => {
    return (
      <>
        <li>
          <Link
            page={navType.Home}
            disableActiveOnHover={disableLinkFlash}
            currentSelected={currentSelected}
            setCurrentSelect={setCurrentSelect}
            setLinkAsHover={setHoverNav}
            activeHoverLink={currentHoverNav}
          />
        </li>
        <li>
          <Link
            page={navType.Benefit}
            disableActiveOnHover={disableLinkFlash}
            currentSelected={currentSelected}
            setCurrentSelect={setCurrentSelect}
            setLinkAsHover={setHoverNav}
            activeHoverLink={currentHoverNav}
          />
        </li>

        <li>
          <Link
            page={navType.OurClasess}
            disableActiveOnHover={disableLinkFlash}
            currentSelected={currentSelected}
            setCurrentSelect={setCurrentSelect}
            setLinkAsHover={setHoverNav}
            activeHoverLink={currentHoverNav}
          />
        </li>
        <li>
          <Link
            page={navType.ContactUs}
            disableActiveOnHover={disableLinkFlash}
            currentSelected={currentSelected}
            setCurrentSelect={setCurrentSelect}
            setLinkAsHover={setHoverNav}
            activeHoverLink={currentHoverNav}
          />
        </li>
      </>
    );
  }, [currentSelected, currentHoverNav, disableLinkFlash]);
  return (
    <nav
      className={`flex-positioned navigation ${
        stickNav ? 'stickNav' : ''
      }`.trim()}
    >
      <div
        className="flex-positioned navContainer"
        ref={(element) => {
          if (!element) return;
          if (navRef.current !== null && navRef.current === element) {
            return;
          }
          (navRef as { current: HTMLElement }).current = element;
          actionUpdate();
        }}
      >
        <div>
          <img src={brandLogoUrl} alt={brandLogoAltText} />
        </div>
        {screenAboveMedium ? (
          <div
            className="flex-positioned navContent"
            onMouseEnter={() => setDisableLinkFlash(true)}
            onMouseLeave={() => setDisableLinkFlash(false)}
          >
            <ul className="flex-positioned navRoutes larger-screen">
              {reactLinkNodes}
            </ul>
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
      {!screenAboveMedium && menuToggled ? (
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
            <div className="mobile-nav-list-box">
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
