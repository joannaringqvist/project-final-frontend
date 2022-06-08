/* eslint-disable */
import React from 'react';
import plants from 'reducers/plants';
import user from 'reducers/user';
import Navbar from './reusable-components/Navbar';

import { useSelector, useDispatch } from 'react-redux';

const ProfilePage = () => {
  const username = useSelector((store) => store.user.username);
  return (
    <>
      <Navbar />
      <p>Hello {username}!</p>
    </>
  );
};

export default ProfilePage;
