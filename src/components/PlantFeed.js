/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import moment from 'moment';

import { PlantWrapper } from './plantfeed_styles';
import plants from 'reducers/plants';

const PlantFeed = () => {
  const plantsList = useSelector((store) => store.plants.plants);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(API_URL('plants'))
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.setPlants(data));
      });
  }, []);
  const deleteOnePlant = () => {
    fetch(API_URL(`plant/${plants.id}`), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.deletePlant(data.response));
      });
  };

  return (
    <>
      <div>
        <p>Plantfeed!</p>
      </div>
      <section>
        {plantsList.map((plant) => (
          <PlantWrapper key={plant._id}>
            <div>{plant.plantName}</div>
            <div>{plant.plantType}</div>
            <div>{plant.plantInformation}</div>
            <div>{moment(plant.createdAt).fromNow()}</div>

            <button onClick={() => deleteOnePlant()}>DELETE PLANT</button>
          </PlantWrapper>
        ))}
      </section>
    </>
  );
};

export default PlantFeed;
