/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
//import uniqid from 'uniqid';

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
    updatePlant: (store, action) => {
      const newPlant = action.payload;
      const oldPlant = store.plants.find((p) => p._id === newPlant._id);
      // Delete the old plant from list
      store.plants.splice(store.plants.indexOf(oldPlant), 1);
      // Insert new plant at beginning of list
      store.plants.unshift(newPlant);
    },
    deletePlant: (store, action) => {
      const id = action.payload._id;
      const plant = store.plants.find((p) => p._id === id);
      store.plants.splice(store.plants.indexOf(plant), 1);
    },
    togglePlant: (store, action) => {
      const toggledPlant = store.plants.find(
        (plant) => plant._id === action.payload
      );
      toggledPlant.isFavourite = !toggledPlant.isFavourite;
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
