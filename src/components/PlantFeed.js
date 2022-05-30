import React, { useState, useEffect } from 'react';
import { API_URL } from 'utils/utils';

/* eslint-disable */

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
            <div key={plant._id}>{plant.plantName}</div>
            <div key={plant._id}>{plant.typeOfPlant}</div>
            <div key={plant._id}>{plant.information}</div>
          </>
        ))}
      </section>
    </>
  );
};

export default PlantFeed;
