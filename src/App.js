import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
/* eslint-disable */
import { API_URL } from 'utils/utils';
import PlantFeed from 'components/PlantFeed';
import AddNewPlantForm from 'components/AddNewPlantForm';

import plants from 'reducers/plants';


const reducer = combineReducers({
  plants: plants.reducer
});

const store = configureStore({reducer});

export const App = () => {
  return (
    <Provider store={store}>
      <AddNewPlantForm />
      <PlantFeed />
    </Provider>
  )
};
