/* eslint-disable */
import React from 'react';
import plantabout from './images/monstera.png';

import { AboutImg, AboutHead, AboutWrapper } from './Styling/about_style';

export const About = () => {
  return (
    <AboutWrapper>
      <AboutHead>Keep track of your plants with Plantinary</AboutHead>
      <AboutImg src={plantabout}></AboutImg>
      <p>
        Join us and get an easy way to keep track of your garden and your
        houseplants. Who didn't water their flowers too little or too much? With
        Plantinary that's no longer an issue.
      </p>
    </AboutWrapper>
  );
};

export default About;
