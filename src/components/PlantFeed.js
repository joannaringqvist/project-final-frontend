import React, { useState, useEffect } from 'react';
import { API_URL } from 'utils/utils';

const PlantFeed = () => {
  const [plants, setPlants] = useState('')

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fetchPlants = () => {
    fetch(API_URL('plants'), options)
      .then((res) => res.json())
      .then((data) => setPlants(plants))
      .finally(() => console.log(plants))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div>
      {/* <p>plantfeed</p>
      {plants.map((plant) => (
        <p key={plant._id}>{plant.plantName}</p>
      ))} */}
    </div>
  )
};

export default PlantFeed;