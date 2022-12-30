import '@/styles/navbar.css';
import { imageAssest } from '@/assets';
import { Link, LinkProps } from './Link';

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
  return (
    <nav className="flex-positioned navigation">
      <div className="flex-positioned navContainer">
        <div>
          <img src={brandLogoUrl} alt={brandLogoAltText} />
        </div>
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
            <button className="btn-primary register--btn">
              Become a member
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavBar, navType };
export type { NavValueType, NavObjectType };
