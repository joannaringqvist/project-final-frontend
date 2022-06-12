/* eslint-disable */
import React from 'react';
import plants from 'reducers/plants';
import user from 'reducers/user';
import Navbar from './reusable-components/Navbar';

import Weather from './Weather';

import { useSelector, useDispatch } from 'react-redux';

const ProfilePage = () => {
  const username = useSelector((store) => store.user.username);
  const events = useSelector((store) => store.eventTodos.events);
  return (
    <>
      <Navbar />
      <p>Hello {username}!</p>
      <Weather />
    </>
  );
};

export default ProfilePage;
