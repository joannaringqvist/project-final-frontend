/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';

import user from 'reducers/user';

import {
  Formwrapper,
  InputWrapper,
  LoginButton,
  Label,
  PlantPic,
  LoginText,
  LogoWrapper,
  LogoText,
  ErrorMessage,
} from './Styling/form_styles';
import { StyledBtn } from './Styling/plantfeed_styles';
import planticon from './images/plant.png';
import seeding from './images/seeding.png';

import { Container } from './Styling/global_styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const errorMessage = useSelector((store) => store.user.error);

  const onRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken]);

  const onLoginFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch(API_URL('login'), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
          });
        }
      });
  };

  return (
    <Container>
      <Formwrapper>
        <LogoText>Already a friend?</LogoText>
        <PlantPic src={seeding}></PlantPic>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={onLoginFormSubmit}>
          <Label htmlFor='username'>Username</Label>
          <InputWrapper>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputWrapper>
          <Label htmlFor='password'>Password</Label>
          <InputWrapper>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>

          <LoginButton type='submit'>Login</LoginButton>
        </form>
        <LoginText>Not yet a user?</LoginText>
        <LoginButton onClick={onRegister}>Sign up!</LoginButton>
      </Formwrapper>
    </Container>
  );
};

export default Login;
