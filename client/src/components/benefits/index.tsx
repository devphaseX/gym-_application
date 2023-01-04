import { Variant, Variants, motion } from 'framer-motion';
import { HText } from '@/components/shared/Htext';
import '@/styles/benefit.css';
import type { SetCurrentPageFn } from '@/components/navbar/Link';
import { navType } from '../navbar';
import { createHashTag } from '@/util';
import { BenefitData, benefitsData } from './data';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { ActionButton } from '../shared/ActionButton';
import { imageAssest } from '@/assets';

const [benefitsPageGraphics, { url: benefitsPageGraphicsUrl }] =
  imageAssest.layout.benefitsPageGraphics;
interface BenefitsProps {
  setSelectPage: SetCurrentPageFn;
}

const headerVariant = {
  visible: { transition: { staggerChildren: 0.2 } },
  hidden: {},
} satisfies Variants;

const Benefits = ({ setSelectPage }: BenefitsProps) => {
  return (
    <section className="benefit" id={createHashTag(navType.Benefit, true)}>
      <motion.div
        className="benefit-content"
        onViewportEnter={() => setSelectPage(navType.Benefit)}
      >
        <motion.div className="benefit-headline" variants={headerVariant}>
          <HText>More than just a gym.</HText>
          <p>
            We provide world class fitness equipment, trainers and classes to
            get you to your ultimate fitness goals with ease. We provide true
            care into each and every member.
          </p>
        </motion.div>
        <div className="benefit-list">
          {benefitsData.map((benefit) => (
            <Benefit
              data={benefit}
              setSelectPage={setSelectPage}
              key={benefit.title}
            />
          ))}
        </div>
        <div className="short-intro">
          <div className="short-image">
            <img alt={benefitsPageGraphics} src={benefitsPageGraphicsUrl} />
          </div>
          <div>
            <div className="short-title">
              <HText>
                Millions of happy members getting <span>Fit</span>
              </HText>
            </div>
            <div className="short-description">
              <p>
                Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
                egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
                fames vitae vitae quis. Quis amet vulputate tincidunt at in
                nulla nec. Consequat sed facilisis dui sit egestas ultrices
                tellus. Ullamcorper arcu id pretium sapien proin integer nisl.
                Felis orci diam odio.
              </p>
              <p>
                Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
                tellus quam porttitor. Mauris velit euismod elementum arcu neque
                facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
                enim mattis odio in risus nunc.
              </p>
            </div>
            <div className="short-action">
              <ActionButton setCurrentSelect={setSelectPage}>
                Join us
              </ActionButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface BenefitProps extends Pick<BenefitsProps, 'setSelectPage'> {
  data: BenefitData;
}

const childVariant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.9 },
} satisfies Variants;

const Benefit = ({
  data: { icon, title, description },
  setSelectPage,
}: BenefitProps) => (
  <motion.div className="benefit-item" variants={childVariant}>
    <div className="benefit-icon-wrap">
      <div className="benefit-icon">{icon}</div>
    </div>
    <h4 className="benefit-title">{title}</h4>
    <p className="benefit-description">{description}</p>
    <div className="benefit-action-btn">
      <SecondaryButton
        onClick={() => setSelectPage(navType.ContactUs)}
        selected="our classes"
      >
        Learn more
      </SecondaryButton>
    </div>
  </motion.div>
);

export { Benefits };
