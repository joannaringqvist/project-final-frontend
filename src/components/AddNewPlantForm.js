import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { API_URL } from 'utils/utils';
import plants from 'reducers/plants';

const AddNewPlantForm = () => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantInformation, setPlantInformation] = useState('');

  const dispatch = useDispatch();

  const resetForm = () => {
    setPlantName('');
    setPlantType('');
    setPlantInformation('');
  }

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  }
  const handlePlantTypeChange = (event) => {
    setPlantType(event.target.value);
  }
  const handlePlantInformationChange = (event) => {
    setPlantInformation(event.target.value);
  }

  const onSaveNewPlantSubmit = (event) => {
    event.preventDefault();

    fetch(API_URL('plants'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plantName, plantType, plantInformation })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.addPlant(data.response));
        resetForm();
      });
  }

  return (
    <div className="form-container">
      <form onSubmit={onSaveNewPlantSubmit}>
        <label htmlFor="plantName">
          Name of plant
        </label>
        <input id="plantName" type="text" value={plantName} onChange={handlePlantNameChange} />
        <label htmlFor="plantType">
          Type of plant
        </label>
        <input id="plantType" type="text" value={plantType} onChange={handlePlantTypeChange} />
        <label htmlFor="plantInformation">
          Add more information
        </label>
        <textarea id="plantInformation" value={plantInformation} onChange={handlePlantInformationChange} />
        <button type="submit">Save plant</button>
      </form>
    </div>
  );
};

export default AddNewPlantForm;
