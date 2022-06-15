/* eslint-disable */
import React from 'react';
import plants from 'reducers/plants';

import {
  PlantfeedCard,
  PlantfeedCardText,
  StyledBtn,
} from './Styling/profile_styling';

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
      <PlantfeedCard>
        <PlantfeedCardText>
          You have no plants yet! Go add some!
        </PlantfeedCardText>
        <button onClick={navigatePlantfeed}>Plantfeed</button>
      </PlantfeedCard>
    );
  } else {
    return (
      <PlantfeedCard>
        <PlantfeedCardText>
          You have {plantList.length} plants! Take a look at them!
        </PlantfeedCardText>
        <button onClick={navigatePlantfeed}>Plantfeed</button>
      </PlantfeedCard>
    );
  }
};

export default PlantfeedProfile;
