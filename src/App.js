import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* eslint-disable */
import { API_URL } from 'utils/utils';
import PlantFeed from 'components/PlantFeed';
import AddNewPlantForm from 'components/AddNewPlantForm';
import ProfilePage from 'components/ProfilePage';

import plants from 'reducers/plants';

const reducer = combineReducers({
  plants: plants.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/plants' element={<PlantFeed />}></Route>
          <Route exact path='/profile' element={<ProfilePage />}></Route>
          <Route exact path='/addplant' element={<AddNewPlantForm />}></Route>
          {/* <Route exact path='movie/:movieId' element={<Details />}></Route> */}
          {/* <AddNewPlantForm /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
