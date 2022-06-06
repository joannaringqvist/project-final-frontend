/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';

const Editform = () => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantInformation, setPlantInformation] = useState('');
  const dispatch = useDispatch();

  const onEditPlantSubmit = () => {
    fetch(API_URL(`/plant/${plantId}/updated`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
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

// export const updateTodo = (taskId, accessToken, task, userId) => {
//   return (dispatch) => {
//     const options = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: accessToken,
//       },
//       body: JSON.stringify({ description: task, user: userId }),
//     };

//     dispatch(ui.actions.setLoading(true));
//     fetch(API_URL(`tasks/${taskId}/update`), options)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           dispatch(showTasklist(accessToken, userId));
//           dispatch(tasks.actions.setError(null));
//         } else {
//           dispatch(tasks.actions.setError(data.response));
//         }
//       })
//       .finally(() => dispatch(ui.actions.setLoading(false)));
//   };
// };
