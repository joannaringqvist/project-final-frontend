/* eslint-disable */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from 'utils/utils';



const Editform = () => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantInformation, setPlantInformation] = useState('');

  const { plantId } = useParams();

  const onEditPlantSubmit = (event) => {
    event.preventDefault();
    console.log('oneditplantsubmit');
    fetch(API_URL(`plant/${plantId}/updated`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plantName, plantType, plantInformation }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleEditNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handleEditTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handleEditInformationChange = (event) => {
    setPlantInformation(event.target.value);
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
        </form>
      </div>
    </>
  );
};

export default Editform;