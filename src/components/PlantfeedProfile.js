/* eslint-disable */
import React from 'react';
import plants from 'reducers/plants';

import {
  PlantfeedCard,
  PlantfeedCardText,
  PlantLady,
  PlantfeedCardTextBold,
} from './Styling/profile_styling';
import plantlady from './images/plantlady.png';

import { StyledBtn } from './Styling/plantfeed_styles';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PlantfeedProfile = () => {
  const plantList = useSelector((store) => store.plants.plants);
  const navigate = useNavigate();

  const navigatePlantfeed = () => {
    navigate('/plants');
  };

  if (plantList.length === 0) {
    return (
      <>
        <PlantfeedCard>
          <PlantLady src={plantlady}></PlantLady>
          <PlantfeedCardText>
            You have <PlantfeedCardTextBold>no</PlantfeedCardTextBold> plants
            yet. Go add some!
          </PlantfeedCardText>
        </PlantfeedCard>
        <StyledBtn onClick={navigatePlantfeed}>Plantfeed</StyledBtn>
      </>
    );
  } else {
    return (
      <PlantfeedCard>
        <PlantLady src={plantlady}></PlantLady>
        <PlantfeedCardText>
          You have{' '}
          <PlantfeedCardTextBold>{plantList.length}</PlantfeedCardTextBold>{' '}
          plants registered. Go take a look at your loved ones!
        </PlantfeedCardText>
        <StyledBtn onClick={navigatePlantfeed}>Plantfeed</StyledBtn>
      </PlantfeedCard>
    );
  }
};

export default PlantfeedProfile;
