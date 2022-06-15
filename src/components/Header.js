/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Header = () => {
  const username = useSelector((store) => store.user.username);
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');
  return (
    <>
      <p>
        {date} {weekday}
      </p>
      <p>Hello {username}</p>
    </>
  );
};

export default Header;
