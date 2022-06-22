/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';
import swal from 'sweetalert';

import { API_URL } from 'utils/utils';
import leaf from './images/leaf.png';
import {
  Formwrapper,
  InputWrapper,
  LoginButton,
  LoginText,
  ErrorMessage,
} from './Styling/form_styles';
import { LogoThree, LogoTextTwo, LogoImg } from './Styling/header_styles';

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
    validateForm();

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

  const [textValidationName, setTextValidationName] = useState('');
  const validateForm = () => {
    let registerValidationName = document.forms['register']['username'].value;
    if (registerValidationName === '') {
      setTextValidationName('You must enter a username');
      return false;
    }
  };

  return (
    <Formwrapper>
      <LogoThree>
        <LogoImg src={leaf} />
        <LogoTextTwo>Plantinary</LogoTextTwo>
      </LogoThree>
      <h1>Become our friend!</h1>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <form onSubmit={onRegisterFormSubmit} name='register'>
        <label htmlFor='username'>Username</label>
        <InputWrapper>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <p>{textValidationName}</p>

        <label htmlFor='email'>Email</label>
        <InputWrapper>
          <input
            type='email'
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
