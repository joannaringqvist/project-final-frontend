/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';

import leaf from './images/leaf.png';
import {
  HeaderWrapper,
  WelcomeUser,
  DateText,
  HeaderBtn,
  Logo,
  LogoText,
  LogoImg,
  DateWrapper,
  BtnWrapper,
} from './Styling/header_styles';

const Header = () => {
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <BtnWrapper>
        <HeaderBtn
          onClick={() => {
            dispatch(user.actions.setAccessToken(null));
            navigate('/login');
          }}
        >
          Log out
        </HeaderBtn>
      </BtnWrapper>
      <Logo>
        <LogoImg src={leaf} />
        <LogoText>Plantinary</LogoText>
      </Logo>
      <DateWrapper>
        <DateText>{date} </DateText> <DateText>{weekday}</DateText>
      </DateWrapper>
    </HeaderWrapper>
  );
};

export default Header;
