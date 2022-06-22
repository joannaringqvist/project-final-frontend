/* eslint-disable */
import React from 'react';

import Weather from './Weather';
import Header from './Header';
import PlantfeedProfile from './PlantfeedProfile';
import CalendarProfile from './CalendarProfile';
import { ProfileWrapper } from './Styling/profile_styling';

const ProfilePage = () => {
  return (
    <>
      <ProfileWrapper>
        <Header />
        <Weather />
        <PlantfeedProfile />
        <CalendarProfile />
      </ProfileWrapper>
    </>
  );
};

export default ProfilePage;
