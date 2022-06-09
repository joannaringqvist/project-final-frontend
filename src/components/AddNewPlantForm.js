/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';
import plants from 'reducers/plants';

const AddNewPlantForm = () => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantInformation, setPlantInformation] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();


  if (!accessToken) {
    navigate('/login');
  }

  const dispatch = useDispatch();

  const resetForm = () => {
    setPlantName('');
    setPlantType('');
    setPlantInformation('');
  };

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handlePlantTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handlePlantInformationChange = (event) => {
    setPlantInformation(event.target.value);
  };

  const onSaveNewPlantSubmit = (event) => {
    event.preventDefault();

    fetch(API_URL('plants'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: accessToken,
    },
      body: JSON.stringify({ plantName, plantType, plantInformation }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.addPlant(data.response));
        resetForm();
      });
  };

  return (
    <div className='form-container'>
      <form onSubmit={onSaveNewPlantSubmit}>
        <label htmlFor='plantName'>Name of plant</label>
        <input
          id='plantName'
          type='text'
          value={plantName}
          onChange={handlePlantNameChange}
        />
        <label htmlFor='plantType'>Type of plant</label>
        <select
          id='plantType'
          name='plant'
          value={plantType}
          onChange={handlePlantTypeChange}
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
          onChange={handlePlantInformationChange}
        />
        <button type='submit'>Save plant</button>
      </form>
    </div>
  );
};

export default AddNewPlantForm;
