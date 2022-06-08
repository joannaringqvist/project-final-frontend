/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';
import user from 'reducers/user';

import {
  Loginwrapper,
  UsernameWrapper,
  MailWrapper,
  PasswordWrapper,
  LoginButton,
} from './login_register_styles';
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
    <Loginwrapper>
      <h1>Register a new user</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={onRegisterFormSubmit}>
        <label htmlFor='username'>Username</label>
        <UsernameWrapper>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </UsernameWrapper>

        <label htmlFor='email'>Email</label>
        <MailWrapper>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </MailWrapper>

        <label htmlFor='password'>Password</label>
        <PasswordWrapper>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </PasswordWrapper>
        <LoginButton type='submit'>Register a new user</LoginButton>
      </form>
      <p>Already a user?</p>
      <LoginButton onClick={onLogin}>Log in!</LoginButton>
    </Loginwrapper>
  );
};

export default Register;
