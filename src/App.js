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
import PlantCalendar from 'components/Calendar';
import PlantTodos from 'components/PlantTodos';
import About from 'components/About';

import plants from 'reducers/plants';
import eventTodos from 'reducers/events';
import user from 'reducers/user';
import { ui } from './reducers/ui';

const reducer = combineReducers({
  eventTodos: eventTodos.reducer,
  plants: plants.reducer,
  user: user.reducer,
  ui: ui.reducer,
});

const persistedStateJSON = sessionStorage.getItem('state');
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const store = configureStore({ reducer, preloadedState: persistedState });

store.subscribe(() => {
  sessionStorage.setItem('state', JSON.stringify(store.getState()));
});

export const App = () => {
  return (
    <Provider store={store}>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/plants' element={<PlantFeed />}></Route>
          <Route exact path='/profile' element={<ProfilePage />}></Route>
          <Route exact path='/addplant' element={<AddNewPlantForm />}></Route>
          <Route exact path='/calendar' element={<PlantCalendar />}></Route>
          <Route exact path='/about' element={<About />}></Route>

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
