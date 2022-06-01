/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

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
      const plant = store.plants.find((p) => p.id === id);
      store.plants.splice(store.plants.indexOf(plant), 1);
    },
  },
});

export default plants;
