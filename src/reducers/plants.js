import { createSlice } from '@reduxjs/toolkit';

const plants = createSlice({
  name: 'plants',
  initialState: {
    plants: []
  },
  reducers: {
    setPlants: (store, action) => {
      store.plants = action.payload;
    },
    addPlant: (store, action) => {
      store.plants.unshift(action.payload);
    }
  }
});

export default plants;