/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { PlantWrapper } from './plantfeed_styles';
import plants from 'reducers/plants';
import user from "reducers/user";

const PlantFeed = () => {
  const plantsList = useSelector((store) => store.plants.plants);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if(!accessToken) {
      navigate('/login');
    }

    const options = {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    }

    fetch(API_URL('plants'), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.setPlants(data));
      });
  }, [accessToken]);

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
    <>
      <div>
        <p>Plantfeed for {username}!</p>
        <button 
          type="button"
          onClick={() => {
              navigate("/login");
              dispatch(user.actions.setAccessToken(null));
          }}
          >
            Log out
          </button>

      </div>
      <section>
        {plantsList.map((plant) => (
          <PlantWrapper key={plant._id}>
            <div>{plant.plantName}</div>
            <div>{plant.plantType}</div>
            <div>{plant.plantInformation}</div>
            <div>{moment(plant.createdAt).fromNow()}</div>

            <button onClick={() => deleteOnePlant(plant._id)}>
              DELETE PLANT
            </button>
          </PlantWrapper>
        ))}
      </section>
    </>
  );
};

export default PlantFeed;
