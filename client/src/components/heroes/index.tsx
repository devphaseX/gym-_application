import React from 'react';
import { imageAssest } from '../../assets';
import { ActionButton } from '../shared/ActionButton';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useMediaQueryMedium } from '../Layout';
import { SetCurrentPageFn } from '../navbar/Link';
import { navType } from '../navbar';
import { createHashTag } from '@/util';
import '../../styles/heroes.css';
const { layout, sponsor } = imageAssest;

const {
  homePageText: [homePageText, { url: homePageTextUrl }],
  homePageGraphic: [homePageGraphic, { url: homePageGraphicUrl }],
} = layout;

const {
  forbes: [forbes, { url: forbesUrl }],
  fortune: [fortune, { url: fortuneUrl }],
  redbull: [redbull, { url: redbullUrl }],
} = sponsor;

interface HeroProps {
  setSelectPage: SetCurrentPageFn;
}

const Heroes = ({ setSelectPage }: HeroProps) => {
  const screenAboveMedium = useMediaQueryMedium();
  return (
    <section>
      {/* Heroes */}
      <div>
        {/* HERO INFO */}
        <div>
          {/* Info */}
          <div>
            <div>
              <div>
                <img alt={homePageText} src={homePageTextUrl} />
              </div>
            </div>
            <div>
              <p>
                Unrivaled Gym. Unparalleled Training Fitness Classes. World
                Class Studios to get the Body Shapes That you Dream of.. Get
                Your Dream Body Now.
              </p>
            </div>
          </div>
          {/* Action */}
          <div className="brand-action">
            <ActionButton setCurrentSelect={setSelectPage}>
              Join now
            </ActionButton>
            <AnchorLink
              href={createHashTag(navType.ContactUs)}
              onClick={() => setSelectPage(navType.ContactUs)}
            >
              Learn more
            </AnchorLink>
          </div>
        </div>
        {/* HERO IMAGE */}
        <div>
          <img alt={homePageGraphic} src={homePageGraphicUrl} />
        </div>
      </div>
      {/* Sponsor */}
      {screenAboveMedium ? (
        <div>
          <div>
            <div>
              <img alt={redbull} src={redbullUrl} />
            </div>
            <div>
              <img alt={fortune} src={fortuneUrl} />
            </div>
            <div>
              <img alt={forbes} src={forbesUrl} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export { Heroes };
