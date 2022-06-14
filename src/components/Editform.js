/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';

import plants from 'reducers/plants';

const Editform = (props) => {
  const plantsList = useSelector((store) => store.plants.plants);
  const { plantId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPlant = plantsList.find((plant) => {
    return plant._id === plantId;
  });

  const [plantName, setPlantName] = useState(currentPlant.plantName);
  const [plantType, setPlantType] = useState(currentPlant.plantType);
  const [plantInformation, setplantInformation] = useState(currentPlant.plantInformation);

  const handleEditNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handleEditTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handleEditInformationChange = (event) => {
    setplantInformation(event.target.value);
  };

  const onEditPlantSubmit = (event) => {
    event.preventDefault();
    fetch(API_URL(`plant/${plantId}/updated`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plantName, plantType, plantInformation }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setEditPlant(false); 
        dispatch(plants.actions.updatePlant(data.response));
      });

  };

  // ---- Reusable component ----
  const onBackButtonClick = () => {
    navigate(`/plants/plant/${plantId}`);
  };

  return (
    <>
      <h1>Edit plant</h1>
      <div className='form-container'>
        <form onSubmit={onEditPlantSubmit}>
          <label htmlFor='plantName'>Name of plant</label>
          <input
            id='plantName'
            type='text'
            value={plantName}
            onChange={handleEditNameChange}
          />
          <label htmlFor='plantType'>Type of plant</label>
          <select
            id='plantType'
            name='plant'
            value={plantType}
            onChange={handleEditTypeChange}
          >
            <option value=''>Select type of plant</option>
            <option value='tree'>Tree</option>
            <option value='houseplant'>Houseplant</option>
            <option value='perennial'>Perennial</option>
            <option value='bush'>Bush</option>
          </select>

          <label htmlFor='plantInformation'>Add more information</label>
          <textarea
            id='plantInformation'
            value={plantInformation}
            onChange={handleEditInformationChange}
          />
          <button type='submit'>Save plant</button>

          {/* ---- Reusable component ?? ----  */}
          <button onClick={onBackButtonClick}>BACK</button>

        </form>
      </div>
    </>
  );
};

export default Editform;
