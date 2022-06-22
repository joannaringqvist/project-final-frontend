/* eslint-disable */
import React from 'react';

import user from 'reducers/user';
import { useNavigate } from 'react-router-dom';

import Weather from './Weather';
import Header from './Header';
import PlantfeedProfile from './PlantfeedProfile';
import CalendarProfile from './CalendarProfile';
import Footer from './Footer';
import { StyledBtn } from './Styling/plantfeed_styles';
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
