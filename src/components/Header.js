/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import user from 'reducers/user';
import {
  HeaderWrapper,
  WelcomeUser,
  DateText,
  HeaderBtn,
} from './Styling/header_styles';
import { StyledBtn } from './Styling/plantfeed_styles';

const Header = () => {
  const username = useSelector((store) => store.user.username);
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <WelcomeUser>Hello {username}</WelcomeUser>
      <div>
        <WelcomeUser>Hello {username}!</WelcomeUser>
        <HeaderBtn
          type='button'
          onClick={() => {
            dispatch(user.actions.setAccessToken(null));
            navigate('/login');
          }}
        >
          Log out
        </HeaderBtn>
      </div>
      <div>
        <DateText>{date} </DateText> <DateText>{weekday}</DateText>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
