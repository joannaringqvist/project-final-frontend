/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { API_URL } from 'utils/utils';
import moment from 'moment';

import { PlantWrapper } from './plantfeed_styles';

const PlantFeed = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(API_URL('plants'))
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
      });
  }, []);
  console.log(plants);

  return (
    <>
      <div>
        <p>Plantfeed!</p>
      </div>
      <section>
        {plants.map((plant) => (
          <>
            <PlantWrapper key={plant._id}>
              <div>{plant.plantName}</div>
              <div>{plant.typeOfPlant}</div>
              <div>{plant.information}</div>
              <div>{moment(plant.createdAt).fromNow()}</div>
            </PlantWrapper>
          </>
        ))}
      </section>
    </>
  );
};

export default PlantFeed;
