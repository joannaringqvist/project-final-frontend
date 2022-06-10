/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const plants = createSlice({
  name: 'plants',
  initialState: {
    plants: [],
  },
  reducers: {
    setPlants: (store, action) => {
      store.plants = action.payload;
    },
    addPlant: (store, action) => {
      store.plants.unshift(action.payload);
    },
    deletePlant: (store, action) => {
      const { id } = action.payload;
      console.log(action.payload);
      const plant = store.plants.find((p) => p.id === id);
      store.plants.splice(store.plants.indexOf(plant), 1);
    },
  },
});

export const editPlants = (
  plantName,
  plantType,
  plantInformation,
  plantId,
  setPlants
) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ plantName, plantType, plantInformation }),
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plant/${plantId}/updated`), options)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
};
export default plants;
