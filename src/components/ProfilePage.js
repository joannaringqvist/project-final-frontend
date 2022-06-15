/* eslint-disable */
import React from 'react';

import user from 'reducers/user';
import Navbar from './reusable-components/Navbar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Weather from './Weather';
import Header from './Header';
import PlantfeedProfile from './PlantfeedProfile';

import { useSelector, useDispatch } from 'react-redux';

const ProfilePage = () => {
  const username = useSelector((store) => store.user.username);
  const events = useSelector((store) => store.eventTodos.events);
  const plantList = useSelector((store) => store.plants.plants);
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Weather />
      <PlantfeedProfile />
      <button
        type='button'
        onClick={() => {
          dispatch(user.actions.setAccessToken(null));
          navigate('/login');
        }}
      >
        Log out
      </button>
    </>
  );
};

export default ProfilePage;
