/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PlantFeed from 'components/PlantFeed';
import AddNewPlantForm from 'components/AddNewPlantForm';
import ProfilePage from 'components/ProfilePage';
import Loading from 'components/Loading';
import Register from 'components/Register';
import Login from 'components/Login';
import SinglePlant from 'components/SinglePlant';

import plants from 'reducers/plants';
import user from 'reducers/user';
import { ui } from './reducers/ui';

const reducer = combineReducers({
  plants: plants.reducer,
  user: user.reducer,
  ui: ui.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/plants' element={<PlantFeed />}></Route>
          <Route exact path='/profile' element={<ProfilePage />}></Route>
          <Route exact path='/addplant' element={<AddNewPlantForm />}></Route>

          <Route
            exact
            path='/plants/plant/:plantId'
            element={<SinglePlant />}
          ></Route>
          {/* <Route exact path='movie/:movieId' element={<Details />}></Route> */}
          {/* <AddNewPlantForm /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
