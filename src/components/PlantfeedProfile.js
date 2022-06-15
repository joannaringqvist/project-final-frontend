/* eslint-disable */
import React from 'react';
import plants from 'reducers/plants';

import { PlantfeedCard } from './Styling/profile_styling';

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
        <div>You have no plants yet! Go add some!</div>
        <button onClick={navigatePlantfeed}>Plantfeed</button>
      </PlantfeedCard>
    );
  } else {
    return (
      <PlantfeedCard>
        <p>You have {plantList.length} plants! Take a look at them!</p>
        <button onClick={navigatePlantfeed}>Plantfeed</button>
      </PlantfeedCard>
    );
  }
};

export default PlantfeedProfile;
