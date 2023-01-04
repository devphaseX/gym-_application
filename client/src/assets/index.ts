import abstractWaves from './images/AbstractWaves.png';
import arrow from './images/Arrow.png';
import benefitsPageGraphics from './images/BenefitsPageGraphic.png';
import circles from './images/ContactUsPageGraphic.png';
import contactUsPageGraphic from './images/ContactUsPageGraphic.png';
import evolveText from './images/EvolveText.png';
import homePageGraphic from './images/HomePageGraphic.png';
import homePageText from './images/HomePageText.png';

//user images

import user_1 from './images/image1.png';
import user_2 from './images/image2.png';
import user_3 from './images/image3.png';
import user_4 from './images/image4.png';
import user_5 from './images/image5.png';
import user_6 from './images/image6.png';

//logo
import brand_logo from './images/Logo.png';
import sparkles from './images/Sparkles.png';

//sponsors
import forbes from './images/SponsorForbes.png';
import fortune from './images/SponsorFortune.png';
import redbull from './images/SponsorRedBull.png';

interface ImageAsset {
  name: string;
  url: string;
}

const inferFilenameFromPath = (path: string) => {
  const extMatch = path.match(/\.(.*)$/);

  if (!(extMatch && path.lastIndexOf('/'))) {
    throw `Expected a file path  "/**/file.[ext]" but got an directory path:${path}`;
  }

  return path.slice(path.lastIndexOf('/') + 1, -extMatch[1].length);
};

const createImageAsset = (imageUrl: string): [string, ImageAsset] => {
  const name = inferFilenameFromPath(imageUrl);
  return [name, { name, url: imageUrl }];
};

const imageAssest = {
  user: {
    user1: createImageAsset(user_1),
    user2: createImageAsset(user_2),
    user3: createImageAsset(user_3),
    user4: createImageAsset(user_4),
    user5: createImageAsset(user_5),
    user6: createImageAsset(user_6),
  },

  layout: {
    homePageText: createImageAsset(homePageText),
    homePageGraphic: createImageAsset(homePageGraphic),
    abstractWaves: createImageAsset(abstractWaves),
    benefitsPageGraphics: createImageAsset(benefitsPageGraphics),
    arrow: createImageAsset(arrow),
    circles: createImageAsset(circles),
    evolveText: createImageAsset(evolveText),
    contactUsPageGraphic: createImageAsset(contactUsPageGraphic),
  },

  brand: {
    brand_logo: createImageAsset(brand_logo),
    sparkles: createImageAsset(sparkles),
  },

  sponsor: {
    forbes: createImageAsset(forbes),
    fortune: createImageAsset(fortune),
    redbull: createImageAsset(redbull),
  },
};

export { imageAssest };
export type { ImageAsset };
