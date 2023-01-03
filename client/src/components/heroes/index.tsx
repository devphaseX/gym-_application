import { motion } from 'framer-motion';
import { imageAssest } from '../../assets';
import { ActionButton } from '../shared/ActionButton';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useMediaQueryMedium } from '../Layout';
import { SetCurrentPageFn } from '../navbar/Link';
import { navType } from '../navbar';
import { createHashTag } from '@/util';
import '../../styles/heroes.css';
import { useEffect } from 'react';
import { useRef } from 'react';
const { layout, sponsor } = imageAssest;
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useActionUpdate } from '../../hooks/useActionUpdate';

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
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const { height } = useResizeObserver(navRef);
  const actionUpdate = useActionUpdate();

  useEffect(() => {
    navRef.current = document.getElementById('main-nav');
    actionUpdate();
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    heroRef.current.style.paddingTop = `${height}px`;
  }, [height]);

  return (
    <section className="hero">
      {/* Heroes */}
      <motion.div
        onViewportEnter={() => setSelectPage(navType.Home)}
        className="hero-content"
        ref={heroRef}
      >
        {/* HERO INFO */}
        <div className="info-with-action">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            className="hero-info"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <div className="hero-header">
              <div className="hero-page-text">
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
          </motion.div>
          {/* Action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            className="brand-action"
          >
            <ActionButton setCurrentSelect={setSelectPage}>
              Join now
            </ActionButton>
            <AnchorLink
              href={createHashTag(navType.ContactUs)}
              onClick={() => setSelectPage(navType.ContactUs)}
              className="secondary-button"
            >
              Learn more
            </AnchorLink>
          </motion.div>
        </div>
        {/* HERO IMAGE */}
        <div className="hero-image">
          <img alt={homePageGraphic} src={homePageGraphicUrl} />
        </div>
      </motion.div>
      {/* Sponsor */}
      {screenAboveMedium ? (
        <div className="sponsor">
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
