/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PlantWrapper } from './plantfeed_styles';
import plants from 'reducers/plants';
import { ui } from 'reducers/ui';

const PlantFeed = () => {
  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL('plants'))
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.setPlants(data));
        dispatch(ui.actions.setLoading(false));
      });
  }, []);

  const deleteOnePlant = (plantId) => {
    fetch(API_URL(`plant/${plantId}`), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.deletePlant(data.response));
      });
  };

  return (
    isLoading === false && (
      <>
        <div>
          <p>Plantfeed!</p>
        </div>
        <section>
          {plantsList.map((plant) => (
            <PlantWrapper key={plant._id}>
              <Link key={plant._id} to={`plant/${plant._id}`}>
                {plant.plantName}
              </Link>

              <div>{moment(plant.createdAt).fromNow()}</div>

              <button onClick={() => deleteOnePlant(plant._id)}>
                DELETE PLANT
              </button>
            </PlantWrapper>
          ))}
        </section>
      </>
    )
  );
};

export default PlantFeed;
