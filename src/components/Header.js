/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { HeaderWrapper, WelcomeUser } from './Styling/header_styles';

const Header = () => {
  const username = useSelector((store) => store.user.username);
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');
  return (
    <HeaderWrapper>
      <WelcomeUser>Hello {username}</WelcomeUser>
      <p>env: {process.env.REACT_APP_BASE_URL}</p>
      <div>
        <p>{date} </p> <p>{weekday}</p>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
