import { motion } from 'framer-motion';
import { HText } from '@/components/shared/Htext';
import '@/styles/benefit.css';
import type { SetCurrentPageFn } from '@/components/navbar/Link';
import { navType } from '../navbar';
import { createHashTag } from '@/util';
import { BenefitData, benefitsData } from './data';
import AnchorLink from 'react-anchor-link-smooth-scroll';

interface BenefitsProps {
  setSelectPage: SetCurrentPageFn;
}

const Benefits = ({ setSelectPage }: BenefitsProps) => {
  return (
    <section className="benefit" id={createHashTag(navType.Benefit, true)}>
      <motion.div
        className="benefit-content"
        onViewportEnter={() => setSelectPage(navType.Benefit)}
      >
        <div>
          <HText>More than just a gym</HText>
          <p>
            We provide world class fitness equipment, trainers and classes to
            get you to your ultimate fitness goals with ease. We provide true
            care into each and every member.
          </p>
        </div>
        <div className="benefit-list">
          {benefitsData.map((benefit) => (
            <Benefit data={benefit} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

interface BenefitProps {
  data: BenefitData;
}

const Benefit = ({ data: { icon, title, description } }: BenefitProps) => (
  <div className="benefit-item">
    <div className="benefit-icon-wrap">
      <div className="benefit-icon">{icon}</div>
    </div>
    <h4>{title}</h4>
    <p className="benefit-description">{description}</p>
    <AnchorLink>Learn more</AnchorLink>
  </div>
);

export { Benefits };
