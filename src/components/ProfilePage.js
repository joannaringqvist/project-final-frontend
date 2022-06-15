/* eslint-disable */
import React from 'react';

import user from 'reducers/user';
import { useNavigate } from 'react-router-dom';

import Weather from './Weather';
import Header from './Header';
import PlantfeedProfile from './PlantfeedProfile';
import CalendarProfile from './CalendarProfile';

import { useDispatch } from 'react-redux';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Weather />
      <PlantfeedProfile />
      <CalendarProfile />
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
