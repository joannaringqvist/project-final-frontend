/* eslint-disable */
import React from 'react';

import snakeplant from './images/snakeplant.png';
import { StyledBtn } from './Styling/plantfeed_styles';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalTitle,
  ModalImg,
} from './Styling/form_styles';

export const About = ({ setShow }) => {
  return (
    <Modal onClick={() => setShow(false)}>
      <ModalContent>
        <ModalTitle>Who are we?</ModalTitle>
        <ModalBody>
          We are two plant-lovers who attended the Technigo Bootcamp in spring
          2022. Plantinary is our finalproject - a perfect tool to keep track of
          your plants. Sign up and add your plants! Enjoy!
        </ModalBody>
        <div>
          <ModalImg src={snakeplant}></ModalImg>
        </div>
        <StyledBtn onClick={() => setShow(false)}>Back</StyledBtn>
      </ModalContent>
    </Modal>
  );
};

export default About;
