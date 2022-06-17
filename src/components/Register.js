/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import swal from 'sweetalert';
import planticon from './images/plant.png';

import {
  Formwrapper,
  InputWrapper,
  LoginButton,
  LoginText,
  PlantPic,
} from './Styling/form_styles';
import Login from './Login';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const errorMessage = useSelector((store) => store.user.error);

  const onLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const onRegisterFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };

    fetch(API_URL('register'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.userId));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setUserName(data.username));
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setError(null));
            swal({ text: 'You are now a user!', icon: 'success' });
            navigate('/login');
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(data.response));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUserName(null));
            dispatch(user.actions.setEmail(null));
          });
        }
      });
  };

  return (
    <Formwrapper>
      <h1>Register a new user</h1>
      <PlantPic src={planticon}></PlantPic>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={onRegisterFormSubmit}>
        <label htmlFor='username'>Username</label>
        <InputWrapper>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>

        <label htmlFor='email'>Email</label>
        <InputWrapper>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>

        <label htmlFor='password'>Password</label>
        <InputWrapper>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <LoginButton type='submit'>Register a new user</LoginButton>
      </form>
      <LoginText>Already a user?</LoginText>
      <LoginButton onClick={onLogin}>Log in!</LoginButton>
    </Formwrapper>
  );
};

export default Register;
