import React from 'react';
import { imageAssest } from '../../assets';

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

const Heroes = () => {
  return (
    <section>
      <div>
        <div>
          <img src={homePageTextUrl} alt={homePageText} />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export { Heroes };
