/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import plantabout from './images/monstera.png';
import computerplant from './images/computerplant.png';

import {
  AboutImg,
  AboutHead,
  AboutWrapper,
  OptionButtons,
  ButtonWrapper,
  AboutText,
  AboutTextWrapper,
  AboutHeadLine,
  AboutWrapperTwo,
} from './Styling/about_style';
import { StyledBtn } from './Styling/plantfeed_styles';

export const About = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate('/login');
  };

  const toRegister = () => {
    navigate('/register');
  };
  return (
    <>
      <ButtonWrapper>
        <StyledBtn onClick={toLogin}>Log in</StyledBtn>
        <StyledBtn onClick={toRegister}>Sign up!</StyledBtn>
      </ButtonWrapper>
      <AboutHead>Plantinary</AboutHead>
      <AboutWrapper>
        <AboutTextWrapper>
          <AboutHeadLine>What is Plantinary?</AboutHeadLine>
          <AboutText>
            Join us and get an easy way to keep track of your garden and your
            houseplants. Who didn't water their flowers too little or too much?
            With Plantinary that's no longer an issue.
          </AboutText>
        </AboutTextWrapper>
        <AboutImg src={plantabout}></AboutImg>
      </AboutWrapper>
      <AboutWrapperTwo>
        <AboutHeadLine>Who are we?</AboutHeadLine>
        <AboutText></AboutText>
        <AboutImg src={computerplant}></AboutImg>
      </AboutWrapperTwo>
    </>
  );
};

export default About;
